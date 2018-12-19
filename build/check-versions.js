'use strict'
// 控制台输入样式 chalk 更多查看：https://github.com/chalk/chalk
const chalk = require('chalk')
// 语义化控制版本的插件 更多查看：https://github.com/npm/node-semver
const semver = require('semver')
// package.json配置
const packageConfig = require('../package.json')
// shell 脚本 Unix shell commands for Node.js 更多查看：https://github.com/shelljs/shelljs
const shell = require('shelljs')

function exec (cmd) {
  // child_process是Node.js的一个十分重要的模块，通过它可以实现创建多进程，以利用单机的多核计算资源。
  // 虽然，Nodejs天生是单线程单进程的，但是有了child_process模块，可以在程序中直接创建子进程，
  // 并使用主进程和子进程之间实现通信，等到子进程运行结束以后，主进程再用回调函数读取子进程的运行结果。
  //
  // 这个函数可以通过 child_process 模块新建子进程，从而执行 Unix 系统命令
  // 下面这段代码实际就是把cmd这个参数传递的值转化成前后没有空格的字符串
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    // 使用semver插件把版本信息转化成规定格式，也就是 '  =v1.2.3  ' -> '1.2.3' 这种功能
    currentVersion: semver.clean(process.version),
    // 这里配置是"node": ">= 6.0.0",
    versionRequirement: packageConfig.engines.node
  }
]

// 需要使用npm
// shelljs的which方法是去系统的路径（system's PATH）中寻找命令，shell.which('npm')就是寻找npm命令
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    // 这里配置是"npm": ">= 3.0.0"
    versionRequirement: packageConfig.engines.npm
  })
}

// 导出一个检查版本的函数
module.exports = function () {
  const warnings = []

  // 在运行check-versions.js时，versionRequirements数组中会有两个对象，一个是node相关信息，一个是npm相关信息
  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    // 当前版本不大于所需版本
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement) // 把当前版本号用红色字体 符合要求的版本号用绿色字体 给用户提示具体合适的版本
      )
    }
  }

  // 如果有警告，全部输出到控制台
  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}
