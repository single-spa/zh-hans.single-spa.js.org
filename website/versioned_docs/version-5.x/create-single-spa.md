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

你也可以选择本地安装 create-single-spa

```sh
npm init single-spa

# or
npx create-single-spa

# or 
yarn create single-spa
```

这将触发CLI提示，询问你将创建或更新哪种项目。create-single-spa **会安装在当前目录**，因此如果从头开始，请确保创建一个空目录。

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

yarn add --dev webpack-config-single-spa webpack-merge
```

### 用法

```js
const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa');

module.exports = webpackConfigEnv => {
  const defaultConfig = singleSpaDefaults({
    // The name of the organization this application is written for
    orgName: 'name-of-company',
    // The name of the current project. This usually matches the git repo's name
    projectName: 'name-of-project',
    // If your project uses typescript, set typecheck. Otherwise, omit it.
    typecheck: 'typescript',
    // Set to true if your project uses react
    react: true,
    // See https://webpack.js.org/guides/environment-variables/#root for explanation of webpackConfigEnv
    webpackConfigEnv,
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

yarn add --dev webpack-config-single-spa-react webpack-merge
```

### 用法

```js
const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa');

module.exports = webpackConfigEnv => {
  const defaultConfig = singleSpaDefaults({
    // The name of the organization this application is written for
    orgName: 'name-of-company',
    // The name of the current project. This usually matches the git repo's name
    projectName: 'name-of-project',
    // If your project uses typescript, set typecheck. Otherwise, omit it.
    typecheck: 'typescript',
    // See https://webpack.js.org/guides/environment-variables/#root for explanation of webpackConfigEnv
    webpackConfigEnv,
  })

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  })
}
```