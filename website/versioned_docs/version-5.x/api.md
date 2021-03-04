---
id: api
title: Applications API
sidebar_label: Applications API
---

single-spa输出的是命名函数和变量而不是默认输出，这意味着引用必须用以下两种方式：

```js
import { registerApplication, start } from 'single-spa';
// or
import * as singleSpa from 'single-spa';
```

## registerApplication
<<<<<<< HEAD
`registerApplication` 是基础配置会用到的最重要的API，调用这个方法可以在single-spa中注册一个应用。

请注意，如果一个应用是从另一个应用中注册的，则不会在在多个应用之间维护层次结构。

有两种方法注册应用：

### 简单参数
=======

`registerApplication` is the most important API your root config will use. Use this function to register any application within single-spa.
Note that if an application is registered from within another application, that no hierarchy will be maintained between the applications.

There are two ways of registering your application:

### Simple arguments

>>>>>>> 6abc5a78c336e192a695861bfa5fb00e78afcbbf
```js
singleSpa.registerApplication(
  'appName',
  () => System.import('appName'),
  location => location.pathname.startsWith('appName'),
);
```

<h3>参数</h3>

<dl className="args-list">
	<dt>appName: string</dt>
	<dd>应用的名字将会在single-spa中注册和引用, 并在开发工具中标记。</dd>
	<dt>applicationOrLoadingFn: () => &lt;Function | Promise&gt;</dt>
	<dd>必须是一个加载函数，返回一个应用或者一个Promise。</dd>
	<dt>activityFn: (location) => boolean</dt>
<<<<<<< HEAD
	<dd>必须是个纯函数, 该函数由 <code>window.location</code> 作为第一个参数被调用, 当应用应该被激活时它应该返回一个真值。</dd>
	<dt>customProps?: Object = {}</dt>
	<dd>在生命周期钩子函数执行时会被作为参数传入</dd>
=======
	<dd>Must be a pure function. The function is called with <codehtml>window.location</codehtml> as the first argument {/* TODO: any only? */} and should return a truthy value whenever the application should be active.</dd>
	<dt>customProps?: Object | () => Object</dt>
	<dd>Will be passed to the application during each lifecycle method.</dd>
>>>>>>> 6abc5a78c336e192a695861bfa5fb00e78afcbbf
</dl>

<h3>returns</h3>

`undefined`

<<<<<<< HEAD
### 对象参数
=======
### Configuration object

>>>>>>> 6abc5a78c336e192a695861bfa5fb00e78afcbbf
```js
singleSpa.registerApplication({
	name: 'appName',
	app: () => System.import('appName'),
	activeWhen: '/appName'
	customProps: {
		authToken: 'xc67f6as87f7s9d'
	}
})

singleSpa.registerApplication({
	name: 'appName',
	app: () => System.import('appName'),
	activeWhen: '/appName',
	// Dynamic custom props that can change based on route
	customProps(appName, location) {
		return {
			authToken: 'xc67f6as87f7s9d'
		}
	}
})
```

<h3>参数</h3>

<dl className="args-list">
	<dt>name: string</dt>
	<dd>应用的名字将会在single-spa中注册和引用, 并在开发工具中标记。</dd>
	<dt>app: Application | () => Application | Promise&lt;Application&gt; </dt>
	<dd>必须是一个应用对象，返回一个家在函数。</dd>
	<dt>activeWhen: string | (location) => boolean | (string | (location) => boolean)[]</dt>
	<dd>可以是一个路径前缀，它将匹配每个以该路径开头的URL，也可以是激活函数(如简单参数中所述)或一个数组两者都包含在内。如果任何条件为真，则保留应用活动。路径前缀也接受动态值(以':'开头)，因为有些路径会接收url参数，但仍然应该激活您的应用。
	Examples:
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
	</dd>
<<<<<<< HEAD
	<dt>customProps?: Object = &#123;&#125;</dt>
	<dd>在生命周期钩子函数执行时会被作为参数传入</dd>
=======
	<dt>customProps?: Object | () => Object</dt>
	<dd>Will be passed to the application during each lifecycle method.</dd>
>>>>>>> 6abc5a78c336e192a695861bfa5fb00e78afcbbf
</dl>

<h3>returns</h3>

`undefined`

<<<<<<< HEAD
> 详细解析请见 [Configuration docs](configuration#registering-applications)
=======
:::note
It is described in detail inside of the [Configuration docs](configuration#registering-applications)
:::
>>>>>>> 6abc5a78c336e192a695861bfa5fb00e78afcbbf

## start

```js
singleSpa.start();

// Optionally, you can provide configuration
singleSpa.start({
  urlRerouteOnly: true,
});
```

必须在你single spa的配置中调用！在调用 `start` 之前, 应用会被加载, 但不会初始化，挂载或卸载。 `start` 的原因是让你更好的控制你单页应用的性能。举个栗子，你想立即声明已经注册过的应用（开始下载那些激活应用的代码），但是实际上直到初始化AJAX（或许去获取用户的登录信息）请求完成之前不会挂载它们 。 在这个例子里，立马调用 `registerApplication` 方法，完成AJAX后再去调用 `start`方法会获得最佳性能。

<h3>arguments</h3>

The `start(opts)` api optionally accepts a single `opts` object, with the following properties. If the opts object is omitted, all defaults will be applied.

- `urlRerouteOnly`: A boolean that defaults to false. If set to true, calls to `history.pushState()` and `history.replaceState()` will not trigger a single-spa reroute unless the client side route was changed. Setting this to true can be better for performance in some situations. For more information, read [original issue](https://github.com/single-spa/single-spa/issues/484).

<h3>returns</h3>

`undefined`

## triggerAppChange

```js
singleSpa.triggerAppChange();
```

返回一个Promise对象，当所有应用挂载/卸载时它执行 resolve/reject 方法，它一般被用来测试single-spa，在生产环境可能不需要。

<h3>arguments</h3>

none

<h3>returns</h3>

<dl className="args-list">
	<dt>Promise</dt>
	<dd>返回一个Promise对象，当所有应用挂载/卸载时它执行 resolve/reject 方法。</dd>
</dl>

## navigateToUrl

```js
// Three ways of using navigateToUrl
singleSpa.navigateToUrl('/new-url');
singleSpa.navigateToUrl(document.querySelector('a'));
document.querySelector('a').addEventListener(singleSpa.navigateToUrl);
```

```html
<!-- A fourth way to use navigateToUrl, this one inside of your HTML -->
<a href="/new-url" onclick="singleSpaNavigate(event)">My link</a>
```

使用这个通用方法来轻松的实现在不同注册应用之前的切换，而不必需要处理 `event.preventDefault()`, `pushState`, `triggerAppChange()` 等待。 

<h3>arguments</h3>

<dl className="args-list">
	<dt>navigationObj: string | context | DOMEvent</dt>
	<dd>
		navigationObj 必须是一下类型中的一个:
		<ul>
			<li>一个 url 字符串</li>
			<li>一个 上下文 / 参数为 <code>href</code> 属性; 在调用 <code>singleSpaNavigate.call(anchorElement)</code> 时很有用，一个指向其他原色的锚点，或者其他内容。</li>
			<li>一个 DOMEvent对象，具有 <code>href</code> attribute; 方便 <code>&lt;a onclick="singleSpaNavigate">&lt;/a></code> 方法调用。</li>
		</ul>
	</dd>
</dl>

<h3>returns</h3>

`undefined`

## getMountedApps

```js
const mountedAppNames = singleSpa.getMountedApps();
console.log(mountedAppNames); // ['app1', 'app2', 'navbar']
```

<h3>arguments</h3>

none

<h3>returns</h3>

<dl className="args-list">
	<dt>appNames: string[]</dt>
	<dd>当前已经挂载应用的名字。 <code>MOUNTED</code></dd>
</dl>

## getAppNames

```js
const appNames = singleSpa.getAppNames();
console.log(appNames); // ['app1', 'app2', 'app3', 'navbar']
```

<h3>arguments</h3>

none

<h3>returns</h3>

<dl className="args-list">
	<dt>appNames: string[]</dt>
	<dd>当前应用的名字（任何状态的应用）。</dd>
</dl>

## getAppStatus

```js
const status = singleSpa.getAppStatus('app1');
console.log(status); // one of many statuses (see list below). e.g. MOUNTED
```

<h3>arguments</h3>

<dl className="args-list">
	<dt>appName: string</dt>
	<dd>注册应用的名字。</dd>
</dl>

<h3>returns</h3>

<dl className="args-list">
	<dt>appStatus: &lt;string | null&gt;</dt>
	<dd>
		将会是下列字符串常量中的一个,如果应用不存在是 <code>null</code>
		<dl className="dl-inline">
			<div>
				<dt>NOT_LOADED</dt>
				<dd>single-spa应用注册了，还未加载。</dd>
			</div>
			<div>
				<dt>LOADING_SOURCE_CODE</dt>
<<<<<<< HEAD
				<dd>应用代码正在被拉取。</dd>
=======
				<dd>app's source code is being fetched.</dd>
>>>>>>> 6abc5a78c336e192a695861bfa5fb00e78afcbbf
			</div>
			<div>
				<dt>NOT_BOOTSTRAPPED</dt>
				<dd>应用已经加载，还未初始化。</dd>
			</div>
			<div>
				<dt>BOOTSTRAPPING</dt>
				<dd><code>bootstrap</code> 的生命周期函数已经执行，还未结束。</dd>
			</div>
			<div>
				<dt>NOT_MOUNTED</dt>
				<dd>应用已经加载和初始化，还未挂载。</dd>
			</div>
			<div>
				<dt>MOUNTING</dt>
				<dd>应用正在被挂载，还未结束。</dd>
			</div>
			<div>
				<dt>MOUNTED</dt>
				<dd>应用目前处于激活状态，已经挂载到DOM元素上。</dd>
			</div>
			<div>
				<dt>UNMOUNTING</dt>
				<dd>应用正在被卸载，还未结束。</dd>
			</div>
			<div>
				<dt>UNLOADING</dt>
				<dd>应用正在被移除，还未结束。</dd>
			</div>
			<div>
				<dt>SKIP_BECAUSE_BROKEN</dt>
				<dd>应用在加载、初始化、挂载或卸载过程中抛出错误，由于行为不当而被跳过，因此被隔离。其他应用将正常运行。</dd>
			</div>
			<div>
				<dt>LOAD_ERROR</dt>
				<dd>
					应用的加载功能返回了一个rejected的Promise。这通常是由于下载应用程序的javascript包时出现网络错误造成的。Single-spa将在用户从当前路由导航并返回后重试加载应用。
				</dd>
			</div>
		</dl>
	</dd>
</dl>

<<<<<<< HEAD
**注意 LOAD_ERROR 的状态**

请注意，如果使用SystemJS加载包，则需要添加以下代码，以使SystemJS在加载函数调用 `LOAD_ERROR` 状态下的应用程序上的 `System.import()` 时重新尝试网络请求。
=======
### Handling LOAD_ERROR status to retry module

If a module fails to load (for example, due to network error), single-spa will handle the error but SystemJS will not automatically retry to download the module later. To do so, add a single-spa errorHandler that deletes the module from the SystemJS registry and re-attempt to download the module when `System.import()` on an application in `LOAD_ERROR` status is called again.
>>>>>>> 6abc5a78c336e192a695861bfa5fb00e78afcbbf

```js
singleSpa.addErrorHandler(err => {
  if (singleSpa.getAppStatus(err.appOrParcelName) === singleSpa.LOAD_ERROR) {
    System.delete(System.resolve(err.appOrParcelName));
  }
});
```

## unloadApplication

```js
// Unload the application right now, without waiting for it to naturally unmount.
singleSpa.unloadApplication('app1');

// Unload the application only after it naturally unmounts due to a route change.
singleSpa.unloadApplication('app1', { waitForUnmount: true });
```

移除已注册的应用的目的是将其设置回 `NOT_LOADED` 状态，这意味着它将在下一次需要挂载时重新初始化。它的主要使用场景是允许热加载所有已注册的应用，但是 `unloadApplication` 可以在您希望初始化应用时非常有用。

当调用 `unloadApplication` 时，Single-spa执行以下步骤。

1. 在一个已经注册的应用上，调用 [unload lifecyle](api.md#unload) 方法。
2. 将次应用的状态置为 NOT_LOADED
3. 触发路由重定向，在此期间single-spa可能会挂载刚刚卸载的应用程序。

因为在调用 `unloadApplication` 时可能会挂载已注册的应用，所以可以指定是要立即卸载还是要等到应用不再挂载。这是通过 `waitForUnmount` 参数完成的。

<h3>arguments</h3>

<dl className="args-list">
	<dt>appName: string</dt>
	<dd>注册应用的名字</dd>
	<dt>options?: &#123;waitForUnmount: boolean = false}</dt>
	<dd>参数必是一个包含 <code>waitForUnmount</code> 属性的对象。当 `waitForUnmount` 是 `false`, single-spa 立刻移除特定应用，尽管它已经被挂载。 当它是 <code>true</code>时, single-spa 会等待到它的状态不再是 <code>MOUNTED</code>时才移除应用</dd>
</dl>

<h3>returns</h3>

<dl className="args-list">
	<dt>Promise</dt>
<<<<<<< HEAD
	<dd>当应用被成功移除时，Promise对象会被resolved。</dd>
=======
	<dd>This promise will be resolved when the registered application has been successfully unloaded.</dd>
</dl>

## unregisterApplication

```js
import { unregisterApplication } from 'single-spa';

unregisterApplication('app1').then(() => {
  console.log('app1 is now unmounted, unloaded, and no longer registered!');
});
```

The `unregisterApplication` function will unmount, unload, and unregister an application. Once it is no longer registered, the application will never again be mounted.

This api was introduced in single-spa@5.8.0. A few notes about this api:

- Unregistering an application does not delete it from the SystemJS module registry.
- Unregistering an application does not delete its code or javascript frameworks from browser memory.
- An alternative to unregistering applications is to perform permission checks inside of the application's activity function. This has a similar effect of preventing the application from ever mounting.

<h3>arguments</h3>

<dl className="args-list">
	<dt>appName: string</dt>
</dl>

<h3>returns</h3>

<dl className="args-list">
	<dt>Promise</dt>
	<dd>This promise will be resolved when the application has been successfully unregistered.</dd>
>>>>>>> 6abc5a78c336e192a695861bfa5fb00e78afcbbf
</dl>

## checkActivityFunctions

```js
const appsThatShouldBeActive = singleSpa.checkActivityFunctions();
console.log(appsThatShouldBeActive); // ['app1']

const appsForACertainRoute = singleSpa.checkActivityFunctions({
  pathname: '/app2',
});
console.log(appsForACertainRoute); // ['app2']
```

将会调用每个应用的 `mockWindowLocation` 并且返回一个根据当前路判断那些应用应该被挂载的列表。

<h3>arguments</h3>

<dl className="args-list">
	<dt>mockWindowLocation: string</dt>
	<dd>一个代表当前路径的字符串，当执行每个应用的激活函数时会用它来判断是否应该返回真。</dd>
</dl>

<h3>returns</h3>

<dl className="args-list">
	<dt>appNames: string[]</dt>
	<dd>每个满足当前路径 <code>mockWindowLocation</code>应该激活的应用名称。</dd>
</dl>

## addErrorHandler

```js
singleSpa.addErrorHandler(err => {
  console.log(err);
  console.log(err.appOrParcelName);
  console.log(singleSpa.getAppStatus(err.appOrParcelName));
});
```

添加处理程序，该处理程序将在应用在生命周期函数或激活函数期间每次抛出错误时调用。当没有错误处理程序时，single-spa将错误抛出到窗口。

<dl className="args-list">
	<dt>errorHandler: Function(error: Error)</dt>
	<dd>必须是一个函数。将会以 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error">Error object</a>  <code>message</code> 和 <code>appOrParcelName</code> 为参数调用.</dd>
</dl>

<h3>returns</h3>

`undefined`

## removeErrorHandler

```js
singleSpa.addErrorHandler(handleErr);
singleSpa.removeErrorHandler(handleErr);

function handleErr(err) {
  console.log(err);
}
```

删除给定的错误处理程序函数。

<h3>arguments</h3>

<dl className="args-list">
	<dt>errorHandler: Function</dt>
	<dd>引用错误处理函数。</dd>
</dl>

<h3>returns</h3>

<dl className="args-list">
	<dt>boolean</dt>
	<dd>当错误处理函数呗移除则为<code>true</code> 否则 <code>false</code> </dd>
</dl>

## mountRootParcel

```js
// Synchronous mounting
const parcel = singleSpa.mountRootParcel(parcelConfig, {
  prop1: 'value1',
  domElement: document.getElementById('a-div'),
});
parcel.mountPromise.then(() => {
  console.log('finished mounting the parcel!');
});

// Asynchronous mounting. Feel free to use webpack code splits or SystemJS dynamic loading
const parcel2 = singleSpa.mountRootParcel(() => import('./some-parcel.js'), {
  prop1: 'value1',
  domElement: document.getElementById('a-div'),
});
```

将会创建并挂载一个 [single-spa parcel](parcels-overview.md).

<<<<<<< HEAD
> 注意:Parcel不会自动卸载。卸载需要手动触发。
=======
:::caution Parcels do not automatically unmount
Unmounting will need to be triggered manually.
:::
>>>>>>> 6abc5a78c336e192a695861bfa5fb00e78afcbbf

<h3>arguments</h3>

<dl className="args-list">
	<dt>parcelConfig: Object or Loading Function</dt>
	<dd>[parcelConfig](parcels-api.md#parcel-configuration)</dd>
	<dt>parcelProps: Object with a domElement property</dt>
	<dd>[parcelProps](parcels-api.md#parcel-props)</dd>
</dl>

<h3>returns</h3>

<dl className="args-list">
	<dt>Parcel object</dt>
	<dd>详细信息请见 <a href="/docs/parcels-api.html">Parcels API</a> 。</dd>
</dl>

## pathToActiveWhen

The `pathToActiveWhen` function converts a string URL path into an [activity function](/docs/configuration/#activity-function). The string path may contain route parameters that single-spa will match any characters to. By default, pathToActiveWhen assumes that the string provided is a **prefix**; however, this can be altered with the `exactMatch` parameter.

This function is used by single-spa when a string is passed into `registerApplication` as the `activeWhen` argument.

**_Arguments_**

1. `path` (string): The URL prefix that.
2. `exactMatch` (boolean, optional, defaults to `false`, requires single-spa@>=5.9.0): A boolean that controls whether trailing characters after the path should be allowed. When `false`, trailing characters are allowed. When `true`, trailing characters are not allowed.

**_Return Value_**

`(location: Location) => boolean`

A function that accepts a URL as an argument and returns a boolean indicating whether the path matches that URL.

**_Examples:_**

```js
let activeWhen = singleSpa.pathToActiveWhen('/settings');
activewhen(new URL('http://localhost/settings')); // true
activewhen(new URL('http://localhost/settings/password')); // true
activeWhen(new URL('http://localhost/')); // false

activeWhen = singleSpa.pathToActiveWhen('/users/:id/settings');
activewhen(new URL('http://localhost/users/6f7dsdf8g9df8g9dfg/settings')); // true
activewhen(new URL('http://localhost/users/1324/settings')); // true
activewhen(new URL('http://localhost/users/1324/settings/password')); // true
activewhen(new URL('http://localhost/users/1/settings')); // true
activewhen(new URL('http://localhost/users/1')); // false
activewhen(new URL('http://localhost/settings')); // false
activeWhen(new URL('http://localhost/')); // false

activeWhen = singleSpa.pathToActiveWhen('/page#/hash');
activeWhen(new URL('http://localhost/page#/hash')); // true
activeWhen(new URL('http://localhost/#/hash')); // false
activeWhen(new URL('http://localhost/page')); // false
```

## ensureJQuerySupport

```js
singleSpa.ensureJQuerySupport(jQuery);
```

jQuery使用 [event delegation](https://learn.jquery.com/events/event-delegation/) 所以 single-spa 必须给每个jQuery版本一个patch。<!-- TODO: in order to properly support... (I'm guessing navigation/routing ) -->single-spa 会试着自动寻找 `window.jQuery` 或 `window.$`。 如果页面中有多个版本的jQuery存在或jQuery被绑定到多个全局变量，请调用这个的方法。

<h3>arguments</h3>

<dl className="args-list">
	<dt>jQuery?: JQueryFn = window.jQuery</dt>
	<dd>对jQuery已绑定到的全局变量的引用。</dd>
</dl>

<h3>returns</h3>

`undefined`

## setBootstrapMaxTime

```js
// After three seconds, show a console warning while continuing to wait.
singleSpa.setBootstrapMaxTime(3000);

// After three seconds, move the application to SKIP_BECAUSE_BROKEN status.
singleSpa.setBootstrapMaxTime(3000, true);

// don't do a console warning for slow lifecycles until 10 seconds have elapsed
singleSpa.setBootstrapMaxTime(3000, true, 10000);
```

全局配置初始化超时时间。

<h3>arguments</h3>

<dl className="args-list">
	<dt>millis: number</dt>
	<dd>一个判断等待初始化是否超时的毫秒数。</dd>
	<dt>dieOnTimeout: boolean = false</dt>
	<dd>
		<p>如果设置为false，注册的应用运行变缓，在到达<code>millis</code>之前，只会在控制台中引起一些警告。</p>
		<p>如果设置为true, 注册的应用程序运行变缓，它们将被塞进一个skip_break_status，因为它们不会再打断程序。</p>
		<p>每个已注册的应用程序都可以覆盖自己的此行为。</p>
	</dd>
	<dt>warningMillis: number = 1000</dt>
	<dd>一个判断等待控制台warning是否发生的毫秒数。</dd>
</dl>

<h3>returns</h3>

`undefined`

## setMountMaxTime

```js
// After three seconds, show a console warning while continuing to wait.
singleSpa.setMountMaxTime(3000);

// After three seconds, move the application to SKIP_BECAUSE_BROKEN status.
singleSpa.setMountMaxTime(3000, true);

// don't do a console warning for slow lifecycles until 10 seconds have elapsed
singleSpa.setMountMaxTime(3000, true, 10000);
```

全局配置挂载超时时间。

<h3>arguments</h3>

<dl className="args-list">
	<dt>millis: number</dt>
	<dd>一个判断等待挂载是否超时的毫秒数。</dd>
	<dt>dieOnTimeout: boolean = false</dt>
	<dd>
		<p>如果设置为false，注册的应用运行变缓，在到达<code>millis</code>之前，只会在控制台中引起一些警告。</p>
		<p>如果设置为true, 注册的应用程序运行变缓，它们将被塞进一个skip_break_status，因为它们不会再打断程序。</p>
		<p>每个已注册的应用程序都可以覆盖自己的此行为。</p>
	</dd>
	<dt>warningMillis: number = 1000</dt>
	<dd>一个判断等待控制台warning是否发生的毫秒数。</dd>
</dl>

<h3>returns</h3>

`undefined`

## setUnmountMaxTime

```js
// After three seconds, show a console warning while continuing to wait.
singleSpa.setUnmountMaxTime(3000);

// After three seconds, move the application to SKIP_BECAUSE_BROKEN status.
singleSpa.setUnmountMaxTime(3000, true);

// don't do a console warning for slow lifecycles until 10 seconds have elapsed
singleSpa.setUnmountMaxTime(3000, true, 10000);
```

全局配置卸载超时时间。

<h3>arguments</h3>

<dl className="args-list">
	<dt>millis: number</dt>
	<dd>一个判断等待卸载是否超时的毫秒数。</dd>
	<dt>dieOnTimeout: boolean = false</dt>
	<dd>
		<p>如果设置为false，注册的应用运行变缓，在到达<code>millis</code>之前，只会在控制台中引起一些警告。</p>
		<p>如果设置为true, 注册的应用程序运行变缓，它们将被塞进一个skip_break_status，因为它们不会再打断程序。</p>
		<p>每个已注册的应用程序都可以覆盖自己的此行为。</p>
	</dd>
	<dt>warningMillis: number = 1000</dt>
	<dd>一个判断等待控制台warning是否发生的毫秒数。</dd>
</dl>

<h3>returns</h3>

`undefined`

---

## setUnloadMaxTime

```js
// After three seconds, show a console warning while continuing to wait.
singleSpa.setUnloadMaxTime(3000);

// After three seconds, move the application to SKIP_BECAUSE_BROKEN status.
singleSpa.setUnloadMaxTime(3000, true);

// don't do a console warning for slow lifecycles until 10 seconds have elapsed
singleSpa.setUnloadMaxTime(3000, true, 10000);
```

全局配置移除超时时间。

<h3>arguments</h3>

<dl className="args-list">
<dt>millis: number</dt>
	<dd>一个判断等待移除是否超时的毫秒数。</dd>
	<dt>dieOnTimeout: boolean = false</dt>
	<dd>
		<p>如果设置为false，注册的应用运行变缓，在到达<code>millis</code>之前，只会在控制台中引起一些警告。</p>
		<p>如果设置为true, 注册的应用程序运行变缓，它们将被塞进一个skip_break_status，因为它们不会再打断程序。</p>
		<p>每个已注册的应用程序都可以覆盖自己的此行为。</p>
	</dd>
	<dt>warningMillis: number = 1000</dt>
	<dd>一个判断等待控制台warning是否发生的毫秒数。</dd>
</dl>

<h3>returns</h3>

`undefined`

## Events

single-spa fires Events to the `window` as a way for your code to hook into URL transitions.

### PopStateEvent

single-spa fires [PopStateEvent](https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent) events when it wants to instruct all active applications to re-render. This occurs when one application calls [history.pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState), [history.replaceState](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState), or [triggerAppChange](#triggerAppChange). Single-spa deviates from the browser's default behavior in some cases, as described in [this Github issue](https://github.com/single-spa/single-spa/issues/484#issuecomment-601279869).

```js
window.addEventListener('popstate', evt => {
  if (evt.singleSpa) {
    console.log(
      'This event was fired by single-spa to forcibly trigger a re-render',
    );
    console.log(evt.singleSpaTrigger); // pushState | replaceState
  } else {
    console.log('This event was fired by native browser behavior');
  }
});
```

### Canceling navigation

Canceling navigation refers to the URL changing and then immediately changing back to what it was before. This is done before any mounting, unmounting, or loading that would otherwise take place. This can be used in conjunction with Vue router and Angular router's built-in navigation guards that allow for cancelation of a navigation event.

To cancel a navigation event, listen to the `single-spa:before-routing-event` event:

```js
window.addEventListener(
  'single-spa:before-routing-event',
  ({ detail: { oldUrl, newUrl, cancelNavigation } }) => {
    if (
      new URL(oldUrl).pathname === '/route1' &&
      new URL(newUrl).pathname === '/route2'
    ) {
      cancelNavigation();
    }
  },
);
```

When a navigation is canceled, no applications will be mounted, unmounted, loaded, or unloaded. All single-spa routing events will fire for the canceled navigation, but they will each have the `navigationIsCanceled` property set to `true` on the `event.detail` (Details below in Custom Events section).

Navigation cancelation is sometimes used as a mechanism for preventing users from accessing routes for which they are unauthorized. However, we generally recommend permission checks on each route as the proper way to guard routes, instead of navigation cancelation.

### Custom Events

single-spa fires a series of [custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) whenever it reroutes. A reroute occurs whenever the browser URL changes in any way or a `triggerAppChange` is called. The custom events are fired to the `window`. Each custom event has a [`detail` property](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) with the following properties:

```js
window.addEventListener('single-spa:before-routing-event', evt => {
  const {
    originalEvent,
    newAppStatuses,
    appsByNewStatus,
    totalAppChanges,
    oldUrl,
    newUrl,
    navigationIsCanceled,
    cancelNavigation,
  } = evt.detail;
  console.log(
    'original event that triggered this single-spa event',
    originalEvent,
  ); // PopStateEvent | HashChangeEvent | undefined
  console.log(
    'the new status for all applications after the reroute finishes',
    newAppStatuses,
  ); // { app1: MOUNTED, app2: NOT_MOUNTED }
  console.log(
    'the applications that changed, grouped by their status',
    appsByNewStatus,
  ); // { MOUNTED: ['app1'], NOT_MOUNTED: ['app2'] }
  console.log(
    'number of applications that changed status so far during this reroute',
    totalAppChanges,
  ); // 2
  console.log('the URL before the navigationEvent', oldUrl); // http://localhost:8080/old-route
  console.log('the URL after the navigationEvent', newUrl); // http://localhost:8080/new-route
  console.log('has the navigation been canceled', navigationIsCanceled); // false

  // The cancelNavigation function is only defined in the before-routing-event
  evt.detail.cancelNavigation();
});
```

The following table shows the order in which the custom events are fired during a reroute:

| Event order | Event Name                                                          | Condition for firing                                |
| ----------- | ------------------------------------------------------------------- | --------------------------------------------------- |
| 1           | `single-spa:before-app-change` or `single-spa:before-no-app-change` | Will any applications change status?                |
| 2           | `single-spa:before-routing-event`                                   | &mdash;                                             |
| 3           | `single-spa:before-mount-routing-event`                             | &mdash;                                             |
| 4           | `single-spa:before-first-mount`                                     | Is this the first time any application is mounting? |
| 5           | `single-spa:first-mount`                                            | Is this the first time any application was mounted? |
| 6           | `single-spa:app-change` or `single-spa:no-app-change`               | Did any applications change status?                 |
| 7           | `single-spa:routing-event`                                          | &mdash;                                             |

### before-app-change event

```js
window.addEventListener('single-spa:before-app-change', evt => {
  console.log('single-spa is about to mount/unmount applications!');
  console.log(evt.detail.originalEvent); // PopStateEvent
  console.log(evt.detail.newAppStatuses); // { app1: MOUNTED }
  console.log(evt.detail.appsByNewStatus); // { MOUNTED: ['app1'], NOT_MOUNTED: [] }
  console.log(evt.detail.totalAppChanges); // 1
});
```

A `single-spa:before-app-change` event is fired before reroutes that will result in at least one application changing status.

### before-no-app-change

```js
window.addEventListener('single-spa:before-no-app-change', evt => {
  console.log('single-spa is about to do a no-op reroute');
  console.log(evt.detail.originalEvent); // PopStateEvent
  console.log(evt.detail.newAppStatuses); // { }
  console.log(evt.detail.appsByNewStatus); // { MOUNTED: [], NOT_MOUNTED: [] }
  console.log(evt.detail.totalAppChanges); // 0
});
```

每次路由跳转后`single-spa:routing-event`事件会被触发，它可能是 hashchange, popstate, 或者 triggerAppChange，甚至当前应用不需要修改时
; 在single-spa 校验所有app都正确加载，初始化，挂载，卸载之后此此事件触发。

### before-routing-event

```js
window.addEventListener('single-spa:before-routing-event', evt => {
  console.log('single-spa is about to mount/unmount applications!');
  console.log(evt.detail.originalEvent); // PopStateEvent
  console.log(evt.detail.newAppStatuses); // { }
  console.log(evt.detail.appsByNewStatus); // { MOUNTED: [], NOT_MOUNTED: [] }
  console.log(evt.detail.totalAppChanges); // 0
});
```

每次加载，初始化，挂载，卸载或移除一个或多个应用程序时，都会触发 `single-spa:app-change` 事件。它与 `single-spa:routing-event` 路由事件类似，只是在一个或多个应用程序真正加载，初始化，挂载，卸载或移除之后，它才会启动。如果hashchange、popstate或triggerAppChange不会导致其中任何一个更改，则不会引发事件。

### before-mount-routing-event

```js
window.addEventListener('single-spa:before-mount-routing-event', evt => {
  console.log('single-spa is about to mount/unmount applications!');
  console.log(evt.detail);
  console.log(evt.detail.originalEvent); // PopStateEvent
  console.log(evt.detail.newAppStatuses); // { app1: MOUNTED }
  console.log(evt.detail.appsByNewStatus); // { MOUNTED: ['app1'], NOT_MOUNTED: [] }
  console.log(evt.detail.totalAppChanges); // 1
});
```

当没有加载，初始化，挂载，卸载或移除应用程序时，single-spa触发 `single-spa:no-app-change` 事件。这与 `single-spa:app-change` 事件正好相反。每个路由事件只会触发一个。

### before-first-mount

```js
window.addEventListener('single-spa:before-first-mount', () => {
  console.log(
    'single-spa is about to mount the very first application for the first time',
  );
});
```

在第一个single-spa应用被挂在之前，single-spa 会触发 `single-spa:before-first-mount` 事件；因此它只会触发一次。更具体点说，它只会在应用被加载但未挂载之前触发。

<<<<<<< HEAD
> **推荐用例：** 在用户将要看到第一个应用挂载之前，移除一个loading。
=======
:::tip Suggested use case
remove a loader bar that the user is seeing right before the first app will be mounted.
:::
>>>>>>> 6abc5a78c336e192a695861bfa5fb00e78afcbbf

### first-mount

```js
window.addEventListener('single-spa:first-mount', () => {
  console.log('single-spa just mounted the very first application');
});
```

<<<<<<< HEAD
在第一个single-spa应用被挂在之后， single-spa 会触发 `single-spa:first-mount` 事件；因此它只会触发一次。

> **推荐用例：** 输出用户看到应用之前花费了多长时间。
=======
After the first of any single-spa applications is mounted, single-spa fires a `single-spa:first-mount` event; therefore it will only be fired once ever.

:::tip Suggested use case
log the time it took before the user sees any of the apps mounted.
:::

### app-change event

```js
window.addEventListener('single-spa:app-change', evt => {
  console.log(
    'A routing event occurred where at least one application was mounted/unmounted',
  );
  console.log(evt.detail.originalEvent); // PopStateEvent
  console.log(evt.detail.newAppStatuses); // { app1: MOUNTED, app2: NOT_MOUNTED }
  console.log(evt.detail.appsByNewStatus); // { MOUNTED: ['app1'], NOT_MOUNTED: ['app2'] }
  console.log(evt.detail.totalAppChanges); // 2
});
```

A `single-spa:app-change` event is fired every time that one or more apps were loaded, bootstrapped, mounted, unmounted, or unloaded. It is similar to `single-spa:routing-event` except that it will not fire unless one or more apps were actually loaded, bootstrapped, mounted, or unmounted. A hashchange, popstate, or triggerAppChange that does not result in one of those changes will not cause the event to be fired.

### no-app-change event

```js
window.addEventListener('single-spa:no-app-change', evt => {
  console.log(
    'A routing event occurred where zero applications were mounted/unmounted',
  );
  console.log(evt.detail.originalEvent); // PopStateEvent
  console.log(evt.detail.newAppStatuses); // { }
  console.log(evt.detail.appsByNewStatus); // { MOUNTED: [], NOT_MOUNTED: [] }
  console.log(evt.detail.totalAppChanges); // 0
});
```

When no applications were loaded, bootstrapped, mounted, unmounted, or unloaded, single-spa fires a `single-spa:no-app-change` event. This is the inverse of the `single-spa:app-change` event. Only one will be fired for each routing event.

### routing-event

```js
window.addEventListener('single-spa:routing-event', evt => {
  console.log('single-spa finished mounting/unmounting applications!');
  console.log(evt.detail.originalEvent); // PopStateEvent
  console.log(evt.detail.newAppStatuses); // { app1: MOUNTED, app2: NOT_MOUNTED }
  console.log(evt.detail.appsByNewStatus); // { MOUNTED: ['app1'], NOT_MOUNTED: ['app2'] }
  console.log(evt.detail.totalAppChanges); // 2
});
```

A `single-spa:routing-event` event is fired every time that a routing event has occurred, which is after each hashchange, popstate, or triggerAppChange, even if no changes to registered applications were necessary; and after single-spa verified that all apps were correctly loaded, bootstrapped, mounted, and unmounted.
>>>>>>> 6abc5a78c336e192a695861bfa5fb00e78afcbbf
