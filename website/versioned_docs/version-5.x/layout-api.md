---
id: layout-api
title: 布局引擎 API
sidebar_label: API
---

`single-spa-layout`库暴露了多个javascript方法作为公共API

## constructRoutes

constructRoutes API将布局定义转换为不透明的“已解析路由”对象。我们称之为“不透明”，因为形状是不相关的，因为您将只在单个spa布局中调用其他API时使用它。

```js
import { constructRoutes } from 'single-spa-layout';

const htmlTemplate = document.querySelector('#single-spa-template')
const layoutData = {
  props: {
    authToken: "78sf9d0fds89-0fysdiuf6sf8",
    loggedInUser: fetch('/api/user')
  },
  loaders: {
    mainContent: `<img src="loading.gif">`,
    // A single-spa parcel config
    topNav: singleSpaReact({...})
  }
};

const resolvedRoutes = constructRoutes(htmlTemplate, layoutData)
```

**参数**

- `routesConfig` (必填): Routes config 是一个 [JSON Layout 定义](/docs/layout-definition/#json-layouts), 一个 [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), 或者一个[parse5 HTML element](https://github.com/inikulin/parse5). 如果他是一个HTML元素, 他必须是一个 `<single-spa-router>` 元素或者一个包含 `<single-spa-router>`标签的`<template>`.
- `layoutData` (可选): Layout data 是一个可选的对象它定义了 [props](/docs/layout-definition/#props) 和为[HTML Layouts](/docs/layout-definition/#html-layouts)定义的[loaders](/docs/layout-definition/#props). 如果你使用[JSON Layout](/docs/layout-definition/#json-layout)可以省略或者你不需要在你的HTML Layout里面定义props或者loaders。layoutData对象应该有顶层属性`props`和`loaders`，每一个对象的主键的prop和loader和对应的值

**返回值**

一个不透明`resolvedRoutes`对象。因为当你调用其他signle-spa-layout API只需要使用这个对象并不需要读取读取或者修改这个`resolvedReroutes`

## constructApplications

`constructApplications` API 将你的`resolvedRoute`转换成[single-spa 应用注册对象](/docs/configuration#registering-applications)。这个应用注册对象经常去调用[singleSpa.registerApplication()](/docs/api/#registerapplication).
```js
import { constructRoutes, constructApplications } from 'single-spa-layout';
import { registerApplication } from 'single-spa';

const resolvedRoutes = constructRoutes(...)
const applications = constructApplications({
  routes: resolvedRoutes,
  loadApp: (app) => System.import(app.name)
})
applications.forEach(registerApplication);
```

**参数**

`constructApplications` 接收一个带有下面属性的对象作为参数:

- `routes` (必填): 这个不透明的`resolvedRoutes`对象返回`constructRoutes`
- `loadApp` (必填): 是一个应用对象并且必须返回[loading function](/docs/configuration/#loading-function-or-application)

**返回值**

`constructApplications` 返回一个数组[single-spa registration objects](/docs/configuration/#registering-applications).

## constructLayoutEngine

`constructLayoutEngine` API 将`resolvedRoutes`和`applications`转换成一个 `layoutEngine`对象。布局引擎(layout engine)负责创建，销毁和再路由转换过程中重排DOM元素

```js
import { constructRoutes, constructApplications, constructLayoutEngine } from 'single-spa-layout';
import { registerApplication, start } from 'single-spa';

const resolvedRoutes = constructRoutes(...);
const applications = constructApplications(...);
const layoutEngine = constructLayoutEngine({routes: resolvedRoutes, applications: applications});

layoutEngine.isActive(); // true
layoutEngine.deactivate();
layoutEngine.activate();

applications.forEach(registerApplication);
start();
```

**参数**

`constructLayoutEngine` 接收一个带有下面属性的对象作为参数:

- `routes` (必填): 一个不透明的`resolvedRoutes`对象不返回`constructRoutes`
- `applications` (必填): 一个数组[application registration objects](/docs/configuration/#registering-applications)返回`constructApplications`
- `active` (可选): 一个布尔型标志是否启动layout engine,默认是true

**返回值**

一个带有下面属性的对象`layoutEngine`:

- `isActive`: 一个不带参数的函数并返回一个布尔型标志当前layout engine是否启动。当处于启动状态，layout engine将会在路由转换过程中改变DOM
- `activate`:  一个不带参数并返回`undefined`.调用这个方法可以启动layout engine, 其中包含了路由事件监听便于引擎会在路由转换过程中改变DOM
- `deactivate`: 一个不带参数并返回`undefined`。调用这个方法会停掉layout engine,其中包含了停掉所有路由事件监听这样便于layout engine不会在路由转换过程中改变DOM

## matchRoute

`matchRoute` API 主要是用于服务端渲染。他返回一个过滤后的`resolvedRoutes`对象，它仅包含匹配一个特殊路径的路由

```js
import { constructRoutes, matchRoute } from 'single-spa-layout';

const resolvedRoutes = constructRoutes(...);

const settingsRoutes = matchRoute(resolvedRoutes, "/settings")
const dashboardRoutes = matchRoute(resolvedRoutes, "/dashboard")
```

**参数**

- `routes` (必填): 从`constructRoutes`返回一个不透明的`resolvedRoutes`
- `path` (必填): 一个匹配路由的字符串路径。注意这个路径不是一个URL - 它只是一个浏览器URL的路径名。在服务端渲染的上下文中，可以使用req.url

**返回值**
一个不透明的`resolvedRoutes`对象。因为你只会在调用其他single-spa-layout APIs的时候使用这个对象并且不需要进行读取或修改`resolvedRoutes`
