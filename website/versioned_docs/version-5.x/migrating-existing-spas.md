---
id: migrating-existing-spas
title: 迁移现有的 SPA 应用
sidebar_label: 迁移现有的代码
---


如果你想将现有的 SPA 应用迁移到 single-spa 框架中，需要做三件事：

1. 创建一个[single spa 配置](configuration)
2. [将 SPA 应用转换为注册应用](#converting-spas-into-registered-applications)
3. 调整 html 文件，使 single-spa 配置生效，查看[文档](configuration#indexhtml-file)

## 将 SPA 应用转换为注册应用

你现有的 SPA 应用，无论是基于 Angular，React 还是其他技术，可能都无法从 DOM 中将自身卸载。而且，可能都是控制整个 html 页面，而不是一个不对`<script>`标签和`<link>`标签进行唯一控制的单纯 JavaScript 应用程序。因此，为了将它们转换为 single-spa 注册应用，需要在实现其生命周期功能时处理掉这些问题。

### (1) 实现生命周期

请参阅[注册应用的生命周期文档](building-applications.md#registered-application-lifecycle)，以了解需要做什么。最难的部分可能就是 `unmount` 这个生命周期，因为大多数 SPA 都不会休眠并从 DOM 卸载自身。在实现生命周期功能时，请先查看[生态系统文档](ecosystem.md)。如果文档中没有列出你所使用的技术栈，则必须确保在你自己实现的 `unmount` 中，能够清理其 DOM 节点，DOM 事件侦听（所有的事件侦听，尤其是 `hashchange` 和 `popstate`）以及释放内存。

### (2) 使 CSS、字体和 `<script>` 等依赖生效

由于现有的 SPA 应用中， CSS、字体、第三方脚本等依赖都在 index.html 文件中，因此你可能必须做一些工作，以确保当你的 SPA 应用变成了[无 HTML 应用程序](building-applications.md)之后，这些依赖可以正常工作。最好是将所有的资源都打包到 js 文件中，但是你也可以将所需要的资源列在[single spa 配置](configuration)中。
