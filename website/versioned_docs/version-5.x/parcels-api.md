---
id: parcels-api
title: Parcels API
sidebar_label: Parcels API
---
除了挂载之外，大部分parcel相关的api都可以被自身调用。

## 挂载
Parcel有两种挂载方式，入参分别是 [parcelConfig](parcels-overview.md#parcel-configuration) 和 [parcelProps](parcels-api.md#parcel-props)。
都会返回一个[parcel 对象](parcels-api.md#parcel-object)。该对象会对外暴露parcel相关的api。

### Parcel 属性(Parcel Props)
当挂载一个parcel时，第二个参数是props，javascript对象类型。该对象包含一个domElement属性，将作为parcel的挂载点。

```js
const parcelProps = {
  customerId: 7,
  numberOfTasks: 42,
  domElement: document.createElement('div')
}
```

### mountParcel

`applicationProps.mountParcel(parcelConfig, parcelProps)`。每个应用会提供一个mountParcel方法。
Parcel可以直接调用应用的`mountParcel`函数进行挂载，好处在于当应用被卸载时，挂载的parcel也会自动卸载。
第一个参数可以是对象或者函数（加载函数），函数的返回值为Promise，resolve的结果是一个对象。【译者注：挂载方式一】
```js
// Synchronous mounting
const parcel1 = applicationProps.mountParcel(parcelConfig, parcelProps);
// Asynchronous mounting. Feel free to use webpack code splits or SystemJS dynamic loading
const parcel2 = applicationProps.mountParcel(() => import('./some-parcel'), parcelProps);
```

### mountRootParcel

 [mountRootParcel](api.md#mountrootparcel) 方法也可以对parcel进行挂载，不过需要手动调用`unmount`卸载。【译者注：挂载方式二】

 ## Parcel 对象

 一个parcel对象包含下面的方法：
 - [mount](parcels-api.md#mount)
- [unmount](parcels-api.md#unmount)
- [update](parcels-api.md#update)
- [getStatus](parcels-api.md#getstatus)
- [loadPromise](parcels-api.md#loadpromise)
- [bootstrapPromise](parcels-api.md#bootstrappromise)
- [mountPromise](parcels-api.md#mountpromise)
- [unmountPromise](parcels-api.md#unmountpromise)

### unmount

`parcel.unmount()` 返回一个promise，当parcel卸载成功后resolve。promise可能会抛出异常，需进行处理。

### mount

`parcel.unmount()` 返回一个promise，当parcel卸载成功后resolve。promise可能会抛出异常，需进行处理。

### update

`parcel.update(props)` 允许你改变传给parcel的参数。注意不是所有的parcel都支持update方法。`update`方法返回一个promise，更新成功后resolve。如有需求可查阅[其他文档](parcels-overview.html#update-optional) 和 [示例](https://single-spa.js.org/docs/parcels-overview.html#quick-example) 。

```js
const parcel = singleSpa.mountRootParcel(parcelConfig, parcelProps);
parcel.update(newParcelProps);
```

### getStatus

`parcel.getStatus()` 返回一个字符串代表parcel的状态。所有状态如下：

- `NOT_BOOTSTRAPPED`: 未初始化
- `BOOTSTRAPPING`: 初始化中
- `NOT_MOUNTED`: 完成初始化，未挂载
- `MOUNTED`: 激活状态，且已挂载至DOM
- `UNMOUNTING`: 卸载中
- `UPDATING`: 更新中
- `SKIP_BECAUSE_BROKEN`: 在初始化、挂载、卸载或更新时发生异常。其他parcel可能会被正常使用，但当前parcel会被跳过。

### loadPromise

`parcel.loadPromise()` 返回一个promise，当parcel被装载(loaded)后resolve。

### bootstrapPromise

`parcel.bootstrapPromise()` 返回一个promise，当parcel初始化后resolve。

### mountPromise

`parcel.mountPromise()` 返回一个promise，当parcel加载后resolve。通常用于检测parcel生成的DOM是否已经挂载。

### unmountPromise

`parcel.unmountPromise()` 返回一个promise，当parcel卸载后resolve。