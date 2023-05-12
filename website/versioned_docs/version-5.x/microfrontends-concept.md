---
id: microfrontends-concept
title: 微前端概念
sidebar_label: 微前端概念
---

## 概念：微前端

教程视频：[Youtube/Bilibili](https://www.bilibili.com/video/av83619684)

微前端是指存在于浏览器中的微服务。

微前端作为用户界面的一部分，通常由许多组件组成，并使用类似于React、Vue和Angular等框架来渲染组件。每个微前端可以由不同的团队进行管理，并可以自主选择框架。虽然在迁移或测试时可以添加额外的框架，出于实用性考虑，建议只使用一种框架。

每个微前端都拥有独立的git仓库、package.json和构建工具配置。因此，每个微前端都拥有独立的构建进程和独立的部署/CI。这通常意味着，每个仓库能快速构建。

## 对比微服务

微服务是指后端服务，它们在自己的操作系统中运行，管理自己的数据库并通过网络进行彼此间的通信。

将其与所有存在于单个选项卡中的微前端进行比较：一个选项卡中的所有浏览器javascript都存在于单个操作系统进程（甚至线程！）。浏览器javascript通常不能直接访问数据库，浏览器选项卡内的通信发生在内存中，而不是通过网络进行通信。

那它们有什么共同点？？？

独立的构建和部署。将DOM视为微前端使用的共享资源。一个微前端的DOM不能够被其他微前端触及，类似于一个微服务的数据库不应该被其他没有权限的微服务触及。

## 技术定义

在single-spa中，微前端是浏览器内的javascript模块。可以在 [in the recommended setup](/docs/recommended-setup#in-browser-versus-build-time-modules)中了解更多内容。

## 微前端类型

在single-spa中，有以下三种微前端类型：

1. [single-spa applications](/docs/building-applications):为一组特定路由渲染组件的微前端。
2. [single-spa parcels](/docs/parcels-overview): 不受路由控制，渲染组件的微前端。
3. [utility modules](/docs/recommended-setup#utility-modules-styleguide-api-etc): 非渲染组件，用于暴露共享javascript逻辑的微前端。

一个web应用可能包含一种或多种类型的微前端。差异可见[深入对比](/docs/module-types)，我们推荐[微前端类型选择](/docs/recommended-setup#applications-versus-parcels-versus-utility-modules)。
## 微前端通信

```import {thing} from 'other-microfrontend'```是微前端间通信的首选方式。[详细文档](/docs/recommended-setup#inter-app-communication)

## 关于single-spa

single-spa是一个小于5kb（gzip）npm包，用于协调微前端的挂载和卸载。它知道何时基于[活动](/docs/api/#registerapplication)挂载应用程序，并且可以在[小型适配器库](/docs/ecosystem)的帮助下以与框架无关的方式挂载应用程序。

## 性能
相比于原生应用，微前端性能更佳。这是由于[懒加载](/docs/api/#registerapplication) 和其他相关的优化。微前端为我们提供一种迁移方式，从而解决我们原生项目中隐藏的问题。出于性能考虑，强烈建议框架（如：React, Vue, or Angular等）级别的实例仅引用一次，[具体做法参考](/docs/recommended-setup#shared-dependencies)。

微前端通常比它们来源的单体应用更具性能优势。这是由于内置的惰性加载（通过[加载函数](/docs/api/#registerapplication))）和其他与性能相关的最佳实践所致。你的单体应用很可能有“隐患”——微前端提供了一条迁移路径，可以暴露并解决这些问题。一个重要的性能考虑因素是共享大型库（如React、Vue或Angular）的单个实例，这是高度鼓励的。为此，请参阅我们的[推荐设置](/docs/recommended-setup#shared-dependencies).
