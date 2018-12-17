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

其中，webpack-dev-server是一个单独的npm包，是一个小型的Node.js Express服务器,它使用webpack-dev-middleware来服务于webpack的包,除此自外，它还有一个通过Sock.js来连接到服务器的微型运行时.
--inline 表示inline模式
关于webpack-dev-server的自动刷新模式，可以看[这里](https://github.com/NickChuCode/vn-template/issues/1)
