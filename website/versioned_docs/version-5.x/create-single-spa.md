---
id: create-single-spa
title: create-single-spa
sidebar_label: create-single-spa
---

对于那些喜欢自动生成和管理webpack，babel，jest等配置的用户，Single-spa提供了一个CLI。您不一定非得用CLI来生成single-spa的配置。


此CLI为 `create-single-spa` ([Github link](https://github.com/single-spa/create-single-spa/))。它旨在用于创建新项目和更新由 `create-single-spa` 创建的项目，但不适用于将已经存在的代码库迁移至singa-spa。

## Installation and Usage

如果你想全局安装 create-single-spa ，请在终端中运行如下命令： 

```sh
npm install --global create-single-spa

# or
yarn global add create-single-spa
```

执行以下命令:

```sh
create-single-spa
```

你也可以选择本地安装 create-single-spa

```sh
npm init single-spa

# or
npx create-single-spa

# or 
yarn create single-spa
```

这将触发CLI提示，询问你将创建或更新哪种项目。

## CLI arguments

你可以如下这种方式传参数给`create-single-spa` :

```sh
# Different ways of doing the same thing
create-single-spa --framework react
npm init single-spa --framework react
npx create-single-spa --framework react
yarn create single-spa --framework react
```

以下为有效参数：

### --dir

你可以用以下方式指定 `create-single-spa` 执行的路径
```sh
# Two ways of doing the same thing
create-single-spa my-dir
create-single-spa --dir my-dir
```

### --moduleType

你可以用 `--moduleType` 指定创建哪一种应用 :

```sh
create-single-spa --moduleType root-config
create-single-spa --moduleType app-parcel
create-single-spa --moduleType util-module
```

### --framework

你可以用 `--framework` 参数指定使用哪种框架，如果不传 `--moduleType` ，默认是 `app-parcel`。

```sh
create-single-spa --framework react
create-single-spa --framework vue
create-single-spa --framework angular
```

### --layout

When generating a root config, the `--layout` CLI argument indicates that you want to use [single-spa-layout](/docs/layout-overview) in your root config.

## Project types

create-single-spa 将询问你将要创建 single-spa应用，公共模块，或者根配置。所有这三种模式都会假定你使用的是[推荐安装](/docs/recommended-setup)。

如果你选择创建一个single-spa应用，则会提示您选择哪种框架。React使用 babel + webpack + jest的预置配置。Angular使用Angular CLI和[single-spa-angular]()。Vue使用Vue CLI和[vue-cli-plugin-single-spa](/ecosystem/ecosystem-vue#vue-cli)。

# NPM packages

Within the create-single-spa repo, there are several NPM packages. The following sections document each package:
create-single-spa提供如下NPM包：

## create-single-spa

[Github project](https://github.com/single-spa/create-single-spa/tree/master/packages/create-single-spa)

核心CLI，调用了[generator-single-spa](#generator-single-spa)。

## generator-single-spa

[Github project](https://github.com/single-spa/create-single-spa/tree/master/packages/generator-single-spa)

提示用户然后创建文件的[Yeoman generator](https://yeoman.io/)。主要通过create-single-spa CLI调用，但是如果你想定制化它，也可以被[composed](https://yeoman.io/authoring/composability.html)。

## webpack-config-single-spa

[Github project](https://github.com/single-spa/create-single-spa/tree/master/packages/webpack-config-single-spa)

可分享可定制化的webpack配置，应用于公共模块和React single-spa应用。

### 安装

```sh
npm install --save-dev webpack-config-single-spa webpack-merge

# or
yarn add --dev webpack-config-single-spa webpack-merge
```

### 用法

```js
const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    // The name of the organization this application is written for
    orgName: 'name-of-company',
    // The name of the current project. This usually matches the git repo's name
    projectName: 'name-of-project',
    // See https://webpack.js.org/guides/environment-variables/#root for explanation of webpackConfigEnv
    webpackConfigEnv,
    // The CLI commands in the package.json script that triggered this build
    argv,     
    // optional
    // This changes whether package names that start with @your-org-name are
    // treated as webpack externals or not. Defaults to true
    orgPackagesAsExternal: true,
  })

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  })
}
```

## webpack-config-single-spa-react

[Github project](https://github.com/single-spa/create-single-spa/tree/master/packages/webpack-config-single-spa-react)

可分享可定制化的webpack配置，可将react的特定配置添加到 `webpack-config-single-spa` 中。

### 安装

```sh
npm install --save-dev webpack-config-single-spa-react webpack-merge

# or
yarn add --dev webpack-config-single-spa-react webpack-merge
```

### 用法

```js
const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    // The name of the organization this application is written for
    orgName: 'name-of-company',
    // The name of the current project. This usually matches the git repo's name
    projectName: 'name-of-project',
    // See https://webpack.js.org/guides/environment-variables/#root for explanation of webpackConfigEnv
    webpackConfigEnv,
    // The CLI commands in the package.json script that triggered this build
    argv, 
    // optional
    // This changes whether package names that start with @your-org-name are
    // treated as webpack externals or not. Defaults to true
    orgPackagesAsExternal: true,
  })

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  })
}
```

## webpack-config-single-spa-ts

[Github project](https://github.com/single-spa/create-single-spa/tree/master/packages/webpack-config-single-spa-ts)

A shareable, customizable webpack config that adds typescript-specific configuration to `webpack-config-single-spa`. Note that webpack-config-single-spa-ts has a peerDependency on `typescript`.

### Installation

```sh
npm install --save-dev webpack-config-single-spa-ts webpack-merge

# or
yarn add --dev webpack-config-single-spa-ts webpack-merge
```

### Usage

```js
const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-ts');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    // The name of the organization this application is written for
    orgName: 'name-of-company',
    // The name of the current project. This usually matches the git repo's name
    projectName: 'name-of-project',
    // See https://webpack.js.org/guides/environment-variables/#root for explanation of webpackConfigEnv
    webpackConfigEnv,
    // The CLI commands in the package.json script that triggered this build
    argv,
  })

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  })
}
```

```js
const singleSpaTs = require('webpack-config-single-spa-ts');

// Alternatively, you may modify a webpack config directly
const myOtherWebpackConfig = {/* ... */}
const finalConfig = singleSpaDefaults.modifyConfig(myOtherWebpackConfig)
```

## webpack-config-single-spa-react-ts

[Github project](https://github.com/single-spa/create-single-spa/tree/master/packages/webpack-config-single-spa-react-ts)

A shareable, customizable webpack config that creates a webpack config that works with both react and typescript. Note that webpack-config-single-spa-react-ts simply merges the config from webpack-config-single-spa-react with that of webpack-config-single-spa-ts.

### Installation

```sh
npm install --save-dev webpack-config-single-spa-react-ts webpack-merge

# or
yarn add --dev webpack-config-single-spa-react-ts webpack-merge
```

### Usage

```js
const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    // The name of the organization this application is written for
    orgName: 'name-of-company',
    
    // The name of the current project. This usually matches the git repo's name
    projectName: 'name-of-project',
    
    // optional
    // This changes whether package names that start with @your-org-name are
    // treated as webpack externals or not. Defaults to true
    orgPackagesAsExternal: true,
    
    // See https://webpack.js.org/guides/environment-variables/#root for explanation of webpackConfigEnv
    webpackConfigEnv,
    
    // optional
    // This changes whether package names that start with @your-org-name are
    // treated as webpack externals or not. Defaults to true
    orgPackagesAsExternal: true,
    
    // The CLI commands in the package.json script that triggered this build
    argv,
  })

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  })
}
```
<<<<<<< HEAD
=======

## single-spa-web-server-utils

The `single-spa-web-server-utils` package is a collection of functions that help when implementing a web server for an index.html file. This package can be used to inline import maps into an HTML, which helps with the performance of your application. Additionally, it can be used to modify a browser import map so that it's suitable for usage in NodeJS for dynamic module loading and server rendering ([Dynamic Module Loading](/docs/ssr-overview#a-module-loading) and [Server Rendering](https://single-spa.js.org/docs/ssr-overview#intro-to-ssr))).

The web server utils poll the import map from a URL and generate a `browserImportMap` and `nodeImportMap` from the response.

### Installation

```sh
npm install --save single-spa-web-server-utils

# alternatively
yarn add single-spa-web-server-utils
```

### getImportMaps

The `getImportMaps` function accepts an object parameter and returns a promise that resolves with an object with two import maps: `browserImportMap` and `nodeImportMap`.

```js
const { getImportMaps } = require('single-spa-web-server-utils');
const http = require('http');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const htmlTemplate = ejs.compile(fs.readFileSync(path.resolve(process.cwd(), 'views/index.html'), 'utf-8'));

http.createServer((req, res) => {
  getImportMaps({
    // required
    // The URL at which the server
    url: 'https://my-cdn.com/live.importmap',

    // optional - defaults to 30000
    // The ms to wait when polling the import map
    pollInterval: 30000,

    // optional - defaults to false
    // Whether to allow for import-map-overrides via cookies sent in the request.
    // More details about overrides via cookies at
    // https://github.com/joeldenning/import-map-overrides/blob/master/docs/api.md#node
    allowOverrides: true,

    // optional - only needed when allowOverrides is true
    // The IncomingMessage from an http server. This is used to gather
    // cookies for import-map-overrides
    req,

    // optional
    // This allows you to remove entries from the downloaded import map
    // from the returned `nodeImportMap`. This is useful for customizing
    // an import map that is used in the browser so that it can be used
    // for dynamic NodeJS module loading. Each key is a string import specifier.
    // Keys that you return `true` for are preserved in the nodeImportMap.
    nodeKeyFilter(key) {
      return true;
    }
  })
  .then(({browserImportMap, nodeImportMap}) => {
    console.log(browserImportMap, nodeImportMap);

    // Example of how to inline a browser import map
    const htmlWithInlinedImportMap = htmlTemplate({importMap: browserImportMap});
    res.setResponseHeader('Content-Type', 'text/html');
    res.status(200).send(htmlWithInlinedImportMap);

    // Example of how to apply a NodeJS import map
    // More info at https://github.com/node-loader/node-loader-import-maps
    global.nodeLoader.setImportMapPromise(Promise.resolve(nodeImportMap));
    import('module-in-import-map');
  });
});
```
>>>>>>> 931547fda02c82aa9d2f58d0626149c794917242
