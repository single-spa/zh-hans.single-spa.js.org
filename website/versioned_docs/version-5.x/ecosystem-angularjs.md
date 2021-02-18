---
id: ecosystem-angularjs
title: single-spa-angularjs
sidebar_label: AngularJS
---

single-spa-angularjs 是一个类库，可以帮助实现与 [AngularJS](https://angularjs.org/) 一起使用 [single-spa registered application](configuration#registering-applications) [lifecycle functions](building-applications.md#registered-application-lifecycle) (bootstrap, mount and unmount)。 查看 [single-spa-angularjs github](https://github.com/single-spa/single-spa-angularjs).

## 安装
```sh
npm install --save single-spa-angularjs
```

请注意，你也可以使用 `<script src="https://unpkg.com/single-spa-angularjs"></script>` 的方式，通过全局变量 `singleSpaAngularjs` 引入库，如果那样对你来说更方便。

## 使用打包工具

如果你使用webpack等打包工具，则将以下内容添加到入口文件：

```js
import singleSpaAngularJS from 'single-spa-angularjs';
import angular from 'angular';

const ngLifecycles = singleSpaAngularJS({
  angular: angular,
  mainAngularModule: 'app',
  uiRouter: true,
  preserveGlobal: false,
  template: '<my-component />',
});

export const bootstrap = ngLifecycles.bootstrap;
export const mount = ngLifecycles.mount;
export const unmount = ngLifecycles.unmount;
```

## 不使用打包工具
如果不使用打包工具，则需要将你的 angularjs 应用设置为 SystemJS module 或全局变量。 使用 SystemJS module更佳，你可以在 [recommended single-spa setup](/docs/faq.html#is-there-a-recommended-setup) 在中查看更多内容。

### 作为 SystemJS module
添加如下代码到你的 AngularJS 应用。如果你使用 gulp/grunt 打包文件，需要创建一个 `single-spa-application.js` 文件，并确保它在最终的构建文件中。

```js
System.register([], function(_export) {
  return {
    execute: function() {
      _export(window.singleSpaAngularjs.default({
        angular: angular,
        mainAngularModule: 'app',
        uiRouter: true,
        preserveGlobal: false,
        template: '<my-component />',
      }))
    }
  }
})
```

完成此操作后，你就可以使用 `System.import()` 捆绑文件，而SystemJS + single-spa将知道如何处理您的模块。 你的
[loading function](/docs/configuration.html#loading-function-or-application) 需要被 `System.import('name-of-app')`. 确保添加
 `name-of-app` 到你的 [import map](https://single-spa-playground.org/playground/import-map).

### 作为全局变量
```js
// note that "js" is not capitalized in the name of the global variable.
window.myAngularApp = singleSpaAngularjs({
  angular: angular,
  mainAngularModule: 'app',
  uiRouter: true,
  preserveGlobal: false,
  template: '<my-component />',
})
```

你的 [loading function](/docs/configuration.html#loading-function-or-application) 必须是全局变量本身， 例如:
```js
singleSpa.registerApplication({
  name: 'my-angular-app',
  app: myAngularApp,
  activeWhen: () => true
});
```

## Options

当调用`singleSpaAngularJS（opts）`时，所有选项都通过`opts`参数传递给single-spa-angularjs。提供以下选项：

- `angular`: (必须) angular主对象, 通常暴露在window上，也可以通过'require（'angular'）'或'import from'angular'`获得。
- `domElementGetter`: （可选）不带任何参数并返回DOMElement的函数。这个dom元素就是angular应用被初始化，安装和卸载的位置。如果没有提供，默认是创建一个div并添加到 `document.body` 下。
- `mainAngularModule`: (必须) 一个字符串，它是由angular初始化的angular模块的名称。请参阅 [angular docs](https://docs.angularjs.org/api/ng/function/angular.bootstrap) 以了解 `angular.bootstrap()`。
- `uiRouter`: （可选）如果你使用了 angular-ui-router，请将此选项设置为`true`或字符串值。字符串的值将作为 ui-view html的属性值。例如， `uiRouter: 'core'` 将被解析成 `<div ui-view="core" />` 而 `uiRouter: true` 则是 `<div ui-view />`.
- `preserveGlobal`: （可选）默认为false的布尔值。 设置是否要在卸载应用后仍保持全局 angular。
- `elementId`: （可选）一个字符串，将用于标识附加到DOM并由Angular引导的元素。
- `strictDi`: (可选 - 初始化程序的一部分 [config object](https://docs.angularjs.org/api/ng/function/angular.bootstrap#usage)) 默认为false的布尔值，修改以启用StrictDi模式。
- `template`: （可选）在应用程序mounted时将插入DOM的html字符串。 该模板位于domElementGetter返回的元素内。 如果未提供，则不会插入模板。 使用angular-ui-router时，由于ui-router会为您将模板放到dom上，因此您通常不需要使用它。

## ES5 示例
查看 [示例](https://github.com/joeldenning/single-spa-es5-angularjs)
## Custom Props

[single-spa custom props](/docs/building-applications/#lifecycle-props) are made available as `$rootScope.singleSpaProps`.

## Parcels

### Creating AngularJS parcels

The `singleSpaAngularJs()` function returns an object that can serve as either a [single-spa application](/docs/building-applications) or [single-spa parcel](/docs/parcels-overview).

### Rendering parcels in AngularJS

To render a single-spa parcel inside of your AngularJS application, you can use the `<single-spa-parcel>` directive. To do so, first add the `"single-spa-angularjs"` module as a dependency of your application:

```js
import 'single-spa-angularjs/lib/parcel.js';

angular.module('myMainModule', [
  'single-spa-angularjs'
])
```

Then you can use the `<single-spa-parcel>` directive in your templates:

```html
<single-spa-parcel
  parcel-config="parcelConfig"
  props="parcelProps"
  mount-parcel="mountRootParcel"
/>
```

In your controller, set the corresponding values on the $scope:

```js
import { mountRootParcel } from 'single-spa';

// The parcelConfig binding is required. It must be an object or loading function that resolves with an object.
$scope.parcelConfig = {async mount() {}, async unmount() {}}

// You can retrieve parcels from other microfrontends via cross-microfrontend imports
// See https://single-spa.js.org/docs/recommended-setup#cross-microfrontend-imports
// $scope.parcelConfig = () => System.import('@org/settings-modal');

// The props binding is optional, defaulting to no custom props being passed into the parcel
$scope.props = {
  extra: 'info can be passed here'
}

// As long as you're using <single-spa-parcel> inside of another single-spa application or parcel,
// the mountParcel binding is not needed. However, it is needed otherwise.
$scope.mountParcel = mountRootParcel
```

If you run into issues related to `singleSpaProps` not being available for injection, this is likely caused by using `<single-spa-parcel>` outside of a single-spa application or parcel. It is okay to do so, but you'll need to manually provide the `singleSpaProps` value:

```js
import { mountRootParcel } from 'single-spa';

angular.module('single-spa-angularjs').config(['$provide', ($provide) => {
  // This can be an empty object, you just need the DI to not fail
  const props = {};

  // Alternatively, you can provide a mountParcel function that will be used as the default value for the mount-parcel attribute
  // const props = {mountParcel: mountRootParcel}

  $provide.value('singleSpaProps', props);
}])
```

## Examples

- [polyglot microfrontends account settings](https://github.com/polyglot-microfrontends/account-settings): Gulp + angularjs@1.7 project integrated with Vue microfrontends.
- [single-spa-es5-angularjs](https://github.com/joeldenning/single-spa-es5-angularjs): No build process - just global variables.
>>>>>>> f82762b71cedc633132ad4b93d35ed962a728494
