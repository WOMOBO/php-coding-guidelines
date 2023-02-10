const webpack = require('webpack');
const pkg = require('./package.json');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

let config = {
    entry: './src/index.js',
    output: {
        filename: 'flv.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'fl