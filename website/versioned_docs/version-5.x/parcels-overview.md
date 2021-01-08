---
id: parcels-overview
title: Parcels
sidebar_label: Overview
---
Parcels是single-spa的一个高级特性。在对single-spa的注册相关api有更多了解之前，请尽量避免使用该特性。一个single-spa 的 parcel，指的是一个与框架无关的组件，由一系列功能构成，可以被应用手动挂载，无需担心由哪种框架实现。Parcels 和注册应用的api一致，不同之处在于parcel组件需要手动挂载，而不是通过activity方法被激活。


一个parcel可以大到一个应用，也可以小至一个组件，可以用任何语言实现，只要能导出正确的生命周期事件即可。在 single-spa 应用中，你的SPA可能会包括很多个注册应用，也可以包含很多parcel。通常情况下我们建议你在挂载parcel时传入应用的上下文，因为parcel可能会和应用一起卸载。

如果你只使用了一种框架，建议使用框架组件（如React、Vue、Angular组件）而不是parcel共享功能。Parcel多包裹了一层中间层，而框架组件在应用间调用时会更容易，你可以通过`import`语法直接在注册应用里导入一个组件。只有在涉及到跨框架的应用之间进行组件调用时，我们才需要考虑parcel的使用。 ([更多细节](/docs/recommended-setup#in-browser-versus-build-time-modules))

## 快速示例

```js
// parcel 的实现
const parcelConfig = {
<<<<<<< HEAD
  bootstrap() {
    // 初始化
    return Promise.resolve()
  },
  mount() {
    // 使用某个框架来创建和初始化dom
    return Promise.resolve()
  },
  unmount() {
    // 使用某个框架卸载dom，做其他的清理工作
    return Promise.resolve()
=======
  // optional
  bootstrap(props) {
    // one time initialization
    return Promise.resolve();
  },
  // required
  mount(props) {
    // use a framework to create dom nodes and mount the parcel
    return Promise.resolve();
  },
  // required
  unmount(props) {
    // use a framework to unmount dom nodes and perform other cleanup
    return Promise.resolve();
  },
  // optional
  update(props) {
    // use a framework to update dom nodes
    return Promise.resolve();
>>>>>>> 8044c413fd035fec1af5bb3379bbbf0c4ea5024d
  }
}

// 如何挂载parcel
const domElement = document.getElementById('place-in-dom-to-mount-parcel')
const parcelProps = {domElement, customProp1: 'foo'}
const parcel = singleSpa.mountRootParcel(parcelConfig, parcelProps)

// parcel 被挂载，在mountPromise中结束挂载
parcel.mountPromise.then(() => {
  console.log('finished mounting parcel!')
  // 如果我们想重新渲染parcel，可以调用update生命周期方法，其返回值是一个 promise
  parcelProps.customProp1 = 'bar'
  return parcel.update(parcelProps)
})
.then(() => {
  // 在此处调用unmount生命周期方法来卸载parcel. 返回promise
  return parcel.unmount()
})
```
## Pacel 配置
一个parcel只是一个由3到4个方法组成的对象。当挂载一个parcel时，你可以直接提供挂载对象，也可以提供loading方法来异步下载parcel对象。
parcel对象上的每个方法都是一个生命周期函数，返回值是promise。Parcels有3个必填生命周期函数(bootstrap， mount 和 unmount)和1个可选生命周期函数(update)。
强烈建议通过[生命周期helper方法](ecosystem.md#help-for-frameworks)来当实现一个parcel。 

一个React parcel示例如下：

<<<<<<< HEAD
=======
A parcel is just an object with 3 or 4 functions on it. When mounting a parcel, you can provide either the object itself or a loading function that asynchronously downloads the parcel object.
Each function on a parcel object is a lifecycle method, which is a function that returns a promise. Parcels have two required lifecycle methods (mount and unmount) and two optional lifecycles method (bootstrap and update).
When implementing a parcel, it's strongly recommended that you use the [lifecycle helper methods](ecosystem.md#help-for-frameworks).
An example of a parcel written in React would look like this:
>>>>>>> 8044c413fd035fec1af5bb3379bbbf0c4ea5024d
```js
// myParcel.js
import React from 'react'
import ReactDom from 'react-dom'
import singleSpaReact from 'single-spa-react'
import MyParcelComponent from './my-parcel-component.component.js'
export const MyParcel = singleSpaReact({
  React,
  ReactDom,
  rootComponent: MyParcelComponent
})

// 在这个示例中，singleSpaReact 处理input并生成了一个含有生命周期函数的parcel
```

<<<<<<< HEAD
需要使用上面例子生成的parcel，你只需引用由[single-spa-react](single-spa-react.md#parcels)提供的`Parcel`组件。
=======
Then to use the parcel you just created all you need to do is use the `Parcel` component provided in [single-spa-react](ecosystem-react.md#parcels)
>>>>>>> 8044c413fd035fec1af5bb3379bbbf0c4ea5024d

```jsx
// mycomponent.js
import Parcel from 'single-spa-react/parcel'
import { MyParcel } from './myparcel.js'

export class myComponent extends React.Component {
  render () {
    return (
      <Parcel
        config={MyParcel}
        { /* optional props */ }
        { /* and any extra props you want here */ }
      />
    )
  }
}
```

<<<<<<< HEAD
注意在某些情况下，可选属性也可能会要求必填。[(查看更多示例)](single-spa-react.md#examples)
=======
Note that in some cases the optional props are required [(see additional examples)](ecosystem-react.md#examples).
>>>>>>> 8044c413fd035fec1af5bb3379bbbf0c4ea5024d

## Parcel 生命周期

可以先查看 [应用生命周期](api.md#registered-application-lifecycle) 来了解single-spa的生命周期方法。

### 初始化(Bootstrap)

这个生命周期函数只在parcel第一次挂载前调用一次。

```js
function bootstrap(props) {
  return Promise
    .resolve()
    .then(() => {
      // 在这里做初始化相关工作
      console.log('bootstrapped!')
    });
}
```

### 挂载（Mount）

在`mountParcel`方法被调用且parcel未挂载时触发，一般会创建DOM元素、初始化事件监听等，从而为用户提供展示内容。

```js
function mount(props) {
  return Promise
    .resolve()
    .then(() => {
      // 在这里通知框架（如React等）渲染DOM
      console.log('mounted!')
    });
}
```

### Unmount
### 卸载(Unmount)

这个生命周期函数被调用的时机是parcel已经被挂载，且满足下列某个条件：
- `unmount()`被调用
- 父parcel或者应用被卸载

当被调用时，这个方法会清除DOM元素、DOM事件监听，清理内存泄漏、全局变量、事件订阅等在挂载parcel时创建的内容。

```js
function unmount(props) {
  return Promise
    .resolve()
    .then(() => {
      // 在这里通过框架语言停止渲染和移除dom
      console.log('unmounted!');
    });
}
```

### Update (optional)
### 更新(Update)(可选)

<<<<<<< HEAD
当调用`parcel.update()`会触发更新生命周期函数。该生命周期函数是可选的，parcel使用者需要在调用该方法之前确认其已经实现。
=======
The update lifecycle function will be called whenever the user of the parcel calls `parcel.update()`.
Since this lifecycle is optional, the user of a parcel needs to check whether the parcel has implemented the update lifecycle before attempting to make the call.

## Example use cases
>>>>>>> 7115511064b81e340d4e71ae26a9c2a9ecab730c

## 使用示例
### 模态框

`App1` 处理和联系人相关的所有逻辑(高内聚)，但`App2`中需要新建一个联系人。
我们有以下方法在应用1和应用2中共享功能：
- 如果两个应用使用同一个框架，可以 export/import组件实现
- 重新实现一份创建联系人的逻辑(逻辑分散，不再内聚)
- 使用single-spa parcels

从`App1`导出一个parcel，包括创建联系人的功能。这样就可以在不丢失应用高内聚特性的基础上，在跨框架的应用间共享组件行为。
App1可以将moadel导出作为parcel，App2导入该parcel并使用。在下面的例子中，一个主要的好处在于从App1导出的parcel/modal也将会被卸载，而无需卸载/加载App1。

```js
// App1
export const AddContactParcel = {
  bootstrap: bootstrapFn,
  mount: mountFn,
  unmount: unmountFn,
}

// App2
// 获取parcel，该例子使用systemJS和React
componentDidMount() {
  SystemJS.import('App1').then(App1 => {
    const domElement = document.body
    App2MountProps.mountParcel(App1.AddContactParcel, {domElement})
  })
}
```
## `mountRootParcel` 和 `mountParcel`
single-spa 对外暴露了两套parcels相关接口。二者的区别主要在于调用者和调用接口的方式。

|                   | mountRootParcel        | mountParcel                  |
| ----------------- | ---------------------- | ---------------------------- |
| 上下文           | singleSpa              | application                  |
| 卸载条件  | 手动卸载            | 手动卸载 + 应用被卸载时 |
| api 位置      | singleSpa 命名导出 | 生命周期属性中提供   |

### 我应该使用哪个
通常我们建议使用`mountParcel`API。`mountParcel`允许你将parcel在应用里当做一个普通组件处理，不需要考虑parcel由哪个框架实现，也不需要强制调用`unmount()`方法卸载parcel

### 如何获取`mountParcel` API ？
为了能够绑定在应用的上下文中，mountParcel会作为[生命周期属性](building-applications.md#lifecyle-props)进行传入。你需要在自己的应用中存储和管理其方法。

`mountParcel` API例子：
```js
// App1
let mountParcel
export const bootstrap = [
  (props) => {
    mountParcel = props.mountParcel
    return Promise.resolve()
  },
  // 其他更多boostrap
]
```
注意：一些类库(如React)支持在框架里存储和管理parcel。在这些情况下我们不需要写helper方法来存储和管理`mountParcel`方法。





