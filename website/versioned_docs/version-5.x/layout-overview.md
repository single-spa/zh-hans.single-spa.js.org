---
id: layout-overview
title: 布局引擎
sidebar_label: 概览
---

## 介绍

[Github 仓库](https://github.com/single-spa/single-spa-layout/)

The `single-spa-layout` npm package is an optional add-on to single-spa. The layout engine provides a routing API that controls your top level routes, applications, and dom elements. Using single-spa-layout makes it easier to accomplish the following:
`single-spa-layout` npm 包是一个可选的single-spa扩展插件。它提供了路由API来控制顶层路由，应用和DOM元素。使用`single-spa-layout`可以轻松完成下面的功能

- DOM生成和应用排序.
- 在应用加载完成后加载UI.
- 为Not Found / 404设置默认路由.
- 路由过渡（待实现）.

The layout engine performs two major tasks:
布局引擎主要有下面两个功能：

1. 从HTML / JSON对象生成 [single-spa 注册配置](/docs/api/#configuration-object)
1. 监听 [路由事件](/docs/api/#events)来确保在single-spa挂载完成之前DOM元素加载正确.

`single-spa-layout` is 3.2kb gzipped (9kb ungzipped).

## 下载

你只需要下载`single-spa-layout`到 [root config](/docs/configuration/) (不要放到其他的应用里).

```sh
npm install --save single-spa-layout@beta

# or
yarn add single-spa-layout@beta
```

### 项目状态

`single-spa-layout` 是一个新的并且当前在npm上有`beta`标签。我们正在收集反馈来改善并为了有一个稳定的版本做准备。虽然我们不希望layout-engine有一个彻底的改变，但是我们推荐在layout-engine稳定后再应用到生产环境
### 浏览器支持

`single-spa-layout` 可以在所有浏览器中运行，包括IE11

### 要求

你需要在single-spa@>=5.4.0的版本里面使用layout engine，另外，你不用在你的任何single-spa应用中提供自定义`domElementGetter` ，因为他们会覆盖 `single-spa-layout` 的配置

## 基本用法

在你的根html文件中添加 `template`元素到head标签中，他需要有一个`<single-spa-router>`元素并且需要包含 `<route` 和 `<application>` 元素，并包含其他DOM元素  
```html
<html>
  <head>
    <template id="single-spa-layout">
      <single-spa-router>
        <nav class="topnav">
          <application name="@organization/nav"></application>
        </nav>
        <div class="main-content">
          <route path="settings">
            <application name="@organization/settings"></application>
          </route>
          <route path="clients">
            <application name="@organization/clients"></application>
          </route>
        </div>
        <footer>
          <application name="@organization/footer"></application>
        </footer>
      </single-spa-router>
    </template>
  </head>
</html>
```

在你的root-config js代码里添加下面的代码

```js
import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';

const routes = constructRoutes(document.querySelector('#single-spa-layout'));
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
start();
```
