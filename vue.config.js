
const path = require('path')

const resolve = dir => path.join(__dirname, dir)

// const BASE_URL = process.env.NODE_ENV === 'production' ? '/pro/' : '/'

module.exports = {
    lintOnSave: false,
    productionSourceMap: false, // 打包时不生成.map文件

    chainWebpack: config => {
        config.devServer.host('0.0.0.0')
            .port(8080)
            .proxy({
                '/api/': {
                    // target: 'http://localhost:3000/', // Dev环境
                    target: 'http://songxin.natapp1.cc/', // 正式环境
                    changeOrigin: true, // 跨域
                    autoRewrite: true,
                    cookieDomainRewrite: true,
                    pathRewrite: {
                        '^/api/': '/'                 // 所有以 '/hrm/api/' 开头的api都替换为'/'
                    }
                }
                })
            .disableHostCheck(true)
    },
    // devServer: {
    //     // proxy: 'http://songxin.natapp1.cc'
    //     proxy: {
    //     }
    // }
};