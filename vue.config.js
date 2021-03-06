
const path = require('path');
const webpack = require('webpack');

const resolve = dir => path.join(__dirname, dir);

module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? '/public/' : './',
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    outputDir: 'dist',
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    assetsDir: "assets",
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,
    /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，
    你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
    filenameHashing: false,
    /* 代码保存时进行eslint检测 */
    lintOnSave: true,
    chainWebpack: config => {
        config.devServer
        //web服务器代理
            .host('0.0.0.0')
            .port(8088)
            //api请求代理
            .proxy({
                '/api/': {
                    // target: 'http://localhost:8088/', //正式环境
                    target: 'http://songxin.natapp1.cc/', //  Dev环境
                    changeOrigin: true, // 跨域
                    autoRewrite: true,
                    cookieDomainRewrite: true,
                    pathRewrite: {
                        '^/api/': '/'
                    }
                }
            })
            .disableHostCheck(true)
    },

};