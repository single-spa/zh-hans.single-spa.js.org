---
id: ecosystem-svelte
title: single-spa-svelte
sidebar_label: Svelte
---

single-spa-svelte是个帮助类库，通过实现[生命周期函数](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount)，可以帮助开发者在single-spa中快速[注册](configuration#registering-applications) [svelte](https://svelte.dev/)应用。仓库地址见 [single-spa-preact github](https://github.com/single-spa/single-spa-svelte) 。

## 快速开始

首先，在[single-spa 应用中](https://github.com/single-spa/single-spa/blob/master/docs/applications.md#registered-applications)执行`npm install --save single-spa-svelte`命令。在项目的入口文件添加如下代码：

```js
import singleSpaSvelte from 'single-spa-svelte';
import myRootSvelteComponent from 'my-root-svelte-component.js';

const svelteLifecycles = singleSpaSvelte({
  component: myRootSvelteComponent,
  domElementGetter: () => document.getElementById('svelte-app'),
  props: { someData: 'data' }
});

export const bootstrap = svelteLifecycles.bootstrap;
export const mount = svelteLifecycles.mount;
export const unmount = svelteLifecycles.unmount;
```

## 选项
在调用`singleSpaPreact(opts)`方法时，```opts```参数会将所有选项传递给single-spa-svelte。选项如下：

- `component`: (必填) 将要被渲染的根组件。这个组件需要被svelte编译过，且**不**能是一个立即调用函数表达式(IIFE)
- `domElementGetter`: (可选) 该参数是一个函数，返回值是一个DOM元素。根组件会挂载在这个DOM元素上，如果没有提供的话，会生成一个默认的DOM元素。

Svelte相关选项
- `anchor`: (可选) 是`domElementGetter`返回DOM元素的子元素，具体介绍可查看svelte关于[创建一个组件](https://svelte.dev/docs#Creating_a_component) 的文档
- `hydrate`: (可选) 具体介绍可查看svelte关于[创建一个组件](https://svelte.dev/docs#Creating_a_component) 的文档
- `intro`: (可选) 如果为`true`，会在初次渲染时展示动画而不是等待后续状态改变
- `props`: (可选) 一个对象，包含各个需要向组件提供的属性

## single-spa 属性

<<<<<<< HEAD
所有的[single-spa 属性](./api.md#registerapplication)都会传递给svelte组件。通过`singleSpaSvelte({props: {...}})`传的属性会和single-spa的属性做合并。
=======
- `anchor`: (optional) A child of the dom element identified by `domElementGetter` to render the component immediately before
- `hydrate`: (optional) See the svelte [Creating a component](https://svelte.dev/docs#Creating_a_component) documentation
- `intro`: (optional) If `true`, will play transitions on initial render, rather than waiting for subsequent state changes
- `props`: (optional) An object of properties to supply to the component

## single-spa props

All [single-spa props](/docs/api/#registerapplication) are passed to the svelte component as props. The props provided to `singleSpaSvelte({props: {...}})` are merged with the single-spa props.
>>>>>>> e115fe201e34fff2e0a14ab68c185e37780e06af
