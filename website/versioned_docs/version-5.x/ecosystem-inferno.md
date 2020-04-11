---
id: ecosystem-inferno
title: single-spa-inferno
sidebar_label: Inferno
---
single-spa-inferno是一个辅助库，通过[Inferno](https://infernojs.org/)帮助实现[single-spa注册应用程序](configuration#registering-applications)[生命周期函数](building-applications.md#registered-application-lifecycle)（bootstrap, mount and unmount）。查看[single-spa-cycle github](https://github.com/pcmnac/single-spa-cycle)。查看 [single-spa-inferno github](https://github.com/single-spa/single-spa-inferno)。

## 快速开始
首先，在应用程序中执行`npm install --save single-spa-inferno`。然后在应用程序入口文件中添加以下命令。

```js
import Inferno from 'inferno';
import rootComponent from './path-to-root-component.js';
import singleSpaInferno from 'single-spa-inferno';

const infernoLifecycles = singleSpaInferno({
  Inferno,
  createElement,
  rootComponent,
  domElementGetter: () => document.getElementById('main-content'),
});

export const bootstrap = infernoLifecyles.bootstrap;
export const mount = infernoLifecyles.mount;
export const unmount = infernoLifecyles.unmount;
```

## 选项
调用single-spa-inferno时，所有选项可以通过`opts`参数传递给`singleSpaInferno`。以下选项可用：

- `inferno`: (必须) 暴露在窗口的主要Inferno对象，可以通过 `require('inferno')` or `import Inferno from 'inferno`引入。
- `createElement`: (必须) 默认导出Inferno的`inferno-create-element`包。
- `rootComponent`: (必须) 最上层Inferno组件会被渲染。
- `domElementGetter`: (必须)一个不带任何参数并返回DOMElement的函数。这个dom元素可以作为Inferno应用程序bootstrapped、mounted和unmounted操作的地方。
