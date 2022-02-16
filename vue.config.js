// 必须用commonjs导出->webpack
module.exports = {
    devServer: {
        proxy: {
            '/x': {
                // https://github.com/chimurai/http-proxy-middleware
                target: "https://api.bilibili.com",
                // onProxyRes(proxyRes) {
                //     proxyReq.setHeader['origin'] = 'https://www.bilibili.com'; // add new header to response
                //     proxyReq.setHeader['referer'] = 'https://www.bilibili.com/v/channel'; // add new header to response
                // }
            }
        }
    }
}