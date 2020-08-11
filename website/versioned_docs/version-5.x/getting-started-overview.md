---
id: getting-started-overview
title: 快速开始
sidebar_label: 概览
---

## JavaScript 微前端

[加入 Slack 一起聊聊](https://join.slack.com/t/single-spa/shared_invite/enQtODAwNTIyMzc4OTE1LWUxMTUwY2M1MTY0ZGMzOTUzMGNkMzI1NzRiYzYwOWM1MTEzZDM1NDAyNWM3ZmViOTAzZThkMDcwMWZmNTFmMWQ)

Single-spa 是一个将多个单页面应用聚合为一个整体应用的 javascript 微前端框架。 使用 single-spa 进行前端架构设计可以带来很多好处，例如:

- 在同一页面上[使用多个前端框架](ecosystem.md#help-for-frameworks) [而不用刷新页面](building-applications.md)
  ([React](ecosystem-react.md), [AngularJS](ecosystem-angularjs.md), [Angular](ecosystem-angular.md), [Ember](ecosystem-ember.md), 你正在使用的框架)
- 独立部署每一个单页面应用
- 新功能使用新框架，旧的单页应用不用重写可以共存
- 改善初始加载时间，迟加载代码

## 演示和示例

前往 [示例页面](/docs/examples).

## 架构概览

Single-spa 从现代框架组件生命周期中获得灵感，将生命周期应用于整个应用程序。 它脱胎于 Canopy 使用 React + React-router 替换 AngularJS + ui-router 的思考，避免应用程序被束缚。现在 single-spa 几乎支持任何框架。 由于 JavaScript 因其许多框架的寿命短而臭名昭著，我们决定让它在任何您想要的框架都易于使用。

Single-spa 包括以下内容:

1. [Applications](building-applications.md)，每个应用程序本身就是一个完整的 SPA (某种程度上)。 每个应用程序都可以响应 url 路由事件，并且必须知道如何从 DOM 中初始化、挂载和卸载自己。 传统 SPA 应用程序和 Single SPA 应用程序的主要区别在于，它们必须能够与其他应用程序共存，而且它们没有各自的 html 页面。

	例如，React 或 Angular spa 就是应用程序。 当激活时，它们监听 url 路由事件并将内容放在 DOM上。 当它们处于非活动状态时，它们不侦听 url 路由事件，并且完全从 DOM 中删除。

2. 一个 [single-spa-config](configuration)配置, 这是html页面和向Single SPA注册应用程序的JavaScript。每个应用程序都注册了三件东西
    - A name
    - A function (加载应用程序的代码)
    - A function (确定应用程序何时处于活动状态/非活动状态)

## 推荐设置

single-spa 核心团队已经汇总了文档，工具和视频，展示了当前使用single-spa鼓励的最佳实践。
查看[这些文档](./recommended-setup.md)以获取更多信息。


## 使用 single-spa 很难么？

我们的目标是尽可能简化single-spa的使用过程。但是我们还应该指出，这是一种高级架构，它不同于前端应用程序通常的实现方式。

Single-spa 适用于 ES5、 ES6 + 、 TypeScript、 Webpack、 SystemJS、 Gulp、 Grunt、 Bower、 ember-cli 或 任何可用的构建系统。 您可以 npm 安装它，jspm 安装它，如果您愿意，甚至可以使用 `<script>` 标签。

如果您不是从头开始开发应用程序，则必须将传统 SPA [迁移至单single-spa](migrating-existing-spas.md) 应用程序

* [React 项目迁移](migrating-react-tutorial.md)
* [AngularJS 项目迁移](migrating-angularJS-tutorial.md)

single-spa 可以在 Chrome、 Firefox、 Safari、 IE11和 Edge 中使用。

## single-spa 名字有些重复吗？

是的.

## 文档

该文档分为几个部分：

* [快速入门](getting-started-overview.md)
* [single-spa 应用](building-applications.md)
* [single-spa 包](parcels-overview.md)
* [示例](examples.md)
* [生态系统](ecosystem.md)
* [贡献指南](contributing-overview.md)
* [博客](https://single-spa.js.org/blog/)
* [帮助与支持](https://single-spa.js.org/en/help.html)

通过发起 pull requests 到 [`single-spa.js.org` 代码仓库](https://github.com/single-spa/single-spa.js.org)，可以帮助改善Single-Spa网站。

## 简单用法

有关完整的示例，请查看 [简单的Webpack示例](https://github.com/joeldenning/simple-single-spa-webpack-example) 或 [从头开始的教程](starting-from-scratch.md)。

要创建single-spa应用程序，您需要做三件事：

1. 创建一个 html 文件:

```html
<html>
<body>
	<script src="single-spa-config.js"></script>
</body>
</html>
```

2. 创建一个single-spa-config。查看[文档](configuration)以获取更多详细信息。

```js
//main.js

import * as singleSpa from 'single-spa';

const name = 'app1';

/* loading 是一个返回 promise 的函数，用于 加载/解析 应用代码。
 * 它的目的是为延迟加载提供便利 —— single-spa 只有在需要时才会下载应用程序的代码。
 * 在这个示例中，在 webpack 中支持 import ()并返回 Promise，但是 single-spa 可以使用任何返回 Promise 的加载函数。
 */
const app = () => import('./app1/app1.js');

/* Single-spa 配置顶级路由，以确定哪个应用程序对于指定 url 是活动的。
 * 您可以以任何您喜欢的方式实现此路由。
 * 一种有用的约定是在url前面加上活动应用程序的名称，以使顶层路由保持简单。
 */
const activeWhen = '/app1';

singleSpa.registerApplication({ name, app, activeWhen });

singleSpa.start();
```

3. 创建一个应用程序。查看[文档](building-applications.md)以获取更多详细信息。

```js
//app1.js

let domEl;

export function bootstrap(props) {
	return Promise
		.resolve()
		.then(() => {
			domEl = document.createElement('div');
			domEl.id = 'app1';
			document.body.appendChild(domEl);
		});
}

export function mount(props) {
	return Promise
		.resolve()
		.then(() => {
			// 在这里通常使用框架将ui组件挂载到dom。请参阅https://single-spa.js.org/docs/ecosystem.html。
			domEl.textContent = 'App 1 is mounted!'
		});
}

export function unmount(props) {
	return Promise
		.resolve()
		.then(() => {
			// 在这里通常是通知框架把ui组件从dom中卸载。参见https://single-spa.js.org/docs/ecosystem.html
			domEl.textContent = '';
		})
}
```

## API

阅读更多有关[single-spa API](api.md) 和[应用程序api](building-applications.md#application-lifecycle) 的信息。

## 贡献

该代码仓库的主要目的是继续发展single-spa，使其变得更好，更容易使用。single-spa和[single-spa生态系统](ecosystem.md)的开发是在GitHub上公开进行的，我们感谢社区为错误修正和改进做出的贡献。阅读下面的内容，了解如何参与改善single-spa。

### [行为守则](CODE_OF_CONDUCT.md)

Single-spa 已经通过了一个行为准则，我们希望项目参与者能够遵守。 请[阅读全文](CODE_OF_CONDUCT.md)，以便您能够理解什么行为将被容忍和不会被容忍。

### [贡献指南](contributing-overview.md)

阅读我们的[贡献指南](./contributing-overview.md)，以了解我们的开发过程，如何提出错误修正和改进，以及如何对single-spa的更改进行构建和测试。

## 谁在使用这个？

查看[用户展示](/users)。

你的公司或项目是否使用single-spa？通过向[本部分](https://github.com/single-spa/single-spa.js.org/blob/master/website/src/data/users.js)提交PR来让我们知道！
