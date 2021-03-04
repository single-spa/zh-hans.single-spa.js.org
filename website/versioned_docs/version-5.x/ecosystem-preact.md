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

<<<<<<< HEAD
在调用`singleSpaPreact(opts)`方法时，```opts```参数会将所有选项传递给single-spa-preact。选项如下：
- `preact`: (必填) Preact对象，一般挂载在window上，也可以通过`require('preact')`  或  `import preact from 'preact'` 引入
- `rootComponent`: (必填) 将要渲染的Preact应用根组件
- `domElementGetter`: (必填) 这个参数是个函数，没有入参，返回一个DOM元素。这个DOM元素会作为该Preact应用初始化、挂载和卸载的对象
=======
- `preact`: (required) The main Preact object, which is generally either exposed onto the window or is available via `require('preact')` or `import preact from 'preact'`.
- `rootComponent`: (required) The top level preact component which will be rendered
<<<<<<< HEAD
- `domElementGetter`: (optional) A function that takes in no arguments and returns a DOMElement. This dom element is where the Preact application will be bootstrapped, mounted, and unmounted. If omitted, a div will be created and appended to the body.
>>>>>>> 11795bae2c1dd3a1852d98d9662468a8c138d50d
=======
- `domElementGetter`: (optional) A function that is given the single-spa props and returns a DOMElement. This dom element is where the Preact application will be bootstrapped, mounted, and unmounted. If omitted, a div will be created and appended to the body.
>>>>>>> 82d3d0654a4c1d3ea34f978af584b4cdb4f4a83b
