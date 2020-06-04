---
id: module-types
title: 微前端分类
sidebar_label: 微前端分类
---

# 微前端分类
Single-spa有[不同分类](./microfrontends-concept#types-of-microfrontends.md)的微前端。这取决于您在何处以及如何使用它们。但是，single-spa核心团队有一些[建议](./recommended-setup/#applications-versus-parcels-versus-utility-modules.md)。
以下是每个单spa微前端在概念上是如何工作的。这些信息可以帮助您理解我们的[建议](./recommended-setup/#applications-versus-parcels-versus-utility-modules.md)。

| 话题                | 应用                       | 沙箱                              | 公共模块                              |
| -------------------- | --------------------------------- | ------------------------------------ | ------------------------------------ |
| 路由              | 有多个路由               | 无路由                            | 无路由                            |
| API                  | 声明 API                   | 必要的 API                       | 无single-spa路由                   |
| 渲染UI           | 渲染 UI                        | 渲染 UI                           | 无直接渲染UI           |
| 生命周期           | single-spa 管理生命周期    | 用户管理生命周期            | 无生命周期                        |
| 什么情况下使用          | 核心构建模块              | 用多个框架时需要 | 共享逻辑时使用         |

每个single-spa微前端都是一个浏览器内的javascript模块([详细说明]((./recommended-setup#in-browser-versus-build-time-modules.md))))。



## 应用程序

### 应用程序声明

应用程序使用一个称为“registerApplication”的声明性api。single-spa配置(有时也称为根配置)预先定义了应用程序，定义了它们处于激活状态的条件，但不直接挂载应用程序。

### 应用程序管理生命周期

single-spa管理注册的应用程序，并负责它们的所有生命周期。这可以避免您编写一堆关于应用程序何时应该挂载和卸载的逻辑;single-spa会帮你解决这个问题。所有的single-spa需要定义激活函数来自动完成这个事情，激活函数描述了什么时候你的应用程序应该是激活的。

## 沙箱

### 必要的沙箱
沙箱以许多方式作为常规声明流的出口。它们的存在主要是为了允许您在多个框架中编写应用程序时跨应用程序重用UI。



### 管理你沙箱的生命周期

当您调用“mountParcel”或“mountRootParcel”[(参见 api)](./parcels-api.md)时，沙箱将立即被挂载并返回parcel对象。当调用“mountParcel”的组件卸载时，您需要手动调用沙箱上的“卸载”方法。

### 沙箱最适用于框架之间共享UI

创建一个沙箱与在特定组件/UI上为该框架使用[single-spa 助手](./ecosystem#help-for-frameworks.md)一样简单。这将返回一个对象(parcelConfig)， single-spa可以使用该对象创建和挂载一个沙箱。由于single-spa可以在任何地方挂载沙箱，这为您提供了一种跨框架共享UI/组件的方法。如果共享UI在同一框架的另一个应用程序中使用，则不应使用它。例如:“applicationOne”是用Vue编写的，它包含创建用户的所有UI/逻辑。
“application2”写在React中，需要创建一个用户。使用single-spa沙箱允许您以一种方式包装您的“app1”Vue组件，使其在“application2”中工作，尽管是不同的框架。如果“application2”由single-spa卸载(根据激活函数返回false)，那就更好了，可以将沙箱看作是webcomponent的single-spa特定实现。


## 公共模块共享公共逻辑

公共模块是共享公共逻辑的好地方。您可以使用一个普通的javascript对象(single-spa公共模块)来共享逻辑，而不是每个应用程序都创建自己的通用逻辑实现。例如:授权。每个应用程序如何知道哪个用户已登录?您可以让每个应用程序询问服务器或读取JWT，但这会在每个应用程序中创建重复的工作。通过使用公共模块，您可以围绕登录到一个模块中的人实现逻辑(在模块上导出所有必要的方法)，每个single-spa应用程序可以通过从utilty模块导入方法来使用逻辑。这种方法也适用于数据[获取](./recommended-setup#api-data.md)。
