---
id:配置
标题：使用single-spa配置
侧边栏标签：single-spa 配置
---

single-spa基础配置包含以下内容：
1、所有single-spa应用共享的根HTML文件。
2、调用[`singleSpa.registerApplication()`](/docs/api.html\registerApplication)的javascript。

基础配置只用于启动single-spa应用。

## Index.html文件

有关根html文件的配置，请参见[此示例基础配置](http://single-spa-playground.org/playground/html-file)。
请注意，它没有任何div或按钮，只是调用了`registerApplication()`。

**在使用single-spa时，不必使用SystemJS**，因为
它允许您[独立地部署](/docs/separating-applications.html)您的应用，所以许多示例和教程都会鼓励这样做，。

## 注册应用

必须向single spa注册[应用](building-applications.md)，以便它知道如何以及何时启动、加载、装载和卸载。注册通常发生在single-spa配置中，但不是必须的。请注意，如果一个应用是从另一个应用中注册的，则应用之间不会保持层次结构。应用会是同级的，并且会根据它们自己的活动函数进行装载和卸载。

要注册应用，请调用`register application(name，howToLoad，activityFunction)`api。例如：

```js
// single-spa-config.js
import { registerApplication, start } from 'single-spa';

registerApplication("applicationName", loadingFunction, activityFunction);
start();

function loadingFunction() {
  return import("src/app1/main.js");
}

function activityFunction(location) {
  return location.pathname.indexOf("/app1/") === 0;
}
```

### 应用名称
`registerApplication`的第一个参数必须是字符串名。

### 加载函数或应用
`registerApplication`的第二个参数必须是返回promise 
[loading function](configuration#loading-function) 的函数或解析的应用。

#### 作为第二个参数的应用
第二个参数，可以选择使用解析的由具有生命周期方法的对象组成的应用，
这样就可以从另一个文件导入应用，或在single-spa配置中内联定义应用

```js
const application = {
  bootstrap: () => Promise.resolve(), //bootstrap function
  mount: () => Promise.resolve(), //mount function
  unmount: () => Promise.resolve(), //unmount function
}
registerApplication('applicatonName', application, activityFunction)

```

#### 加载函数
`registerApplication`的第二个参数必须是返回promise的函数(或["async function"](https://ponyfoo.com/articles/understanding-javascript-async-await))
第一次加载应用时，会不带参数调用该函数。
返回的promise必须和参数一起解决。加载函数最常见的实现是导入调用：
`() => import('/path/to/application.js')`

### 活动函数
`registerApplication`的第三个参数必须是纯函数，函数以`window.location`作为第一个参数，并在应用应处于活动状态时返回truthy值。最常见的情况是，activity函数通过查看`window.location`/第一个参数来确定应用是否处于活动状态

另一种观点是，single-spa是一个顶级路由器，它有很多应用都有自己的子路由器。

在以下情况下，single-spa将调用每个应用的活动函数：
-`hashchange`或`popstate`事件
-调用`pushState`或`replaceState`
-在single-spa上调用[`triggerAppChange`] api
-每当调用`checkActivityFunctions`方法时

## 调用 singleSpa.start()
[`start()` api](api.md#start)）**必须**由single-spa配置调用，才能实际装入应用。在调用`start`之前，会加载应用，但不会加载/装载/卸载应用。
`start`可以控制性能。例如，您可能希望立即注册应用（开始下载活动应用的代码），但在完成初始AJAX请求（可能是为了获取有关已登录用户的信息）之前，不会实际装载应用。在这种情况下，想要达到最好的性能就是通过立即调用`registerApplication`，但在AJAX请求完成后调用`start`。

```js
//single-spa-config.js
import { start } from 'single-spa';

 /*在注册应用之前调用start意味着single-spa可以立即安装应用，无需等待单页应用的任何初始设置。*/

start();
// 注册应用。。。。
```

## 两个同时注册的申请

一种方案是为每个应用创建一个`<div id="app name"></div>`，这样它们永远不会同时修改同一个DOM。