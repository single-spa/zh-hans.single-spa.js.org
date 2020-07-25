---
id: configuration
title: Configuring single-spa
sidebar_label: Configuring single-spa
---

The single-spa root config consists of the following:

这两个根目录下的配置用于启动single-spa应用。

## Index.html文件

内容可参考[该示例](http://single-spa-playground.org/playground/html-file)。注意该文件不包含html元素(div, buttons等)，只是为了调用`registerApplication()`方法。

See [this example root config](https://github.com/polyglot-microfrontends/root-config/blob/master/src/index.ejs) for what a root HTML file looks like.

**在使用single-spa时，不必使用SystemJS**，不过为了能够[独立部署](/docs/separating-applications.html)各应用，很多示例和教程会推荐使用SystemJS。

## 注册应用

你需要先注册[应用](building-applications.md)，这样single-spa才知道在什么时机，如何去初始化、下载、挂载和卸载各应用。我们一般情况下在single-spa的配置文件中进行注册，当然也可以有其他方式(不推荐)。如果在某个应用中注册其他应用，这两个应用不会存在嵌套关系，他们还是同级关系，应用的挂载和下载也还是会依赖各自的触发条件(activity functions)。


我们通过调用`registerApplication`方法来注册应用。例如：

```js
// single-spa-config.js
import { registerApplication, start } from 'single-spa';

// Simple usage
registerApplication(
  'app2',
  () => import('src/app2/main.js'),
  (location) => location.pathname.startsWith('/app2'),
  { some: 'value' }
);

// Config with more expressive API
registerApplication({
  name: 'app1',
  app: () => import('src/app1/main.js'),
  activeWhen: '/app1',
  customProps: {
    some: 'value',
  }
);

start();
```
### 参数

#### name
`registerApplication`的第一个参数表示应用名称，`name`必须是string类型

#### Loading Function or Application
`registerApplication`可以是一个Promise类型的 [加载函数](configuration#loading-function)，也可以是一个已经被解析的应用。

##### Application as second argument
你可以选择将一个已经被解析过的应用作为`registerApplication`的第二个参数，这个应用其实是一个包含各个生命周期函数的对象。我们既可以从另外一个文件中引入该对象，也可以在single-spa的配置文件中定义这个对象。

```js
const application = {
  bootstrap: () => Promise.resolve(), //bootstrap function
  mount: () => Promise.resolve(), //mount function
  unmount: () => Promise.resolve(), //unmount function
}
registerApplication('applicatonName', application, activityFunction)

```

##### 加载函数
`registerApplication`的第二个参数必须是返回promise的函数(或["async function"](https://ponyfoo.com/articles/understanding-javascript-async-await)方法)。这个函数没有入参，会在应用第一次被下载时调用。返回的Promise resolve之后的结果必须是一个可以被解析的应用。常见的实现方法是使用import加载：`() => import('/path/to/application.js')`

#### 激活函数
`registerApplication`的第三个参数需要是一个纯函数，`window.location`会作为第一个参数被调用，当函数返回的值为真(truthy)值时，应用会被激活。通常情况下，Activity function会根据`window.location`/后面的path来决定该应用是否需要被激活。

另外一种场景是single-spa根据顶级路由查找应用，而每个应用会处理自身的子路由。 在以下场景，single-spa会调用应用的activity function

在以下情况下，single-spa将调用每个应用的活动函数：
- `hashchange` or `popstate`事件触发时
- `pushState` or `replaceState`被调用时
- 在single-spa上手动调用[`triggerAppChange`] 方法
- `checkActivityFunctions`方法被调用时

#### Custom props

The optional fourth argument to `registerApplication` is [custom props](./building-applications#custom-props) that are passed to the application's single-spa lifecycle functions. The custom props may be either an object or a function that returns an object. Custom prop functions are called with the application name and current `window.location` as arguments.

### 使用对象参数

```js
singleSpa.registerApplication({
  name: 'myApp',
  app: () => import('src/myApp/main.js'),
  activeWhen: ['/myApp', (location) => location.pathname.startsWith('/some/other/path')],
  customProps: {
    some: 'value',
  },
});

singleSpa.registerApplication({
  name: 'myApp',
  app: () => import('src/myApp/main.js'),
  activeWhen: ['/myApp', (location) => location.pathname.startsWith('/some/other/path')],
  customProps: (name, location) => ({
    some: 'value',
  }),
});
```

#### config.name
必须是字符串。

#### config.app
应用的定义，它可以是一个单spa生命周期的对象，加载函数或者与第二个参数相同。

#### config.activeWhen
可以是激活函数，比如参数API、路径前缀或两者的数组。因为最常见的用例是使用`window.location` 将其URL前缀进行匹配，所以我们帮你实现了这个方法。

#### Path prefix
路径前缀会匹配url，允许以下每一种前缀：
  <dl>
    <dt>'/app1'</dt>
    <dd>✅ https://app.com/app1</dd>
    <dd>✅ https://app.com/app1/anything/everything</dd>
    <dd>🚫 https://app.com/app2</dd>
    <dt>'/users/:userId/profile'</dt>
    <dd>✅ https://app.com/users/123/profile</dd>
    <dd>✅ https://app.com/users/123/profile/sub-profile/</dd>
    <dd>🚫 https://app.com/users//profile/sub-profile/</dd>
    <dd>🚫 https://app.com/users/profile/sub-profile/</dd>
    <dt>'/pathname/#/hash'</dt>
    <dd>✅ https://app.com/pathname/#/hash</dd>
    <dd>✅ https://app.com/pathname/#/hash/route/nested</dd>
    <dd>🚫 https://app.com/pathname#/hash/route/nested</dd>
    <dd>🚫 https://app.com/pathname#/another-hash</dd>
    <dt>['/pathname/#/hash', '/app1']</dt>
    <dd>✅ https://app.com/pathname/#/hash/route/nested</dd>
    <dd>✅ https://app.com/app1/anything/everything</dd>
    <dd>🚫 https://app.com/pathname/app1</dd>
    <dd>🚫 https://app.com/app2</dd>
  </dl>

#### config.customProps

The optional `customProps` property provides [custom props](./building-applications#custom-props) that are passed to the application's single-spa lifecycle functions. The custom props may be either an object or a function that returns an object. Custom prop functions are called with the application name and current `window.location` as arguments.

## Calling singleSpa.start()
[`start()方法`](api.md#start) **必须**被single-spa配置文件的js调用，这时应用才会被真正挂载。在`start`被调用之前，应用先被下载，但不会初始化/挂载/卸载。`start`方法可以协助我们更好提升应用的性能。举个例子，我们可能会马上注册一个应用(为了立刻下载代码)，但不能马上就在DOM节点上挂载该应用，而是需要等一个AJAX请求(可能会获取用户的登录信息)完成后，再根据结果进行挂载。这种情况下，最佳实践是先调用`registerApplication`，等AJAX请求完成后再调用`start`。

```js
//single-spa-config.js
import { start } from 'single-spa';

 /*在注册应用之前调用start意味着single-spa可以立即安装应用，无需等待单页应用的任何初始设置。*/

start();
// 注册应用。。。。
```

## 同时注册两个路由??
emm...也是可以的。 一种实现方式是为每个app创建一个`<div id="app name"></div>`，这样这两个应用就不会同时修改相同的DOM节点了。[考虑一个path变动，同时有两个应用被激活的场景，译者注]