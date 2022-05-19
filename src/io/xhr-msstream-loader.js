
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Log from '../utils/logger.js';
import {BaseLoader, LoaderStatus, LoaderErrors} from './loader.js';
import {RuntimeException} from '../utils/exception.js';

/* Notice: ms-stream may cause IE/Edge browser crash if seek too frequently!!!
 * The browser may crash in wininet.dll. Disable for now.
 *
 * For IE11/Edge browser by microsoft which supports `xhr.responseType = 'ms-stream'`
 * Notice that ms-stream API sucks. The buffer is always expanding along with downloading.
 *
 * We need to abort the xhr if buffer size exceeded limit size (e.g. 16 MiB), then do reconnect.
 * in order to release previous ArrayBuffer to avoid memory leak
 *
 * Otherwise, the ArrayBuffer will increase to a terrible size that equals final file size.
 */
class MSStreamLoader extends BaseLoader {

    static isSupported() {
        try {
            if (typeof self.MSStream === 'undefined' || typeof self.MSStreamReader === 'undefined') {
                return false;
            }

            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://example.com', true);
            xhr.responseType = 'ms-stream';
            return (xhr.responseType === 'ms-stream');
        } catch (e) {
            Log.w('MSStreamLoader', e.message);
            return false;
        }
    }

    constructor(seekHandler, config) {
        super('xhr-msstream-loader');
        this.TAG = 'MSStreamLoader';

        this._seekHandler = seekHandler;
        this._config = config;
        this._needStash = true;

        this._xhr = null;
        this._reader = null;  // MSStreamReader

        this._totalRange = null;
        this._currentRange = null;

        this._currentRequestURL = null;
        this._currentRedirectedURL = null;

        this._contentLength = null;
        this._receivedLength = 0;

        this._bufferLimit = 16 * 1024 * 1024;  // 16MB
        this._lastTimeBufferSize = 0;
        this._isReconnecting = false;
    }

    destroy() {
        if (this.isWorking()) {
            this.abort();
        }
        if (this._reader) {
            this._reader.onprogress = null;
            this._reader.onload = null;
            this._reader.onerror = null;
            this._reader = null;
        }
        if (this._xhr) {
            this._xhr.onreadystatechange = null;
            this._xhr = null;
        }
        super.destroy();
    }

    open(dataSource, range) {
        this._internalOpen(dataSource, range, false);
    }

    _internalOpen(dataSource, range, isSubrange) {
        this._dataSource = dataSource;

        if (!isSubrange) {
            this._totalRange = range;
        } else {
            this._currentRange = range;
        }

        let sourceURL = dataSource.url;
        if (this._config.reuseRedirectedURL) {
            if (this._currentRedirectedURL != undefined) {
                sourceURL = this._currentRedirectedURL;
            } else if (dataSource.redirectedURL != undefined) {
                sourceURL = dataSource.redirectedURL;
            }
        }

        let seekConfig = this._seekHandler.getConfig(sourceURL, range);
        this._currentRequestURL = seekConfig.url;

        let reader = this._reader = new self.MSStreamReader();
        reader.onprogress = this._msrOnProgress.bind(this);
        reader.onload = this._msrOnLoad.bind(this);
        reader.onerror = this._msrOnError.bind(this);

        let xhr = this._xhr = new XMLHttpRequest();
        xhr.open('GET', seekConfig.url, true);
        xhr.responseType = 'ms-stream';
        xhr.onreadystatechange = this._xhrOnReadyStateChange.bind(this);
        xhr.onerror = this._xhrOnError.bind(this);

        if (dataSource.withCredentials) {
            xhr.withCredentials = true;
        }

        if (typeof seekConfig.headers === 'object') {
            let headers = seekConfig.headers;

            for (let key in headers) {
                if (headers.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        }

        // add additional headers
        if (typeof this._config.headers === 'object') {
            let headers = this._config.headers;

            for (let key in headers) {
                if (headers.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        }

        if (this._isReconnecting) {
            this._isReconnecting = false;
        } else {
            this._status = LoaderStatus.kConnecting;
        }
        xhr.send();
    }

    abort() {
        this._internalAbort();
        this._status = LoaderStatus.kComplete;
    }

    _internalAbort() {
        if (this._reader) {
            if (this._reader.readyState === 1) {  // LOADING
                this._reader.abort();
            }
            this._reader.onprogress = null;
            this._reader.onload = null;
            this._reader.onerror = null;
            this._reader = null;
        }
        if (this._xhr) {
            this._xhr.abort();
            this._xhr.onreadystatechange = null;
            this._xhr = null;
        }
    }

    _xhrOnReadyStateChange(e) {
        let xhr = e.target;

        if (xhr.readyState === 2) {  // HEADERS_RECEIVED
            if (xhr.status >= 200 && xhr.status <= 299) {
                this._status = LoaderStatus.kBuffering;