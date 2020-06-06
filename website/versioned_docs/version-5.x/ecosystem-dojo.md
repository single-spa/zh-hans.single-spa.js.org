---
id: ecosystem-dojo
title: single-spa-dojo
sidebar_label: Dojo
---

[![Build Status](https://travis-ci.com/single-spa/single-spa-dojo.svg?branch=master)](https://travis-ci.com/single-spa/single-spa-dojo)

single-spa-dojo 是一个工具库，可以帮助实现使用 [Dojo](https://dojo.io/) 框架的前端应用在转为 [single-spa 注册应用](configuration#registering-applications)时所需要的[生命周期函数](building-applications.md#registered-application-lifecycle)（bootstrap, mount and unmount）。查看 [single-spa-dojo 的 github 仓库](https://github.com/single-spa/single-spa-dojo)。


## 安装
```sh
npm install --save single-spa-dojo

<<<<<<< HEAD
# 或
=======
# or
>>>>>>> a91c4630a6197f8b83eaf5bbb648e7762f3cad39
yarn add single-spa-dojo
```

## 快速开始

打包好的程序“入口文件”应如下所示，这样就能将你的应用程序作为浏览器原生支持的 ES 模块加载。

```js
import { renderer } from '@dojo/framework/core/vdom';
import { v, w } from '@dojo/framework/widget-core/d';
import singleSpaDojo from 'single-spa-dojo';
import App from './app';

const dojoLifecycles = singleSpaDojo({
  // 必需
  renderer,

  // 必需
  v,

  // 必需
  w,

  // 必需
  appComponent: App,

  // 可选 - 参见 https://dojo.io/learn/creating-widgets/rendering-widgets#mountoptions-properties
  mountOptions: {
    // 可选
    registry: myRegistry,

    // 可选 - single-spa 会自动提供
    domNode: document.getElementById('myContainer'),

    // 可选
    sync: true
  }
});

export const bootstrap = dojoLifecycles.bootstrap;
export const mount = dojoLifecycles.mount;
export const unmount = dojoLifecycles.unmount;
```

## 选项配置

所有选项配置都包括在调用`singleSpaDojo(opts)`时，所传入的`opts`参数中，提供以下选项：

- `renderer` (必需): 从 Dojo 框架导入的 `renderer` 函数。参见 https://dojo.io/learn/creating-widgets/rendering-widgets#rendering-to-the-dom。
- `v` (必需): 在 Dojo 框架中渲染 dom 元素的函数。JSX 通常会隐藏此功能，但可以在 `import { v } from '@dojo/framework/widget-core/d'` 中找到它。
- `w` (必需):  在 Dojo 框架中渲染 dom 元素的函数。JSX 通常会隐藏此功能，但可以在 `import { v } from '@dojo/framework/widget-core/d'` 中找到它。
- `appComponent` (必需): Dojo 根组件的类或函数。
- `mountOptions` (可选): [Dojo MountOptions](https://dojo.io/learn/creating-widgets/rendering-widgets#mountoptions-properties) 对象。请注意，如果未提供 `domNode`，它将由 single-spa-dojo 提供。
