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

## Examples

- [polyglot microfrontends account settings](https://github.com/polyglot-microfrontends/account-settings): Gulp + angularjs@1.7 project integrated with Vue microfrontends.
- [single-spa-es5-angularjs](https://github.com/joeldenning/single-spa-es5-angularjs): No build process - just global variables.
>>>>>>> f82762b71cedc633132ad4b93d35ed962a728494
