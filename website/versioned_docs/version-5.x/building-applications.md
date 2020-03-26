---
id: building-applications
title: 构建应用
sidebar_label: 构建应用
---

single-spa 应用与普通的单页面是一样的，只不过它没有HTML页面。在一个single-spa中，你的SPA包含许多被注册的应用，而各个应用可以使用不同的框架。被注册的这些应用维护自己的客户端路由，使用自己需要的框架或者类库。应用只要通过挂载，便可渲染自己的html页面，并自由实现功能。“挂载”(mounted)的概念指的是被注册的应用内容是否已展示在DOM上。我们可通过应用的[activity function](configuration#activity-function)来判断其是否已被挂载。应用在未挂载之前，会一直保持休眠状态。

## 创建并注册一个应用程序
要添加一个应用，首先需要[注册该应用](configuration#registering-applications)。一旦应用被注册后，必须在其入口文件(entry point)实现下面提到的各个生命周期函数。

## 注册应用的生命周期
在一个 single-spa 页面，注册的应用会经过下载(loaded)、初始化(initialized)、被挂载(mounted)、卸载(unmounted)和unloaded（被移除）等过程。single-spa会通过“生命周期”为这些过程提供钩子函数。

生命周期函数是 single-spa 在注册的应用上调用的一系列函数，single-spa 会在各应用的主文件中，查找对应的函数名并进行调用。

注:
- `bootstrap`, `mount`, and `unmount`的实现是必须的，`unload`则是可选的
- 生命周期函数必须有返回值，可以是Promise或者```async```函数
- 如果导出的是函数数组而不是单个函数，这些函数会被依次调用，对于promise函数，会等到resolve之后再调用下一个函数
- 如果 single-spa [未启动](api.md#start)，各个应用会被下载，但不会被初始化、挂载或卸载。

> **注**
>
> 在[single-spa 生态](ecosystem.md)中有各个主流框架对于生命周期函数的实现，这些文档有助于理解这些helper执行的操作，也有助于你自己实现生命周期函数。 


## 生命周期参数
生命周期函数使用"props" 传参，这个对象包含single-spa相关信息和其他的自定义属性。

```js
function bootstrap(props) {
  const {
    name,        // 应用名称
    singleSpa,   // singleSpa实例
    mountParcel, // 手动挂载的函数
    customProps  // 自定义属性
  } = props;     // Props 会传给每个生命周期函数
  return Promise.resolve();
}
```

#### 内置参数

每个生命周期函数的入参都会保证有如下参数：

- `name`: 注册到 single-spa 的应用名称
- `singleSpa`: 对singleSpa 实例的引用, 方便各应用和类库调用singleSpa提供的API时不再导入它。 可以解决有多个webpack配置文件构建时无法保证只引用一个singleSpa实例的问题。
- `mountParcel`: [mountParcel 函数](/docs/parcels-api.html#mountparcel).

#### 自定义参数
除single-spa提供的内置参数外，还可以指定自定义参数，在调用各个生命周期函数时传入。指定方法是在调用`registerApplication`时，传入第4个参数。

<p className="filename">root.application.js</p>

```js
singleSpa.registerApplication(
  'app1', 
  () => {}, 
  () => {}, 
  { authToken: "d83jD63UdZ6RS6f70D0" }
);
```

<p className="filename">app1.js</p>

```js
export function mount(props) {
<<<<<<< HEAD
  console.log(props.customProps.authToken); // 可以在 app1 中获取到authToken参数
=======
  console.log(props.authToken); // do something with the common authToken in app1
>>>>>>> ed035d99a3052fa2e772c0f25c08f792c4b32f27
  return reactLifecycles.mount(props);
}
```

可能使用到的场景：

- 各个应用共享一个公共的 access token
- 下发初始化信息，如渲染目标
- 传递对事件总线（event bus）的引用，方便各应用之间进行通信

注意如果没有提供自定义参数，则`props.customProps`默认会返回一个空对象。


### 生命周期帮助类
有一些帮助类库会对针对主流框架的生命周期函数进行实现以方便使用。具体可参见[生态页面](ecosystem.md)。

### 下载(load)
注册的应用会被懒加载，这指的是该应用的代码会从服务器端下载并执行。注册的应用在[activity function](configuration#activity-function) 第一次返回真值(truthy value)时，下载动作会发生。在下载过程中，建议尽可能执行少的操作，可以在```bootstrap```生命周期之后再执行各项操作。若确实有在下载时需要执行的操作，可将代码放入子应用入口文件中，但要放在各导出函数的外部。例如：
```js
console.log("The registered application has been loaded!");

export async function bootstrap(props) {...}
export async function mount(props) {...}
export async function unmount(props) {...}
```

### 初始化
这个生命周期函数会在应用**第一次**挂载前**执行一次**。

```js
export function bootstrap(props) {
  return Promise
    .resolve()
    .then(() => {
      // One-time initialization code goes here
      console.log('bootstrapped!')
    });
}
```

### 挂载
每当应用的[activity function](configuration#activity-function)返回真值，但该应用处于未挂载状态时，挂载的生命周期函数就会被调用。调用时，函数会根据URL来确定当前被激活的路由，创建DOM元素、监听DOM事件等以向用户呈现渲染的内容。任何子路由的改变（如```hashchange```或```popstate```等）不会再次触发```mount```，需要各应用自行处理。

```js
export function mount(props) {
  return Promise
    .resolve()
    .then(() => {
      // Do framework UI rendering here
      console.log('mounted!')
    });
}
```

### 卸载
每当应用的[activity function](configuration#activity-function)返回假值，但该应用已挂载时，卸载的生命周期函数就会被调用。卸载函数被调用时，会清理在挂载应用时被创建的DOM元素、事件监听、内存、全局变量和消息订阅等。

```js
export function unmount(props) {
  return Promise
    .resolve()
    .then(() => {
      // Do framework UI unrendering here
      console.log('unmounted!');
    });
}
```

### 移除

“移除”生命周期函数的实现是可选的，它只有在[unloadApplication](api.md#unloadapplication)被调用时才会触发。如果一个已注册的应用没有实现这个生命周期函数，则假设这个应用无需被移除。

移除的目的是各应用在移除之前执行部分逻辑，一旦应用被移除，它的状态将会变成NOT_LOADED，下次激活时会被重新初始化。

移除函数的设计动机是对所有注册的应用实现“热下载”，不过在其他场景中也非常有用，比如想要重新初始化一个应用，且在重新初始化之前执行一些逻辑操作时。


```js
export function unload(props) {
  return Promise
    .resolve()
    .then(() => {
      // Hot-reloading implementation goes here
      console.log('unloaded!');
    });
}
```

## 超时
默认情况下，所有注册的应用遵循[全局超时配置](/docs/api#setbootstrapmaxtime)，但对于每个应用，也可以通过在主入口文件导出一个`timeouts`对象来重新定义超时时间。如：

<p className="filename">app-1.main-entry.js</p>

```js
export function bootstrap(props) {...}
export function mount(props) {...}
export function unmount(props) {...}

export const timeouts = {
  bootstrap: {
    millis: 5000,
    dieOnTimeout: true,
    warningMillis: 2500,
  },
  mount: {
    millis: 5000,
    dieOnTimeout: false,
    warningMillis: 2500,
  },
  unmount: {
    millis: 5000,
    dieOnTimeout: true,
    warningMillis: 2500,
  },
  unload: {
    millis: 5000,
    dieOnTimeout: true,
    warningMillis: 2500,
  },
};
```
注意`millis`指的是最终控制台输出警告的毫秒数，```warningMillis```指的是将警告打印到控制台(间隔)的毫秒数。

## 切换应用时过渡

如果你想为应用在挂载和卸载时加一些过渡效果(动画效果等)，则需要将其和`bootstrap`, `mount`, 和 `unmount`等生命周期函数关联。这个[single-spa 过渡](https://github.com/frehner/singlespa-transitions)仓库是个小demo，展示了生命周期之间切换时如何过渡。

对于已经挂载的应用，各个页面之间的过渡效果可由应用本身自行处理，如基于React创建的项目可使用using [react-transition-group](https://github.com/reactjs/react-transition-group)实现过渡效果。


