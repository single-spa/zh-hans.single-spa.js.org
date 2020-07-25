---
id: ecosystem-backbone
title: single-spa-backbone
sidebar_label: Backbone
---

一个使用[Backbone](http://backbonejs.org/)构建single-spa应用提供生命周期事件工具库。

[![npm Package](https://img.shields.io/npm/v/@emtecinc/single-spa-backbone.svg)](https://www.npmjs.com/package/@emtecinc/single-spa-backbone)
[![License](https://img.shields.io/npm/l/@emtecinc/single-spa-backbone.svg)](https://github.com/emtecinc/single-spa-backbone/blob/master/LICENSE)

主要有三种创建backbone应用的方式：

1. 使用 [RequireJS](https://requirejs.org/)，他会加载应用及其所有依赖，包括使用 [Handlebars](https://handlebarsjs.com/)或其他引擎的模板文件, [RequireJS:Text](https://github.com/requirejs/text)。

   如果你的项目用此种方式构建，那么您必须将' AppWithRequire '作为参数使用插件。可以选择通过 `data-main` 属性加载应用程序，也可以不选择。

2. 使用 [Backbone](http://backbonejs.org/) 和直接使用 `ApplicationPath` (应用的入口) 作为script元素，可以选择的加载依赖。

3. 加载包括所有依赖（比如Backbone, Require, Underscore和Jquery等等）的单个应用包。

## NPM package

npm install --save @emtecinc/single-spa-backbone

Npm仓库[可见](https://www.npmjs.com/package/@emtecinc/single-spa-backbone). 

## 快速开始

### Option 1: 使用 `RequireJS` 和 `data-main`

首先, 在 [single-spa application](https://github.com/single-spa/single-spa/blob/master/docs/applications.md#registered-applications)中执行 `npm install --save @emtec/single-spa-backbone`. 然后, 像下边一样创建一个入口文件，确保应用有`BasePath` ， `AppPath` 和 `RequireJsPath` 是对于BasePath的相对路径。

```js
import singleSpaBackbone from '@emtecinc/single-spa-backbone';

const backBoneLifecycles = singleSpaBackbone({
	BasePath: 'appBasePath',
	AppWithRequire:
	{
		IsDataMain: true,
		AppPath: 'src/app',
		RequireJsPath: 'lib/require.js'
	},
	DomElementSetter: domElementSetter
});

export const bootstrap = [
	backBoneLifecycles.bootstrap,
];

export const mount = [
	backBoneLifecycles.mount,
];

export const unmount = [
	backBoneLifecycles.unmount,
];


function domElementSetter() {

	//use the same element id to render into, in the backbone app
	let el = document.getElementById('shell-container');
	if (!el) {
		el = document.createElement('div');
		el.id = 'shell-container';
		document.body.appendChild(el);
	}

}
```

`DomElementSetter` 提供了一个回调函数，可以用来在dom中创建一个容器元素，用于加载应用程序。

请注意，这个挂钩只是一个setter方法，不要期望您返回一个值。您需要在backbone应用中显式地使用相同的元素#id来将其用作应用区域或的容器。

### Option 2: 使用 `RequireJS` 而不用 `data-main`

在这种情况下 `IsDataMain` 会被设为 `false`。

```js
import singleSpaBackbone from '@emtecinc/single-spa-backbone';

const backBoneLifecycles = singleSpaBackbone({
	BasePath: 'appBasePath',
	AppWithBackboneJs:
	{
		AppPath: 'src/app',
		BackboneJsPath: 'lib/backbone.js'
	},
	DomElementSetter: domElementSetter
});

export const bootstrap = backBoneLifecycles.bootstrap;

export const mount = backBoneLifecycles.mount;

export const unmount = backBoneLifecycles.unmount;

function domElementSetter() {

	//use the same element id to render into, in the backbone app
	let el = document.getElementById('shell-container');
	if (!el) {
		el = document.createElement('div');
		el.id = 'shell-container';
		document.body.appendChild(el);
	}

}
```

### Option 3: 使用生产build的方式加载 Backbone 应用


```js
import singleSpaBackbone from '@emtecinc/single-spa-backbone';

const backBoneLifecycles = singleSpaBackbone({
	BasePath: 'appBasePath',
	App:
	{
		AppPath: 'src/app'
	},
	DomElementSetter: domElementSetter
});

export const bootstrap = backBoneLifecycles.bootstrap;

export const mount = backBoneLifecycles.mount;

export const unmount = backBoneLifecycles.unmount;


function domElementSetter() {

	//use the same element id to render into, in the backbone app
	let el = document.getElementById('shell-container');
	if (!el) {
		el = document.createElement('div');
		el.id = 'shell-container';
		document.body.appendChild(el);
	}

}
```


## Options

在调用`singleSpaBackbone(userOptions)`方法时，`userOptions` 参数会将所有选项传递给single-spa-backbone。选项如下:

* `BasePath` (必填) : backbone应用的基础路径。大多数情况下会设置应用在服务器的公共路径，其他路径会以它为基准。该参数为字符串类型。

* `AppWithRequire` (必填) : 该参数为一个对象，并且有如下属性 :
	* `IsDataMain` (选填) : 该参数为一个布尔值，用来判断js是否需要 `data-main` 属性来加载应用。
	* `AppPath` (必填) : 该参数为字符串，用来指明应用入口JavaScript文件的路径，他会需要RequireJs来启动，路径相对于BasePath。 
	* `RequireJsPath` (必填) : 该参数为字符串，取RequireJs文件的路径，路径相对于BasePath。
	* `DependenciesJsPaths` (选填) : 该参数为选填项，类型为字符串的数组。可以作为你想浏览器加载JavaScript文件的列表项。

* `AppWithBackboneJs` (必填) : 该参数为一个对象，并且有如下属性 :
	* `AppPath` (必填) : 该参数为字符串，用来指明应用入口JavaScript文件的路径，他会需要RequireJs来启动，路径相对于BasePath。 
	* `BackboneJsPath` (required) : This parameter takes a string value and takes the path of the Backbone Js file and is relative to BasePath.
	* `BackboneJsPath` (必填) : 该参数为字符串，用来指明Backbone文件的路径，路径相对于BasePath。 
	* `DependenciesJsPaths` (选填) : 该参数为选填项，类型为字符串的数组。可以作为你想浏览器加载JavaScript文件的列表项。

* `App` (选填) : 该参数为一个对象，并且有如下属性 :
	* `AppPath` (必填) : 该参数为字符串，用来指明应用入口JavaScript文件的路径，他会需要RequireJs来启动，路径相对于BasePath。 

### 注意 : 在AppWithRequire、AppWithBackboneJs和App中，只有一个是必需的。

* `DomElementSetter` (可选) : This is an optional parameter and can be mostly used to create a dom element, whose id can be later used in the backbone app to load the application. However, you can freely use this callback for any other purpose. It is called before anything else.
* `DomElementSetter` (可选) : 这是一个可选参数，主要用于创建dom元素，其id稍后可用于backbone应用中加载应用程序。但是，您可以随意的调用此回调函数，无论什么目的，它会优先执行。