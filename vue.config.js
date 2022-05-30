module.exports = {
  publicPath: '/',
  // outputDir: 'express/web/public',
  // assetsDir: 'asset',
  outputDir: 'dist',
  assetsDir: 'asset',
  indexPath: 'index.html',

  // 支持webpack-dev-server的所有选项
  // https://webpack.js.org/configuration/dev-server/
  devServer: {

    // 控制台显示console.log消息
    clientLogLevel: 'info',
    // gzip压缩
    compress: true,
    // 从哪个目录中提供内容,多个目录设置
    // contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')],

    // 如果 output.filename 设置为 'bundle.js'，只有在请求 /bundle.js 时候，才会编译 bundle。
    // lazy: true,
    // filename: 'bundle.js',

    // 不检查主机
    disableHostCheck: false,
    // 全部请求带上头部内容
    headers: {
      // 'X-Custom-Foo': 'bar'
    },

    port: 3000,

    // server 启动后打开浏览器
    open: true,

    // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定0.0.0.0
    host: '127.0.0.1',

    // 启用热模块替换
    // 必须有 webpack.HotModuleReplacementPlugin 才能完全启用 HMR
    hot: true,

    https: false,

    hotOnly: false,

    // 如果有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求
    proxy: {
      '/api': {
        // target: 'http://101.133.164.81/', // 对应自己的接口
        target: 'http://192.168.0.253/', // 对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },

    // 在服务内部的所有其他中间件之前， 提供执行自定义中间件的功能。 这可以用来配置自定义处理程序
    before: () => { },
    // 在服务内部的所有其他中间件之后， 提供执行自定义中间件的功能。
    after: () => { }
  }
}
