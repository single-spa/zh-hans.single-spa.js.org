---
id: module-types
title: 微前端类型
sidebar_label: 微前端类型
---

# 概念: 微前端的不同类型

Single-spa有[不同类别](/docs/microfrontends-concept/#types-of-microfrontends)。取决于你在哪里以及怎么使用它们。参考single-spa团队的[建议](/docs/recommended-setup/#applications-versus-parcels-versus-utility-modules).

这是每个single-spa概念上的工作方式，这些信息有助于你理解我们的[建议](/docs/recommended-setup/#applications-versus-parcels-versus-utility-modules)。

| 概念               | 应用程序                       | 沙箱                              | 公共模块                              |
| -------------------- | --------------------------------- | ------------------------------------ | ------------------------------------ |
| 路由              | 有多个路由              | 无路由                         | 无路由                        |
| API                  | 声明API                   | 必要的API                        | 没有single-spa API                   |
| 渲染UI          | 渲染UI                       | 渲染UI                           | 不直接渲染UI          |
| 生命周期           | single-spa管理生命周期     | 自定义管理生命周期            | 没有生命周期                        |
| 什么时候使用          | 核心构建模块              | 仅在多个框架中需要 | 共享通用逻辑时使用         |

每个微前端都是一个浏览器内的JavaScript模块([说明](/docs/recommended-setup#in-browser-versus-build-time-modules)).

## 应用程序

### 应用程序声明

应用程序使用`registerApplication`声明API，您的single-spa配置（有时也称为根配置）会提前定义应用程序，定义的每个应用程序处于激活状态的条件，但不会直接挂载应用程序。

### 应用程序管理生命周期

single-spa管理注册的应用程序，并负责其所有生命周期。这样就可以避免你写什么时候应该安装和卸载应用程序的大量逻辑。 single-spa可以帮你解决这个问题。所有single-spa要定义激活方法来自动完成这项工作，该方法描述了你的应用程序什么时候时应处于激活状态。

## 沙箱

### 沙箱是十分有用的

Parcels以多种方式存在，是正常声明流中的出口。 它们的存在主要是让您在多个框架中编写应用程序时可以在应用程序之间重用UI。

### 管理parcels的生命周期

当您调用 `mountParcel` 或 `mountRootParcel` [(请参见API)](/docs/parcels-api.md)时，将立即挂载parcel并返回这个parcel对象。 当调用 `mountParcel` 的组件卸载后，你需要在parcel上手动调用`unmount`方法。

### Parcels 最适合在框架之间共享UI部分

创建一个parcel 和 在一个特定的组件或UI上为该框架使用[single-spa助手](/docs/ecosystem#help-for-frameworks)一样容易。 这会返回一个对象(`parcelConfig`)，single-spa可以使用该对象来创建和挂载parcel。由于single-spa可以在任何地方挂载parcel，所以可以通过这种方式在各个框架之间共享UI或组件。 但是，共享UI在同一框架的另一个应用程序中使用的时候，不应该使用parcel。
例如：`application1` 用Vue编写，包含创建用户的所有UI和逻辑。 `application2`是用React编写的，需要创建一个用户。 使用single-spa parcels可以让您包装`application2`Vue组件。尽管框架不同，但它可以在`application2'内部运行。
将Parcels视为Web组件的single-spa特定实现。

## 公共模块

### 公共模块共享通用逻辑

公共模块是共享通用逻辑的好地方。 您可以用一个普通的JavaScript对象 (single-spa 公共模块)共享一段逻辑，代替在每个应用程序中都创建自己的通用逻辑实现。
例如：授权。 每个应用程序怎么知道哪个用户已登录？ 你可以让每个应用程序都询问服务器或读取JWT，但这会在每个应用程序中创建重复的工作。
使用Utility程序模块模式会让你创建一个实现授权逻辑的模块。 该模块将导出所有你需要的方法，然后你的其他的single-spa 应用程序可以通过导入这个模块来使用这些授权方法。
这种方法也适用于数据[fetching](/docs/recommended-setup#api-data)。
