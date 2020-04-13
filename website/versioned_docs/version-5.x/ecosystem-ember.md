---
id: ecosystem-ember
title: single-spa-ember
sidebar_label: Ember
---

single-spa-ember 是一个它可以帮助Ember应用程序实现[single-spa 应用](configuration#registering-applications)需要的[生命周期函数](building-applications.md#registered-application-lifecycle) （bootstrap、mount和unmount）的辅助库，以便与[ember.js]一起使用（https://www.emberjs.com/）。请查看[single spa ember github](https://github.com/single-spa/single-spa-ember)

为了方便bower和ember cli一起使用的场景。它在npm和bower上都以`single-spa-ember`的形式提供。

## 概述

构建ember应用程序作为[single-spa应用程序](https://github.com/single-spa/single-spa/blob/master/docs/applications.md#registered-applications)工作时，需要实现五件事：

- [加载函数](https://github.com/single-spa/single-spa/blob/master/docs/root-application.md#loading-function)
- [活动函数](https://github.com/single-spa/single-spa/blob/master/docs/root-application.md#activity-function)
- [引导函数](https://github.com/single-spa/single-spa/blob/master/docs/applications.md#bootstrap)
- [装载函数](https://github.com/single-spa/single-spa/blob/master/docs/applications.md#mount)
- [卸载函数](https://github.com/single-spa/single-spa/blob/master/docs/applications.md#unmount)

除活动函数以外，Single-spa-ember会帮助您实现所有功能。

注意，加载和活动函数是[single spa root application](https://github.com/single-spa/single-spa/blob/master/docs/root-application.md)的一部分，而引导、装载和卸载函数是[single spa application](https://github.com/single-spa/single-spa/blob/master/docs/applications.md)的一部分。

## API

### 加载Ember应用程序

`loadEmberApp（appName，appUrl，vendorUrl）`是一个为ember应用程序实现[加载函数](https://github.com/single-spa/single-spa/blob/master/docs/root-application.md#loading-function)的方法。`appName` and `appUrl`都是必填的字符串，而`vendorUrl`是可选的字符串。


```js
// In the single-spa root application

import {registerApplication} from 'single-spa';
import {loadEmberApp} from 'single-spa-ember';

const name = 'ember-app';
const app = () => loadEmberApp(name, '/dist/ember-app/assets/ember-app.js', '/dist/ember-app/assets/vendor.js');
const activeWhen = location => location.hash.startsWith('ember');

registerApplication({ name, app, activeWhen });
```

### singleSpaEmber
要使用Single-spa-ember的[single-spa生命周期函数](https://github.com/single-spa/single-spa/blob/master/docs/applications.md#application-lifecycle)，要调用一个带有配置对象的导出函数，该对象是具有`bootstrap`、`mount`和`unmount`生命周期函数。具有以下选项：

- `App`(必填)：[ember 应用程序](https://www.emberjs.com/api/ember/2.14.1/classes/Ember.Application)
- `createOpts` (选填)：调用[App.create(options)](https://www.emberjs.com/api/ember/2.14.1/classes/Ember.Application)时要用的属性。有关更多详细信息，请参阅[ember文档](https://www.emberjs.com/api/ember/2.14.1/classes/Ember.Application)。

```js
// In the ember application
import singleSpaEmber from 'single-spa-ember/src/single-spa-ember';

const emberLifecycles = singleSpaEmber({
  appName: 'ember-app', // required
  createOpts: { // See https://www.emberjs.com/api/ember/2.14.1/classes/Ember.Application
    rootElement: '#ember-app',
  },
});

export const bootstrap = emberLifecycles.bootstrap;
export const mount = emberLifecycles.mount;
export const unmount = emberLifecycles.unmount;
```

## 使用ember cli

在大多数情况下，使用[ember cli](https://ember-cli.com/)的应用程序都可以与single-spa很好的工作。有一个不同的是，ember cli会控制整个html页面，但一个single-spa应用程序不是这样。所以，通常我们可以通过动态地将供应商和应用程序捆绑包加载到html页面中，而不是直接将它们烘焙到html页面中来实现相同的行为。以下是在使用single-spa设置ember cli应用程序时应执行的已知操作：

因为ember cli只支持来自bower的依赖项，所以需要执行以下操作：

- `bower init`
- `bower install single-spa-ember --save`

将以下选项添加到ember-cli-build.js文件中：
```js
/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    autoRun: false, // Set autoRun to false, because we only want the ember app to render to the DOM when single-spa tells it to.
    storeConfigInMeta: false, // We're making a single-spa application, which doesn't exclusively own the html file. So we don't want to have to have a `<meta>` tag for the ember environment to be initialized.
		fingerprint: {
			customHash: null, // This is optional, just will make it easier for you to have the same url every time you do an ember build.
		},
    // Add options here
  });

  // Tell ember how to use the single-spa-ember library
  app.import('bower_components/single-spa-ember/amd/single-spa-ember.js', {
		using: [
			{transformation: 'amd', as: 'single-spa-ember'},
		],
	});

  return app.toTree();
};
```

在single-spa根应用程序中（独立于由ember cli生成的任何内容）：


```js
// root-application.js
import * as singleSpa from 'single-spa';
import {loadEmberApp} from 'single-spa-ember';

singleSpa.registerApplication('ember-app', loadingFunction, activityFunction);

function activityFunction(location) {
  // Only render the ember app when the url hash starts with ember
  return location.hash.startsWith('ember');
}

// single-spa-ember helps us load the script tags and give the ember app module to single-spa.
function loadingFunction() {
  const appName = 'ember-app';
  const appUrl = '/dist/ember-app/assets/ember-app.js';
  const vendorUrl = '/dist/ember-app/assets/vendor.js'; // Optional if you have one vendor bundle used for many different ember apps
  return loadEmberApp(appName, appUrl, vendorUrl);
}
```

在app.js文件中（ember cli生成）

```js
// app.js (the ember application)
import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import singleSpaEmber from 'single-spa-ember';

// This part is generated by the ember cli
const App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;

// This is the single-spa part
const emberLifecycles = singleSpaEmber({
	App, // required
	appName: 'ember-app', // required
	createOpts: { // optional
		rootElement: '#ember-app',
	},
})

// Single-spa lifecycles.
export const bootstrap = emberLifecycles.bootstrap;
export const mount = emberLifecycles.mount;
export const unmount = emberLifecycles.unmount;
```
