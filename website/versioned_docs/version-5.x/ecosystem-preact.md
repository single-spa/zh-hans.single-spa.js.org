---
id: ecosystem-preact
title: single-spa-preact
sidebar_label: Preact
---
single-spa-preact是个帮助类库，通过实现[生命周期函数](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount)，可以帮助开发者在single-spa中快速[注册](configuration#registering-applications) [Preact](https://preactjs.com/)应用。仓库地址见 [single-spa-preact github](https://github.com/single-spa/single-spa-preact) 。
## 安装
```sh
npm install --save preact
```

## 快速开始
在项目的入口文件添加如下代码：

```js
import preact from 'preact';
import rootComponent from './path-to-root-component.js';
import singleSpaPreact from 'single-spa-preact';

const preactLifecycles = singleSpaPreact({
  preact,
  rootComponent,
  domElementGetter: () => document.getElementById('main-content'),
});

export const bootstrap = preactLifecycles.bootstrap;
export const mount = preactLifecycles.mount;
export const unmount = preactLifecycles.unmount;
```

## 选项

在调用`singleSpaPreact(opts)`方法时，```opts```参数会将所有选项传递给single-spa-preact。选项如下：
- `preact`: (必填) Preact对象，一般挂载在window上，也可以通过`require('preact')`  或  `import preact from 'preact'` 引入
- `rootComponent`: (必填) 将要渲染的Preact应用根组件
- `domElementGetter`: (必填) 这个参数是个函数，没有入参，返回一个DOM元素。这个DOM元素会作为该Preact应用初始化、挂载和卸载的对象