---
id: ecosystem-react
title: single-spa-react
sidebar_label: React
---

[![Build Status](https://travis-ci.com/single-spa/single-spa-react.svg?branch=master)](https://travis-ci.com/single-spa/single-spa-react)

Single-spa-React 是一个用 React 来实现 single-spa 生命周期函数(bootstrap、 mount 和 unmount) 的 helper 库。 地址[single-spa-react github](https://github.com/single-spa/single-spa-react)。

## 安装
```sh
npm install --save single-spa-react

# Or
yarn add single-spa-react
```

或者, 通过script标签的方式 `<script src="https://unpkg.com/single-spa-react"></script>` 引入, 然后访问全局变量 `singleSpaReact`。

## 快速开始

您的打包 “输入文件” 看起来应该像下面这样，它允许您的应用程序作为浏览器内的 ES 模块下载。

```js
import React from 'react';
import ReactDOM from 'react-dom';
import rootComponent from './path-to-root-component.js';

// Singlespacontext 是一个 react@16.3(如果可用的话)上下文，它提供了 singleSpa props
import singleSpaReact, {SingleSpaContext} from 'single-spa-react';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent,
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
```

## 选项

所有选项在调用 `singleSpaReact(opts)` 时通过 `opts` 参数传进 single-spa-react。 提供以下选项：

- `React`: (required) 通过 `require('react')` `import React from 'react'` 引入。
- `ReactDOM`: (required) 通过 `require('react-dom')` `import ReactDOM from 'react-dom'`引入。
- `rootComponent`: (required) React 根组件，存在 loadRootComponent 选项时省略。
- `loadRootComponent`: (optional) Function 类型。由 parcel 触发用来获取 [custom single-spa props](https://single-spa.js.org/docs/building-applications/#custom-props) 的loading 方法，返回值为Promise。 如果如提供了这个选项，它将取代 rootComponent选项。主要用来在初始化期间下载源码，并懒加载根组件。
- `suppressComponentDidCatchWarning`: (optional) Boolean 类型。 指示在rootComponent 未实现 componentDidCatch 时是否应警告 single-spa-react。 默认：false。
- `domElementGetter`: (optional) Function 类型。它不接受任何参数并返回DOMElement。这个dom元素是React应用程序将被初始化，挂载和卸载的地方。请注意，此选择可以省略。 省略时, 选项 `domElementGetter` 或 `domElement`
[custom single-spa props](https://single-spa.js.org/docs/building-applications/#custom-props) 应该被使用。使用这些，请执行 `singleSpa.registerApplication(name, app, activityFn, {domElementGetter: function() {...}})` 或
`singleSpa.registerApplication(name, app, activityFn, {domElement: document.getElementById(...)})`。 如果通过这些方法都找不到 dom 元素，那么默认情况下，将创建一个容器 div 并添加到 document.body 中。
- `parcelCanUpdate`: (optional) Boolean 类型。是否为返回的 parcel 创建更新生命周期。请注意，该选项不会影响 single-spa 应用程序，而只会影响 parcels。默认 true。
- `renderType`: (optional) 可选值：['render'，'hydrate'，'createRoot'，'createBlockingRoot']。 默认： `'render'`. 应用程序选取 ReactDOM 的哪个渲染方式

## 注意

对于react @> = 16，最佳做法是让每个 single-spa 应用程序的根应用程序实现componentDidCatch，以避免在发生错误时意外卸载整个应用程序。如果未实现componentDidCatch，则 single-spa 将向控制台发出警告。有关更多详细信息，请参见https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html。


## SingleSpaContext

## Parcels
single-spa-react还可以用于创建一个 single-spa parcel（而不是一个 single-spa 应用程序）。与应用程序相同调用 singleSpaReact() 但不需要 domElementGetter 选项（挂载包的code会提供此选项）。

此外，single-spa-react 提供了一个 `<Parcel>` 组件，使得使用框架的人不需要知道 single-spa parcels。 它允许您将 parcel 放入render方法的 jsx 中，而不必实现 componentDidMount 和 componentWillUnmount。

使用 Parcel 组件可以通过 import `single-spa-react/parcel` 或者 通过script标签`<script src="https://unpkg.com/single-spa-react/parcel"></script>` 引入变量 `window.Parcel.default`。

#### Parcel props
- `config` (required): parcel 配置 object，或 一个获取 parcel 配置的loading 方法，返回值为Promise。
- `wrapWith` (optional): [tagName](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName) 字符串。`<Parcel>` 将创建一个该类型的 dom 节点，包裹Parcel生成的节点。 默认：`div`
- `appendTo` (optional): 将 parcel append到此 dom 元素下。 默认情况下，这是不需要的，因为包裹将挂载在包裹组件所呈现的 DOM 中。 当想要把 parcel 放到 document.body 或 指定dom特定位置时很有用。
- `mountParcel` (有时需要，有时不需要): 由 single-spa 所提供的 mountParcel 功能。 我们建议使用应用程序的 mountParcel 函数， 而非 single-spa 的fen mountParcel 函数. 这样，single-spa 可以跟踪父子关系，并在应用程序卸载时自动卸载应用程序的包。请注意，如果 `<Parcel>` 组件是由使用 single-spa-react 的 single-spa 应用程序render而来的，则无需传递prop，因为 `<Parcel>` 可以从 [SingleSpaContext](#singlespacontext) 中获取prop。
- `handleError` (optional): Function 类型。parcel抛出错误时被调用。 如果没有提供，默认情况下，将在窗口上抛出错误。
- `parcelDidMount` (optional): Function 类型。当包 parcel 完成装载时，将调用该命令。

#### 例子
```jsx
import Parcel from 'single-spa-react/parcel'
import * as parcelConfig from './my-parcel.js'

// config 必需. The parcel will be mounted inside of the
// of a div inside of the react component tree
<Parcel
  config={parcelConfig}

  wrapWith="div"
  handleError={err => console.error(err)}

  customProp1="customPropValue2"
  customProp2="customPropValue2"
/>

// If you pass in an appendTo prop, the parcel will be mounted there instead of
// to a dom node inside of the current react component tree
<Parcel
  config={parcelConfig}
  wrapWith="div"
  appendTo={document.body}
/>

// You can also pass in a "loading function" as the config.
// The loading function must return a promise that resolves with the parcel config.
// The parcel will be mounted once the promise resolves.
<Parcel
  config={() => import('./my-parcel.js')}
  wrapWith="div"
/>

// If you are rendering the Parcel component from a single-spa application, you do not need to pass a mountParcel prop.
// But if you have a separate react component tree that is not rendered by single-spa-react, you **must** pass in a mountParcel prop
// In general, it is preferred to use an application's mountParcel function instead of the single-spa's root mountParcel function,
// so that single-spa can keep track of the parent-child relationship and automatically unmount the application's parcels when the application
// unmounts
<Parcel
  mountParcel={singleSpa.mountParcel}
  config={parcelConfig}
  wrapWith="div"
/>
```

## 创建 React 应用
查看 [create-react-app 常见问题](https://single-spa.js.org/docs/faq.html#create-react-app)
