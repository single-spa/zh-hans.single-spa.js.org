---
id: ecosystem-cycle
title: single-spa-cycle
sidebar_label: Cycle
---
single-spa-cycle是一个辅助库，通过[Cycle.js](https://cycle.js.org/)帮助实现[single-spa注册应用程序](configuration#registering-applications)[生命周期函数](building-applications.md#registered-application-lifecycle) （bootstrap, mount and unmount）。查看[single-spa-cycle github](https://github.com/pcmnac/single-spa-cycle)。

## 安装
```sh
npm install --save @pcmnac/single-spa-cycle
```

## 快速开始
在您项目中的入口文件，添加以下命令：

```js

import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'
import singleSpaCycle from '@pcmnac/single-spa-cycle';
import rootComponent from './root.component.js';

const cycleLifecycles = singleSpaCycle({
  run,
  rootComponent,
  drivers: { DOM: makeDOMDriver(document.getElementById('main-content'))}, // or { DOM: makeDOMDriver('#main-content')}
});

export const bootstrap = cycleLifecycles.bootstrap;
export const mount = cycleLifecycles.mount;
export const unmount = cycleLifecycles.unmount;
```

## 选项
调用single-spa-cycle时，所有选项可以通过`opts`参数传递给`singleSpaCycle`。以下选项可用：

- `run`: (必须) Cycle.js启动函数。
- `drivers`: (必须) Cycle.js根组件使用驱动程序（包括DOM驱动程序）。
- `rootComponent`: (必须) Cycle.js最上层组件会被渲染。
