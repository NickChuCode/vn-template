'use strict'
// 直接运行，检查node npm 版本
require('./check-versions')()

process.env.NODE_ENV = 'production'

// 命令行中的loading效果
const ora = require('ora')
// // 删除文件或文件夹，实现统一的rm -rf
const rm = require('rimraf')
const path = require('path')
// 控制台输出彩色文本，更多查看：https://github.com/chalk/chalk
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
// 引入生产环境webpack配置
const webpackConfig = require('./webpack.prod.conf')
// 控制台输入开始构建loading
const spinner = ora('building for production...')
spinner.start()

// 删除原有构建输出的目录文件 这里是dist 和 static
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    // 关闭loading
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    // 如果有错，控制台输出构建失败
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    // 控制台输出构建成功相关信息
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
