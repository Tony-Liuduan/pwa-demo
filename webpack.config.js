/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-12 21:41:40
 * @LastEditTime 2020-07-12 22:37:50
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    watch: true,
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader, // 和style-loader冲突
                    // options: {
                    //     esModule: true,
                    // },
                },
                {
                    loader: 'css-loader',
                    options: {
                        // modules: { // 模块化css，适用于单页，多页用BEM
                        //     localIdentName: '[path][name]__[local]--[hash:base64:5]', // name-css文件名 你写的local-类名
                        // },
                    },
                },],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({ // Also generate a test.html
            filename: 'index.html',
            template: 'src/index.html',
        }),
        new WorkboxPlugin.GenerateSW({
            // Do not precache images
            exclude: [/\.(?:png|jpg|jpeg|svg)$/],

            // Define runtime caching rules.
            runtimeCaching: [{
                // Match any request that ends with .png, .jpg, .jpeg or .svg.
                urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

                // Apply a cache-first strategy.
                handler: 'CacheFirst',

                options: {
                    // Use a custom cache name.
                    cacheName: 'images',

                    // Only cache 10 images.
                    expiration: {
                        maxEntries: 10,
                    },
                },
            }],
        }),
    ],
}