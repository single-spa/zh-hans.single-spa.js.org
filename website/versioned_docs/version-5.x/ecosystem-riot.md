---
id: ecosystem-riot
title: single-spa-riot
sidebar_label: Riot
---

single-spa-riot是一个帮助实现[single-spa注册应用](configuration#registering-applications)[生命周期函数](building-applications.md#registered-application-lifecycle)(引导、挂载和卸载)的工具库，可与[riot](https://riot.js.org/)一起使用。 仓库地址见[single-spa-riot github](https://github.com/ariesjia/single-spa-riot)。

[![NPM](https://img.shields.io/npm/v/single-spa-riot.svg)](https://www.npmjs.com/package/single-spa-riot)

[![Build Status](https://travis-ci.com/ariesjia/single-spa-riot.svg?branch=master)](https://travis-ci.com/ariesjia/single-spa-riot)

[![minified](https://badgen.net/bundlephobia/minzip/single-spa-riot)](https://bundlephobia.com/result?p=single-spa-riot)

## Installation
```sh
npm install --save single-spa-riot
```

## Usage

```js
import * as Riot from 'riot';
import singleSpaRiot from 'single-spa-riot';
import App from './App.riot'

const riotLifecycles = singleSpaRiot({
  rootComponent: Riot.component(App),
  domElementGetter: () => document.getElementById('#app')
});

export const bootstrap = riotLifecycles.bootstrap;

export const mount = riotLifecycles.mount;

export const unmount = riotLifecycles.unmount;
```

## Options

在调用`singleSpaRiot(opts)`方法时，`opts` 参数会将所有选项传递给single-spa-riot。选项如下：

- `domElementGetter`: (必填) 回调函数，返回根组件挂载的元素。
- `rootComponent`: (选填，将会替换 `appOptions.loadRootComponent`) riot根组件。
- `loadRootComponent`: (选填，将会替换 `appOptions.rootComponent`) 一个返回根元素的Promise对象，它对于实现懒加载很有帮助。