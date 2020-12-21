---
id: devtools
title: single-spa检测工具
sidebar_label: Overview
---

single-spa检测工具是一个Firefox/Chrome的浏览器扩展工具，用于提供[single-spa](https://single-spa.js.org)开发过程中的一些工具. [Github project](https://github.com/single-spa/single-spa-inspector).

要求： >= single-spa@4.1.

## 安装地址

- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/single-spa-inspector/)
- [Chrome](https://chrome.google.com/webstore/detail/single-spa-inspector/emldbibkihanfiaiaghebffnbahjcgcp)

注意: 你也可以在本地构建运行. [我想贡献代码](#how-to-contribute).

## 特征

- 列出所有注册的应用 (按照挂载顺序)
- 展示所有应用的状态
- 强制挂载、卸载某一个应用
- 展示应用覆盖的记录 ([点击这里](#configuring-app-overlays))查看如何配置覆盖记录，启用该功能
- 提供了一个添加[重写导入映射 (import-maps) ](#import-map-overrides)的接口

## 配置应用覆盖记录

应用覆盖主要提供如下功能：移入一个已经挂载的App的名字时，会展示这个App在浏览器DOM的什么位置，类似我们平时使用的审查元素，当很多应用同时挂载的时候这个功能很有用（例如某些场合下一个单独的页面中4个不同的应用先后加载时）

为了添加应用覆盖, 找到你导出生命周期函数的那个文件（例如bootstrap、mount、unmount）并以如下格式添加你自己希望的配置:

```js
// 常量的名字必须是devtools
export const devtools = {
  overlays: {
    // selectors是必选项
    selectors: [
      // 该配置时css选择器构成的数组，在每个应用的最外层，以该选择器作为标识
      // 你可以设置多个标识，类似多个parcel或‘不同容器对应不同试图’的用法
      "#my-app",
      ".some-container .app"
    ],
    // options不是必选项
    options: {
      // 这些选项用来配置‘覆盖’的样式和一些操作
      width: "100%",
      height: "100%",
      zIndex: 40,
      position: "absolute",
      top: 0,
      left: 0,
      color: "#000",
      background: "#000",
      textBlocks: [
        // 你可以给‘覆盖’添加额外的文本，例如，你可以添加这个配置的开发人员的名字
        // 这个数组中的每个字符串都会在一个新的div中
        // 例如：'blue squad', 'is awesome'会被解析成
        // <div>blue squad</div><div>is awesome</div>
      ]
    }
  }
};
```

## 重写导入映射 (import-maps)
如果你的环境中使用了[导入映射(import-maps)](https://github.com/WICG/import-maps)，当使用[import-map-overrides](https://github.com/joeldenning/import-map-overrides)库时，检测工具会提供一个接口用于添加自定义的‘导入映射’来覆盖默认值，在[满足组件安装条件](https://github.com/joeldenning/import-map-overrides#installation)之后，你就可以创建、移除、刷新页面来查看你覆盖的效果.

![使用导入映射 (import-maps)的single-spa检测工具案例](/img/demo-with-importmapoverrides.png)
