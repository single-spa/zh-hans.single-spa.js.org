---
id: faq
title: 常见问题
sidebar_label: FAQ
---

## single-spa做了什么？
single-spa是一个顶层路由。当路由处于活动状态时，它讲下载并执行该路由的相关代码。

路由的代码被称为应用，每个代码都可以（可选）拥有自己的git仓库、CI进程，并且可以独立部署。这些应用即可以用相同框架实现，也可以用不同框架实现。

## 有没有推荐设置？
当然，[请查看相关设置文档](/docs/recommended-setup/)。

## 我应该有一个根应用和子应用吗？
不。我们强烈推荐你的single-spa-config或根应用不要使用任何js的ui-frameworks（如：React，Angular，Angularjs，Vue等等）。根据我们的经验，简单的js模块最合适single-spa-config，并且只有已注册的应用程序世纪使用ui-frameworks框架(如：angular, react, vue, etc等)。

为什么？你最终创建的结构具有微服务的所有缺点，并没有任何优点：你的应用相互耦合，并且同时更改多个应用程序才能进行更新。

## 对性能有什么影响?
当按照[推荐方式](#is-there-a-recommended-setup)进行配置时，您的代码性能和包的大小将与已被拆分的单个应用程序基本相同。主要区别在于添加single-spa库（如果你选择使用SystemJS）。其他差别主要归结为一个（webpack/rollup等等）的代码包和浏览器内ES模块之间的差异。

## 我可以只加载一个版本(React, Vue, Angular等等)吗？
是的，并且非常推荐你这样做。使用[推荐设置](#is-there-a-recommended-setup)，你可以配置[导入映射](#what-are-import-maps)，以便你的库只定义一次。然后，通知每个应用程序_not_绑定该库；反之，该库将在运行时在浏览器中提供给你。请参见[webpack外部工具](https://webpack.js.org/configuration/externals/)（其他的包也有相似选项）。

你可以选择_not_排除那些库（例如你想尝试使用较新的版本或其他库），但请注意这将对用户的包大小和应用程序速度的产生影响。

## 重要的映射有什么？
[导入映射](https://github.com/WICG/import-maps)通过允许开发者能够编写类似`import React from "react"`语法，而不需要通过绝对或者相对路径来引入。同样从其他single-spa应用中导入也是如此，如： `import {MyButton} from "styleguide"`。import-map规范目前正在被接受成为新的web标准，在编写本文时已经[实现](https://developers.google.com/web/updates/2019/03/kv-storage#import_maps)，并且通过[SystemJS >= 3.0](https://github.com/systemjs/systemjs)已经实现了浏览器（>=IE11）的polyfill。参考[the recommended setup]（#is-there-a-recommended-setup）。

## 如何在应用程序间共享状态？
通常，我们建议尽量避免这种情况-它将会将这些应用结合在一起。如果你发现需要经常共享两个应用的状态，你可以考虑将这些单独的应用划分成一个应用。

一般来说，最好根据每个应用所需的数据发送api请求，尽管其中的一部分已经被其他应用请求过。实际上，如果你正确的设计了应用的边界，那么最终只有很少的应用状态是真正共享的。例如，你的好友列表的数据需求与你的社交需要不同。

然而，那不意味着不能做到。以下是几种方法：
1. 创建可以缓存请求及其响应的共享API请求库。如果同一个AIP被多个应用重复命中，则使用缓存数据。
2. 将共享状态公开为导出，其他的库可以导入它。可观测值(如：[RxJS](https://rxjs-dev.firebaseapp.com/)) 在这里很有用，因为他们能够将新值流式传输给订阅服务器。
3. 使用[custom browser events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#Creating_custom_events)来交流。
4. 使用[cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)， [local/session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)或其他能够存取状态的工具。这些方法最适用于不经常改变的内容，例如登陆的用户信息。

**请注意，这里只是在讨论共享应用程序状态：共享函数，组件等，就想一个项目中"导出"和另一个项目中的"导入"一样简单。有关详细信息，请参阅[import map](#what-are-import-maps)。**

## 我应该使用前端微服务吗？
如果你曾遇到过单一服务引发的问题，你就要考虑使用微服务了。

另外，如果你的结构是在Spotify类型的模型中设置的（例如：拥有完整堆栈功能的自治小队），那么前端的微服务将非常适合你的设置。

然而，如果你刚开始有一个小项目或一个小团队，建议暂时不实用微服务。当到你的项目扩展（如：结构扩展、功能扩展等）变得困难时，别担心，我们会在这里帮你迁移的。


## 我能使用多个框架吗？
是的。然而，这是你需要认证考虑的问题，因为他将在你的前端结构中分成了不兼容的专业领域（如：React专家可能在使用Angular应用时遇到问题），而且还会导致更多的代码被发送给用户。

然而，它非常适合从旧的或者不需要的库中迁移，这样就可以慢慢的从旧应用中删除代码，并在新库中替换成新的代码（请参见[the strangler pattern](https://www.google.com/search?q=the+strangler+pattern&oq=the+strangler+pattern)）

这也是一种允许大型项目在不同库上进行实验，而无需要对他们做出强烈承诺的一种方式。

**只要意识到它对你的用户即他们使用应用时的体验的影响。**

## 开发人员的体验是怎么样的？
如果你使用[recommended setup](#is-there-a-recommended-setup)安装single-spa，你只需要在你的开发环境下，添加指向本地运行代码的导入映射，并刷新页面即可。

你可以在开发中使用[library](https://github.com/joeldenning/import-map-overrides)，或者你可以自己实现-你会注意到源码非常的简单。主要的收获是，你可以拥有多个[import maps](#what-are-import-maps)，并且最后的一个会被应用-可以通过添加import map来覆盖应用指向本地localhost的默认url。


我们还打算将该功能作为[Chrome/Firefox browser extension](https://github.com/single-spa/single-spa-inspector)的一部分来提供。

最后，此设置还允许你在生产环境中执行覆盖。显然，需要谨慎使用，但是它确实提供了一种强大的调试问题和验证解决方案的方法。

作为参考，几乎所有与我们合作过的开发者都更喜欢微服务+single-spa的开发体验，而不是单一的设置。

## 每个single-spa应用可以拥有自己的git仓库吗？
当然！你甚至可以为他们提供自己的package.json，webpack配置文件，CI/CD进程，使用SystemJS在浏览器中将他们组合在一起。

## single-spa应用可以独立部署吗？
是的！详见下一节有关CI/CD的文档。

## CI/CD的流程是什么样子的？
换句话说就是，如何打包部署一个single-spa应用？

使用[recommended setup](#is-there-a-recommended-setup)，流程如下：
1. 打包你的代码并上传至CDN。
2. 更新开发环境的导入映射，指向新的URL。换句话说，你的导入映射由`"styleguide": "cdn.com/styleguide/v1.js"`更新为`"styleguide": "cdn.com/styleguide/v2.js"`

"如何更新导入映射"上的一些选项：
* 服务器通过导入映射渲染`index.html`。这不意味这你的所有的DOM元素都需要服务器渲染，但是只要使用`<script type="systemjs-importmap>`元素， 可以提供更新数据库或服务器的本地文件的API。
* 将导入映射放在CDN上，并且使用 [import-map-deployer](https://github.com/single-spa/import-map-deployer) 或类似于在CI过程中更新导入映射。这种方法对性能影响很小，如果你没有设置服务端渲染，则通常更容易设置。（你也可以[preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content)导入映射文件来提升速度）。详情见 [example travis.yml](https://github.com/openmrs/openmrs-esm-root-config/blob/master/.travis.yml)。其他的CI工具也可以工作。

## 创建React应用
当前创建React应用（CRA）需要引入[ejecting](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject) 或者 [using a tool](https://github.com/timarney/react-app-rewired/blob/master/README.md) 来修改webpack的配置。你也可以考虑一些[popular alternatives to CRA](https://github.com/facebook/create-react-app#popular-alternatives)。

当你使用[recommended setup](#is-there-a-recommended-setup)时，需要更改以下内容（从CRA v3.0.1开始):
1. 移除Webpack optimizations，因为它们添加了多个互不加载的Webpack包。
2. 移除html-webpack插件。
3. 修改[`output.libraryTarget`](https://webpack.js.org/configuration/output/#outputlibrarytarget)为`System`, `UMD`, 或 `AMD`。

CRA不允许你在弹出或使用其他工具情况下修改上述文件。

## 代码拆分
Single spa支持代码拆分。代码拆分的方法有很多，我们无法一一涵盖，但是如果你在webpack中使用[recommended setup](#is-there-a-recommended-setup)，你至少要做以下两件事：


1. 设置动态[`__webpack_public_path__`](https://webpack.js.org/guides/public-path/#on-the-fly)，以便webpack知道从何处获取代码片段（webpack假设他们位于服务器的根目录，在single-spa应用中并不是这样的）。下面的两个解决方案，你的项目应该优先导入，保证项目运行。
    * SystemJS >= 6, 使用[systemjs-webpack-interop](https://github.com/joeldenning/systemjs-webpack-interop):
    ```js
    import { setPublicPath } from 'systemjs-webpack-interop';

   - For SystemJS >= 6, use [systemjs-webpack-interop](https://github.com/joeldenning/systemjs-webpack-interop):

   ```js
   import { setPublicPath } from 'systemjs-webpack-interop';

   setPublicPath('name-of-module-in-import-map');
   ```

   - For SystemJS 2-5: Find a code example [here](https://gitlab.com/TheMcMurder/single-spa-portal-example/blob/master/people/src/set-public-path.js#L3)

    * SystemJS 2-5: [example](https://gitlab.com/TheMcMurder/single-spa-portal-example/blob/master/people/src/set-public-path.js#L3)

2. 设置[`output.jsonpFunction`](https://webpack.js.org/configuration/output/#outputjsonpfunction)或[`output.library`](https://webpack.js.org/configuration/output/#outputlibrary)，以确保每个应用的webpack不会和其他的应用冲突。`jsonpFunction`是首选。

有关webpack配置和single-spa更多信息，详见[the recommended setup](/docs/recommended-setup#build-tools-webpack--rollup)。

## single spa是否需要额外的安全考虑？
不需要。single spa不会添加、偏离或试图绕过任何浏览器有关JavaScript的安全措施。应用程序的安全需求与不实用single spa时相同。

除此之外，web应用可能会使用以下资源，这些资源拥有自己的安全考虑，你或许要熟悉这些资源：

- [ES6 module dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
  - Webpack-based applications use [Webpack's implementation of dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports)
- [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP#Threats)
  - module imports specifically relate to [CSP `script-src`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)
- [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity#How_Subresource_Integrity_helps)
  - See also [import-maps script “integrity” attribute](https://github.com/WICG/import-maps/issues/174)
- Import-maps are also governed by CSP
  - See also ["Supplying out-of-band metadata for each module"](https://github.com/WICG/import-maps/blb/master/README.md#supplying-out-of-band-metadata-for-each-module)

## single spa 如何写测试用例？
请参阅有关[单元测试](https://single-spa.js.org/docs/testing/units/)和[E2E测试](https://single-spa.js.org/docs/testing/e2e/)的文档。