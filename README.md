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

## package.json
> 分析一个项目，一般从package.json的命令入口scripts开始。

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

## 1 webpack.dev.conf.js
> webpack开发环境配置

这个文件主要做了以下几件事情：
1. 引入各种依赖，同时也引入了config文件夹下的变量和配置，和一个工具函数build/utils.js，
2. 合并build/webpack.base.conf.js配置文件，
3. 配置开发环境一些devServer，plugin等配置，
4. 最后导出了一个Promise，根据配置的端口，寻找可用的端口来启动服务。
具体的注释看[这里](https://github.com/NickChuCode/vn-template/blob/master/build/webpack.dev.conf.js)

## 1.1 utils.js
> 工具函数

build/webpack.dev.conf.js引入了build/utils.js工具函数。
该文件主要写了以下几个工具函数：
1、assetsPath返回输出路径，
2、cssLoaders返回相应的css-loader配置，
3、styleLoaders返回相应的处理样式的配置，
4、createNotifierCallback创建启动服务时出错时提示信息回调。
具体注释看[这里](https://github.com/NickChuCode/vn-template/blob/master/build/utils.js)

## 1.2 webpack.base.conf.js
> webpack基本配置文件

build/webpack.dev.conf.js引入了build/webpack.base.conf.js这个webpack基本配置文件。
这个文件主要做了以下几件事情：
1、引入各种插件、配置等，其中引入了build/vue-loader.conf.js相关配置，
2、创建eslint规则配置，默认启用，
3、导出webpack配置对象，其中包含context，入口entry，输出output，resolve，module下的rules（处理对应文件的规则），和node相关的配置等。
具体注释看[这里](https://github.com/NickChuCode/vn-template/blob/master/build/webpack.base.conf.js)

## 1.2.1 vue-loader.conf.js
> vue-loader配置文件

build/webpack.dev.conf.js提到引入了build/vue-loader.conf.js。
这个文件主要导出了一份Vue-loader的配置，
主要有：loaders，cssSourceMap，cacheBusting，transformToRequire
具体注释看[这里](https://github.com/NickChuCode/vn-template/blob/master/build/vue-loader.conf.js)

看完了这些文件相应配置，开发环境的相关配置就串起来了。其中config/文件夹下的配置都已经注释在build/文件夹下的对应的文件中，所以就不单独说明了。

## 2 build.js
> npm run build 指定的运行文件

下面看package.json的scripts中的npm run build配置，node build/build.js，其实就是用node去执行build/build.js文件。
这个文件主要做了以下几件事情：
1、引入build/check-versions文件，检查node和npm的版本，
2、引入相关插件和配置，其中引入了webpack生产环境的配置build/webpack.prod.conf.js，
3、先控制台输出loading，删除dist目录下的文件，开始构建，构建失败和构建成功都给出相应的提示信息。
具体注释看[这里](https://github.com/NickChuCode/vn-template/blob/master/build/build.js)

## 2.1 check-versions.js
> 检查node 和 npm 版本

这个文件主要引入了一些插件和配置，最后导出一个函数，版本不符合预期就输出警告。
具体注释看[这里](https://github.com/NickChuCode/vn-template/blob/master/build/check-versions.js)

## 2.2 webpack.prod.conf.js
> webpack 生产环境配置

build/build.js提到，引入了这个配置文件。
这个文件主要做了以下几件事情：
1、引入一些插件和配置，其中引入了build/webpack.base.conf.js webpack基本配置文件，
2、用DefinePlugin定义环境，
3、合并基本配置，定义自己的配置webpackConfig，配置了一些modules下的rules，devtools配置，output输出配置，一些处理js、提取css、压缩css、输出html插件、提取公共代码等的
plugins，
4、如果启用gzip，再使用相应的插件处理，
5、如果启用了分析打包后的插件，则用webpack-bundle-analyzer，
6、最后导出这份配置。
具体注释看[这里](https://github.com/NickChuCode/vn-template/blob/master/build/webpack.prod.conf.js)

至此，npm run dev和npm run build两个主要的script就分析完了

## .babelrc
> babel相关配置

具体注释看[这里](https://github.com/NickChuCode/vn-template/blob/master/.babelrc)

