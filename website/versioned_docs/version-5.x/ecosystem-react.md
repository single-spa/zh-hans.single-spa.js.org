---
id: ecosystem-react
title: single-spa-react
sidebar_label: React
---

[![Build Status](https://travis-ci.com/single-spa/single-spa-react.svg?branch=master)](https://travis-ci.com/single-spa/single-spa-react)

single-spa-react 是一个辅助库，它可以帮助React应用程序实现single-spa 需要的命周期函数（bootstrap、mount 和 unmount）。请查看[single-spa-react github](https://github.com/single-spa/single-spa-react)。

## 安装
```sh
npm install --save single-spa-react

# or
yarn add single-spa-react
```
另外，您也可以通过添加 `<script src="https://unpkg.com/single-spa-react"></script>` 并访问全局变量 `singleSpaReact` 来使用 single-spa-react。

## 快速入门

你的打包工具 "入口文件 `entry file`" 应该如下所示，这样你的应用程序就可以把它作为浏览器内的ES模块下载。

```js
import React from 'react';
import ReactDOM from 'react-dom';
import rootComponent from './path-to-root-component.js';

// 注意 Singlespacontext 是一个为react@16.3(如果可用的话)提供的上下文，包含了 singleSpa props
import singleSpaReact, {SingleSpaContext} from 'single-spa-react';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent,
  errorBoundary(err, info, props) {
    // https://reactjs.org/docs/error-boundaries.html
    return (
      <div>This renders when a catastrophic error occurs</div>
    );
  },
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
```

## 选项

所有的选项都是在调用singleSpaReact(opts)时通过opts参数传递给single-spa-react。以下是可用的选项。

- `React`：(必填) 主React对象，一般是暴露在window上或通过`require('react')` `import React from 'react'`引入。
- `ReactDOM`：(必填) 主ReactDOMbject，可以通过 `require('react-dom')` 从'react-dom'中导入ReactDOM。
- `rootComponent`： (必填) 将被渲染的顶层React组件。只有在提供了loadRootComponent的情况下才可以省略。
- `loadRootComponent`：(可选) 一个加载函数。由 parcel 触发用来获取 [custom single-spa props](https://single-spa.js.org/docs/building-applications/#custom-props) 的loading方法，返回值为Promise。 如果如提供了此选项，它将取代 rootComponent选项。它的目的是为了帮助那些想要懒加载根组件的源代码的人。源代码将在 `bootstrap` 生命周期中被懒加载。
- `suppressComponentDidCatchWarning`：(可选) 一个布尔值，表示当rootComponent没有实现componentDidCatch时，single-spa-react是否应该发出警告。默认值为false。
- `domElementGetter`：(可选) 一个不接收任何参数并返回一个DOM元素的函数。这个 dom 元素是 React 应用程序将被初始、挂载和卸载的地方。注意，这个选项可以省略。当省略时，`domElementGetter` 或 `domElement` 的
[custom single-spa props](https://single-spa.js.org/docs/building-applications/#custom-props)会被使用。要使用这些，请执行 `singleSpa.registerApplication(name, app, activityFn, {domElementGetter: function() {...}})` 或
`singleSpa.registerApplication(name, app, activityFn, {domElement: document.getElementById(...)})`。如果通过这些方法中的任何一个都找不到dom元素，那么就会创建一个容器div并附加到document.body中。
- parcelCanUpdate：(可选) 一个布尔值，控制是否为返回的 `parcel` 创建更新生命周期。注意，该选项不影响单个spa应用，只影响 parcels。默认情况下，它是true。
- `renderType`：(可选) 可选值：['render'，'hydrate'，'createRoot'，'createBlockingRoot']。 默认为 'render'。允许你选择你想在你的应用程序中使用哪个ReactDOM渲染方法。

## 注意

对于react@>=16，最好的做法是让每个 single-spa 应用程序的根应用程序实现componentDidCatch，以避免整个应用程序在发生错误时意外卸载。更多细节请参见https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html。


## SingleSpaContext

## Parcels
single-spa-react也可以用来创建一个 single-spa parcel（而不是single-spa 应用程序）。要做到这一点，只需调用 singleSpaReact()，就像调用应用程序一样，除了没有domElementGetter之外（因为这些都是由挂载parcel的代码提供的）。

此外，single-spa-react 提供了一个 `<Parcel>` 组件，使使用框架的人不需要知道 single-spa parcels。 这使得你可以把parcel放到你的render方法的jsx中，而不需要实现componentDidMount和componentWillUnmount。
你可以通过npm安装该库并导入single-spa-react/parcel，或者通过添加`<script src="https://unpkg.com/single-spa-react/parcel"></script>`，然后用window.Parcel.default访问Parcel组件。

#### Parcel props
<<<<<<< HEAD
- `config` (必填)：要么是一个single-spa parcel配置对象，要么是一个 "加载函数"，返回一个resolve包裹配置的Promise。
- `wrapWith` (可选)：[tagName](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName) 字符串。`<Parcel>` 将创建一个该类型的 dom 节点，包裹Parcel生成的节点。 默认：`div`
- `appendTo` (可选)：将 parcel append到此 dom 元素下。 默认情况下，这是不需要的，因为包裹将挂载在包裹组件所呈现的 DOM 中。 当想要把 parcel 放到 document.body 或 指定dom特定位置时很有用。
- `mountParcel` (有时需要，有时不需要)：由 single-spa 所提供的 mountParcel 功能。 我们建议使用应用程序的 mountParcel 函数， 而非 single-spa 的fen mountParcel 函数. 这样，single-spa 可以跟踪父子关系，并在应用程序卸载时自动卸载应用程序的包。请注意，如果 `<Parcel>` 组件是由使用 single-spa-react 的 single-spa 应用程序render而来的，则无需传递prop，因为 `<Parcel>` 可以从 [SingleSpaContext](#singlespacontext) 中获取prop。
- `handleError` (可选)：Function 类型。parcel抛出错误时被调用。 如果没有提供，默认情况下，将在窗口上抛出错误。
- `parcelDidMount` (可选)：Function 类型。当包 parcel 完成装载时，将调用该命令。

#### 例子
=======
- `config` (required): Either a single-spa parcel config object, or a "loading function" that returns a Promise that resolves with the parcel config.
- `wrapWith` (optional): A string [tagName](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName).`<Parcel>` will create a dom node of that type for the parcel to be mounted into. Defaults to `div`
- `wrapStyle`(optional): Styles that will apply to `wrapWith`.
- `wrapClassName` (optional): classNames that will apply to `wrapWith`. 
- `appendTo` (optional): A dom element to append the parcel to. By default, this is not needed because the parcel will be mounted in the DOM that the `<Parcel>` component was rendered into. Useful for appending parcels to document.body or other separate parts of the dom.
- `mountParcel` (sometimes required, sometimes not): The `mountParcel` function provided by single-spa. In general, it is preferred to use an application's mountParcel function instead of the
   single-spa's root mountParcel function, so that single-spa can keep track of the parent-child relationship and automatically unmount the application's parcels when the application unmounts.
   Note that if the `<Parcel>` component is being rendered by a single-spa application that uses single-spa-react, it is **unnecessary** to pass in the prop, since `<Parcel>` can get the prop
   from [SingleSpaContext](#singlespacontext)
- `handleError` (optional): A function that will be called with errors thrown by the parcel. If not provided, errors will be thrown on the window, by default.
- `parcelDidMount` (optional): A function that will be called when the parcel finishes loading and mounting.

#### Examples
>>>>>>> 15fa18609d3df694d52a4ec9f90440b839bec2d9
```jsx
// Use this import path in environments that support package.json exports
// See https://nodejs.org/dist/latest-v14.x/docs/api/packages.html#packages_package_entry_points
// and see https://github.com/single-spa/single-spa-react/releases/tag/v3.0.0
// Use this in Webpack 5 and recent versions of Node
import Parcel from 'single-spa-react/parcel'

// Use this import path in environments that don't support package.json exports
// See https://nodejs.org/dist/latest-v14.x/docs/api/packages.html#packages_package_entry_points
// and see https://github.com/single-spa/single-spa-react/releases/tag/v3.0.0
// Use this in Webpack 4 and older versions of Node
import Parcel from 'single-spa-react/lib/esm/parcel'


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

// Add styles to wrapWith element.
<Parcel
  config={parcelConfig}
  wrapWith="div"
  wrapStyle={{ background: 'black' }}
/>

// Add classNames to wrapWith element.
<Parcel
  config={parcelConfig}
  wrapWith="div"
  wrapClassName="wrapper"
/>

```

## 创建 React 应用
查看 [create-react-app 常见问题](https://single-spa.js.org/docs/faq.html#create-react-app)
