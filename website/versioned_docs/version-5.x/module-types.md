---
id: module-types
title: single-spa Microfrontend Types
sidebar_label: Microfrontend Types
---

# 概念: 微前端的不同类型

Single-spa有[不同类别](/docs/microfrontends-concept/#types-of-microfrontends)。取决于你在哪里以及怎么使用它们。参考single-spa团队的[建议](/docs/recommended-setup/#applications-versus-parcels-versus-utility-modules).

这是每个single-spa概念上的工作方式，这些信息有助于你理解我们的[建议](/docs/recommended-setup/#applications-versus-parcels-versus-utility-modules)。

<<<<<<< HEAD
<<<<<<< HEAD
| 主题                | 应用程序                       | 沙箱                              | 公共模块                              |
| -------------------- | --------------------------------- | ------------------------------------ | ------------------------------------ |
| 路由              | 有多个路由              | 无路由                         | 无路由                        |
| API                  | 声明API                   | 必要的API                        | 没有single-spa API                   |
| 渲染UI          | 渲染UI                       | 渲染UI                           | 不直接渲染UI          |
| 生命周期           | single-spa管理生命周期     | 自定义管理生命周期            | 没有生命周期                        |
| 什么时候使用          | 核心构建模块              | 仅在多个框架中需要 | 共享通用逻辑时使用         |
=======
| Topic                | Application                       | Parcel                               | Utility                                           |
| -------------------- | --------------------------------- | ------------------------------------ | ------------------------------------------------- |
| Routing              | has multiple routes               | has no routes                        | has no routes                                     |
| API                  | declarative API                   | imperative API                       | exports a public interface                        |
| Renders UI           | renders UI                        | renders UI                           | may or may not render UI                          |
| Lifecycles           | single-spa managed lifecycles     | custom managed lifecycles            | external module: no direct single-spa lifecycles  |
| When to use          | core building block               | only needed with multiple frameworks | useful to share common logic, or create a service |
>>>>>>> 11795bae2c1dd3a1852d98d9662468a8c138d50d
=======
| Topic       | Application                   | Parcel                               | Utility                                           |
| ----------- | ----------------------------- | ------------------------------------ | ------------------------------------------------- |
| Routing     | has multiple routes           | has no routes                        | has no routes                                     |
| API         | declarative API               | imperative API                       | exports a public interface                        |
| Renders UI  | renders UI                    | renders UI                           | may or may not render UI                          |
| Lifecycles  | single-spa managed lifecycles | custom managed lifecycles            | external module: no direct single-spa lifecycles  |
| When to use | core building block           | only needed with multiple frameworks | useful to share common logic, or create a service |
>>>>>>> ffad7a2d4a3e5b9c93a9c506f56cb8d4be8e989c

每个微前端都是一个浏览器内的JavaScript模块([说明](/docs/recommended-setup#in-browser-versus-build-time-modules)).

## 应用程序

<<<<<<< HEAD
### 应用程序声明

应用程序使用`registerApplication`声明API，您的single-spa配置（有时也称为根配置）会提前定义应用程序，定义的每个应用程序处于激活状态的条件，但不会直接挂载应用程序。

### 应用程序管理生命周期

single-spa管理注册的应用程序，并负责其所有生命周期。这样就可以避免你写什么时候应该安装和卸载应用程序的大量逻辑。 single-spa可以帮你解决这个问题。所有single-spa要定义激活方法来自动完成这项工作，该方法描述了你的应用程序什么时候时应处于激活状态。

## 沙箱

### 沙箱是十分有用的
=======
### Applications are declarative

Applications use a declarative API called `registerApplication`. Your single-spa config (also sometimes called the root config) defines applications ahead of time and defines the conditions for when each application is active, but it doesn't mount the applications directly.

### Applications have managed lifecycles

single-spa manages registered applications and is in charge of all of their lifecycles. This prevents you from needing to write a bunch of logic about when applications should mount and unmount; single-spa takes care of that for you.
All that single-spa needs to make this work automatically is an activity function that describes when your application should be active.

### Applications and their public interface

Applications [_must_ export their lifecycles](/docs/building-applications#registered-application-lifecycle) so they can be managed by single-spa, but they can also export additional methods, values, components, parcels, or more as part of their public interface. It is common to use these exports inside another application so you can create highly cohesive modules with low coupling.

## Parcels

### Parcels are imperative

Parcels exist in many ways as an escape hatch from the normal declarative flow. They exist primarily to allow you to reuse pieces of UI across applications when those applications are written in multiple frameworks.

### You manage the lifecycles of parcels

When you call `mountParcel` or `mountRootParcel` [(see API)](/docs/parcels-api) the parcel is mounted immediately and returns the parcel object. You need to call the `unmount` method on the parcel manually when the component that calls `mountParcel` unmounts.

### Parcels are best suited for sharing pieces of UI between frameworks

Creating a parcel is as easy as using the [single-spa helpers](/docs/ecosystem#help-for-frameworks) for that framework on a specific component/UI. This returns an object (`parcelConfig`) that single-spa can use to create and mount a parcel.
Because single-spa can mount a parcel anywhere, this gives you a way to share UI/components across frameworks. It should not be used if the shared UI is being used in another application of the same framework.
For example: `application1` is written in Vue and contains all the UI and logic to create a user. `application2` is written in React and needs to create a user. Using a single-spa parcel allows you to wrap your `application1` Vue component
in a way that will make it work inside `application2` despite the different frameworks.
Think of parcels as a single-spa specific implementation of webcomponents.
>>>>>>> ffad7a2d4a3e5b9c93a9c506f56cb8d4be8e989c

Parcels以多种方式存在，是正常声明流中的出口。 它们的存在主要是让您在多个框架中编写应用程序时可以在应用程序之间重用UI。

<<<<<<< HEAD
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
=======
### How do Utilites relate to single-spa?

A utility is an in-browser module that (generally) has it's own repository and CI process. It exports a public interface of functions and variables that any other microfrontend can import and use. A utility microfrontend is just like any other microfrontend, except it doesn't serve as a single-spa application or parcel.

### Utility modules share common logic

Utility modules are a great place to share common logic. Instead of each application creating their own implementation of common logic, you can use a plain JavaScript object (single-spa utility) to share that logic.
For example: Authorization. How does each application know which user is logged in? You could have each application ask the server or read a JWT but that creates duplicate work in each application.
Using the utility module pattern would allow you to create one module that implements the authorization logic. This module would export any needed methods, and then your other single-spa applications could use those authorization methods by importing them.
This approach also works well for data [fetching](/docs/recommended-setup#api-data).

### Examples of Utility Microfrontends

The following are commonly implemented as a Utility Microfrontend:

- Notification service
- Styleguide/component library
- Error tracking service
- Authorization service
- Data fetching
<<<<<<< HEAD
>>>>>>> 11795bae2c1dd3a1852d98d9662468a8c138d50d
=======
>>>>>>> ffad7a2d4a3e5b9c93a9c506f56cb8d4be8e989c
