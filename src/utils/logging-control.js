
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

import EventEmitter from 'events';
import Log from './logger.js';

class LoggingControl {

    static get forceGlobalTag() {
        return Log.FORCE_GLOBAL_TAG;
    }

    static set forceGlobalTag(enable) {
        Log.FORCE_GLOBAL_TAG = enable;
        LoggingControl._notifyChange();
    }

    static get globalTag() {
        return Log.GLOBAL_TAG;
    }

    static set globalTag(tag) {
        Log.GLOBAL_TAG = tag;
        LoggingControl._notifyChange();
    }

    static get enableAll() {
        return Log.ENABLE_VERBOSE
            && Log.ENABLE_DEBUG
            && Log.ENABLE_INFO
            && Log.ENABLE_WARN
            && Log.ENABLE_ERROR;
    }

    static set enableAll(enable) {
        Log.ENABLE_VERBOSE = enable;
        Log.ENABLE_DEBUG = enable;
        Log.ENABLE_INFO = enable;
        Log.ENABLE_WARN = enable;
        Log.ENABLE_ERROR = enable;
        LoggingControl._notifyChange();
    }

    static get enableDebug() {
        return Log.ENABLE_DEBUG;
    }

    static set enableDebug(enable) {
        Log.ENABLE_DEBUG = enable;
        LoggingControl._notifyChange();
    }

    static get enableVerbose() {
        return Log.ENABLE_VERBOSE;
    }

    static set enableVerbose(enable) {
        Log.ENABLE_VERBOSE = enable;
        LoggingControl._notifyChange();
    }

    static get enableInfo() {
        return Log.ENABLE_INFO;
    }

    static set enableInfo(enable) {
        Log.ENABLE_INFO = enable;
        LoggingControl._notifyChange();
    }

    static get enableWarn() {
        return Log.ENABLE_WARN;
    }

    static set enableWarn(enable) {
        Log.ENABLE_WARN = enable;