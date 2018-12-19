# vn-template

> vue-cli 2.x构建的前端项目解析

## 命令列表

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

## 入口
入口文件可以从package.json中看到，涵盖了开发，构建，单元测试，启动等各个方面
``` bash
"scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "unit": "jest --config test/unit/jest.conf.js --coverage",
    "test": "npm run unit",
    "lint": "eslint --ext .js,.vue src test/unit",
    "build": "node build/build.js"
  },
```

- 其中，webpack-dev-server是一个单独的npm包，是一个小型的Node.js Express服务器,它使用webpack-dev-middleware来服务于webpack的包,除此自外，它还有一个通过Sock.js来连接到服务器的微型运行时.
- --inline 表示inline模式
- --progress 显示打包的进度
- --config 后面跟配置文件，可以看到，主配置文件是build/webpack.dev.conf.js
关于webpack-dev-server的自动刷新模式，可以看[这里](https://github.com/NickChuCode/vn-template/issues/1)
## webpack.dev.conf.js
> webpack开发环境配置

这个文件主要做了以下几件事情：
1. 引入各种依赖，同时也引入了config文件夹下的变量和配置，和一个工具函数build/utils.js，
2. 合并build/webpack.base.conf.js配置文件，
3. 配置开发环境一些devServer，plugin等配置，
4. 最后导出了一个Promise，根据配置的端口，寻找可用的端口来启动服务。

具体的注释看[这里](https://github.com/NickChuCode/vn-template/blob/master/build/webpack.dev.conf.js)

## build.js
> npm run build 指定的运行文件

这个文件主要做了以下几件事情：
1、引入build/check-versions文件，检查node和npm的版本，
2、引入相关插件和配置，其中引入了webpack生产环境的配置build/webpack.prod.conf.js，
3、先控制台输出loading，删除dist目录下的文件，开始构建，构建失败和构建成功都给出相应的提示信息。

具体注释看[这里](https://github.com/NickChuCode/vn-template/blob/master/build/build.js)

## check-versions.js
> 检查node 和 npm 版本

这个文件主要引入了一些插件和配置，最后导出一个函数，版本不符合预期就输出警告。

具体注释看[这里](https://github.com/NickChuCode/vn-template/blob/master/build/check-versions.js)
