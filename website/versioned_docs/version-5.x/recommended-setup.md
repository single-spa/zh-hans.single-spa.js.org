---
id: recommended-setup
title: 推荐设置
sidebar_label: 概述
---

Single-spa NPM包并不是针对构建工具，CI流水线，或者开发环境工作工作流的某一个过程。而为了实现single-spa你需要设置这些配置（可能更多）。为了帮助您搞明白如何解决这些问题，single-spa核心团队推出了“推荐配置”，希望它能解决直接解决您实现微前端过程中的某些问题。

## 概述
我们建议使用浏览器内ES模块 + import maps (或者SystemJS填充这些，如果你需要更好的浏览器支持)的设置。这种设置有几个优点:

1. 公共模块易于管理，并且只下载一次。如果使用SystemJS，也可以预加载它们来提高速度。
2. 共享代码/函数/变量就像导入/导出一样简单，就像在一个整体中设置一样。
3. 延迟加载应用程序很容易，这使您能够加速初始加载时间。
4. 每个应用程序(又名微服务，又名ES模块)都可以独立开发和部署。团队可以按照自己的进度工作、实验(在组织定义的合理范围内)、QA和部署。这通常也意味着发布周期可以缩短到几天，而不是几周或几个月。
5. 很棒的开发人员体验(DX):转到dev环境并添加一个导入映射，该映射将应用程序的url指向您的本地主机。请参阅下面的章节了解详细信息。

## 其他选择

* [qiankun](https://github.com/umijs/qiankun) 是一个很不错的替代品。
* [Isomorphic Layout Composer](https://github.com/namecheap/ilc) - 一个将微前端组成部分支持SSR完整的解决方案。

## 运行时模块 vs. 构建时模块

教程视频: [Youtube](https://www.youtube.com/watch?v=Jxqiu6pdMSU&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=2) / [Bilibili](https://www.bilibili.com/video/av83498486/)

运行时模块，当被引用和导出时不会被构建工具编译，它直接被浏览器解析。它是与构建时模块的不同之处，他们在被浏览器解析前需要由node_modules提供并编译。

告诉webpack和rollup在构建期间保留一些依赖项，以便它们来自浏览器的方法是通过[webpack externals](https://webpack.js.org/configuration/externals/#root)和[rollup externals](https://rollupjs.org/guide/en/#external)。

以下是我们的推荐:

1. 每个single-spa应用程序都应该是一个浏览器内的Javascript模块
2. 大型共享依赖(比如react、vue或angular库)应该都是浏览器内的模块。
3. 其他的都应该是构建时模块。

## Import Maps

教程视频: [Youtube](https://www.youtube.com/watch?v=Lfm2Ge_RUxs&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=3) / [Bilibili](https://www.bilibili.com/video/av83617496/)

[Import Maps](https://github.com/WICG/import-maps)是一个浏览器规范，用于将某个URL起一个“Import specifier”的别名。
import specifier是指示要加载哪个模块的字符串。例子:

```js
// ./thing.js is the import specifier
import thing from './thing.js';

// react is the import specifier
import React from 'react';
```

不是URL的说明符称为“纯说明符”，如“import”react”。对于能够使用浏览器内模块来说，能够将裸说明符别名为URL是至关重要的，这就是存在导入映射的原因。

截止到2020年2月，import maps仅在Chrome中实现，并在开发者特性切换后实现。因此，您将需要一个polyfill使import maps正常工作。

## Module Federation

[模块联合](https://dev.to/marais/webpack-5-和module-feder-4j1i)是一种webpack-specific技术，用于共享[构建时模块](#in-browser- vs -build-time-modules)。它涉及到每个microfrontend捆绑它所有的依赖，甚至共享的依赖。这意味着每个共享依赖项都有多个副本——每个microfrontend一个。在浏览器中，共享依赖项的第一个副本将被下载，但随后的microfrontend将重用该共享依赖项，而不需要下载它们的副本。

注意，模块联合是一个新特性(在撰写本文时)，它要求您使用webpack@>=5(目前在beta版)。它仍然是一项不断发展的技术。

single-spa 是一种组织微前端路由的方案。模块联合是microfrontend的一种性能技术。它们相互补充很好，可以一起使用。 下面是一个社区成员发布的[YouTube视频](https://www.youtube.com/watch?v=wxnwPLLIJCY)，讨论了如何同时使用single-spa和模块联合。

使用模块联合，您必须选择如何加载microfrontend本身。single-spa核心团队建议使用SystemJS + import map作为微前端的模块加载器。 作为替代, 你可以使用全局变量和 `<script>` 标签。 一个使用SystemJS和模块联合加载微前端的例子在 https://github.com/ScriptedAlchemy/mfe-webpack-demo/pull/2.

The single-spa core team recommends choosing either import maps or module federation for your shared, third-party dependencies. We do not recommend sharing some third-party dependencies via import map and others via module federation. When choosing between the two approaches, we have a preference towards import maps, but no objection to module federation. See the [shared dependencies section](#shared-dependencies) for a comparison.

single-spa核心团队建议为共享的第三方依赖项选择import maps或模块联合。我们不建议通过import map共享一些第三方依赖项，另一些通过模块联合共享其他依赖项。在选择这两种方法时，我们倾向于import maps，但不反对模块联合。请参阅[共享依赖项部分](#shared-dependencies)进行比较。

## SystemJS

教程视频: [Youtube](https://www.youtube.com/watch?v=AmdKF2UhFzw&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=7) / [Bilibili](https://www.bilibili.com/video/av83620028/)

SystemJS为import maps和运行时模块提供了像polyfill一样行为。它不是导入映射的真正polyfill，这是由于JavaScript语言在polyfill导入说明符到url的解析方面的限制。

因为SystemJS只是像polyfill，你需要按照[System.register format](https://github.com/systemjs/systemjs/blob/master/docs/system-register.md)编译你的应用，而不是ESM format。这允许在不支持模块或importmaps的环境中完全模拟浏览器内的模块。

为了把你的代码编译成System.register format，需要设置webpack的[`output.libraryTarget`](https://webpack.js.org/configuration/output/#outputlibrarytarget) 为 `"system"`，或设置rollup的 [`format`](https://rollupjs.org/guide/en/#outputformat) 为`"system"`。

像React, Vue, and Angular这样的共享依赖，它们没有发布System.register versions的包，然而我们可以找到[the esm-bundle project](https://github.com/esm-bundle) ([blog post](https://medium.com/@joeldenning/an-esm-bundle-for-any-npm-package-5f850db0e04d))。或者，SystemJS能够通过[global loading](https://github.com/systemjs/systemjs -loader)或[AMD和namedexports extras](https://github.com/systemjs/systemjs#extras)加载它们。

SystemJS为导入映射提供polyfill行为的另一种选择是[es-module-shims](https://github.com/guybedford/es-module-shims)。这具有使用真正本机ES模块的优势。然而，这并不是single-spa核心团队推荐的用于生产应用程序的方法，因为它在浏览器解析和修改所有包时要求的性能较低。

## 懒加载

教程视频: [Youtube](https://www.youtube.com/watch?v=-LkvBMpCK-A&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=8) / [Bilibili](https://www.bilibili.com/video/av83620658/)

延迟加载是只下载用户当前页面所需的JavaScript代码，而不是预先下载所有JavaScript。它是一种通过减少最初加载页面时产生有意义呈现的时间来提高应用程序性能的技术。如果你使用[single-spa加载函数](/docs/configuration#loading-function-or-application)，你已经为你的应用程序和包裹内置了延迟加载。由于应用程序是一个“浏览器内模块”，这意味着你只在需要时下载导入映射中的浏览器内模块。

通常，single-spa加载函数提供的基于路由的延迟加载是确保良好性能所需要的全部。但是，也可以通过“代码拆分”来使用bundler (webpack或rollup)进行延迟加载。有关webpack代码拆分的文档，请参见[这些文档](https://webpack.js.org/guides/code-splitting/#dynamic-imports)。对于single-spa应用程序中的代码分割，建议使用动态导入(' import() ')而不是多个入口点。要使代码分割正常工作，您需要[动态设置您的公共路径](https://webpack.js.org/guides/public-path/#on-the-fly)。有一个工具可以帮助您正确地设置与systemjs一起使用的公共路径 - https://github.com/joeldenning/systemjs-webpack-interop。

## 本地开发

教程视频: [Youtube](https://www.youtube.com/watch?v=vjjcuIxqIzY&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=4) / [Bilibili](https://www.bilibili.com/video/av83617789/)

与整体前端应用程序相比，single-spa的本地开发鼓励只运行您正在开发的一个microfrontend，而使用其他所有microfrontend的部署版本。这一点很重要，因为每次您想要做任何事情时运行每个single-spa microfrontend都是非常笨拙和麻烦的。

为了一次只完成一个微前端的本地开发，我们可以在导入映射中定制该微前端的URL。例如，如下的import map 设置了`navbar`应用本地开发，因为它是唯一指向本地web服务器的应用，而`planets` 和 `things`都指向已部署的应用版本。

```json
{
  "imports": {
    "@react-mf/navbar": "https://localhost:8080/react-mf-navbar.js",
    "@react-mf/planets": "https://react.microfrontends.app/planets/2717466e748e53143474beb6baa38e3e5320edd7/react-mf-planets.js",
    "@react-mf/things": "https://react.microfrontends.app/things/7f209a1ed9ac9690835c57a3a8eb59c17114bb1d/react-mf-things.js"
  }
}
```

有一个名为[import-map-overrides](https://github.com/joeldenning/import-map-overrides)的工具可以通过浏览器内的UI定制导入地图。该工具将自动允许您在本地主机和部署版本之间切换一个或多个微前端。

此外，您还可以选择在本地运行single-spa基础配置，或者使用在已部署环境上运行的single-spa配置。single-spa核心团队发现在部署的环境(可能是在您的组织中运行的“集成”、“开发”或“暂存”环境)上开发是最容易的，因此您不必经常运行signle-spa基础配置。

## 构建工具 (Webpack / Rollup)

教程视频: [Youtube](https://www.youtube.com/watch?v=I6COIg-2lyM&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=9) / [Bilibili](https://www.bilibili.com/video/av84104639/)

强烈建议使用bundler，如webpack、rollup、parceljs、pikapack等。Webpack是将许多JavaScript源文件编译成一个或多个产品JavaScript包的行业标准。

下面是一些配置您的bundler使其可被SystemJS和single-spa使用的技巧。注意，如果你使用[create-single-spa](/docs/create-single-spa)，这些都是为你设置的。我们把这些指示留在这里，不是为了让你在webpack配置方面不知所措，而是为了帮助你，如果你选择不使用creite-single-spa的话。

<<<<<<< HEAD
1. 将输出目标设置为“system”。在webpack中，这是通过[`output.libraryTarget`](https://webpack.js.org/configuration/output/#outputlibrarytarget)完成的。
2. 使用一个单独的[入口点](https://webpack.js.org/concepts/entry-points/#root)和[dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports)来完成任何你想完成的代码分割。这很符合single-spa核心团队鼓励的“一个捆绑项目是一个运行时模块”理念。
3. 不要使用webpack的[`optimization`](https://webpack.js.org/configuration/optimization/#root)配置选项，因为它们会使输出的JavaScript文件难以作为一个单一的浏览器内JavaScript模块加载。这样做并不会降低bundle的优化程度 - 动态导入是实现优化bundle的可行策略。
4. Follow [the systemjs docs for webpack](https://github.com/systemjs/systemjs#compatibility-with-webpack).
5. 使用 [systemjs-webpack-interop](https://github.com/joeldenning/systemjs-webpack-interop) 来创建或验证你的webpack配置。
6. 使用 [systemjs-webpack-interop](https://github.com/joeldenning/systemjs-webpack-interop) 来 [运行时设置webpack public path](https://webpack.js.org/guides/public-path/#on-the-fly).
7. 不要设置 [`output.library`](https://webpack.js.org/configuration/output/#outputlibrary)。 SystemJS 不需要一个名称，事实上在没有更多配置的情况下也不支持具名模块。
8. 考虑关闭 [webpack hashing](https://webpack.js.org/configuration/output/#outputfilename) 为入口文件和fbundles。在部署microfrontend期间通过CI环境变量添加commit hash通常更容易。
9. 设置webpack-dev-server不要检查hosts ([docs](https://webpack.js.org/configuration/dev-server/#devserverdisablehostcheck)).
10. 通过设置 `{headers: {'Access-Control-Allow-Origin': '*'}}`. ([docs](https://stackoverflow.com/questions/31602697/webpack-dev-server-cors-issue)) 为webpack-dev-server 开启CORS。
11. 如果开发需要HTTPS [configure webpack-dev-server for HTTPS](https://webpack.js.org/configuration/dev-server/#devserverhttps). 也可使用 [trusting SSL certificates from localhost](https://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate).
12. 确保[webpack externals](https://webpack.js.org/configuration/externals/#root) 是配置正确并共享的运行时模块。
13. 设置 [output.jsonpFunction](https://webpack.js.org/configuration/output/#outputjsonpfunction) 为一个本项目唯一的字符串。因为你会有很多webpack bundles会同时在同一个浏览器tab里运行， jsonpFunction的碰撞可能会导致webpack模块在bundle之间混合。
14. 设置 [sockPort](https://webpack.js.org/configuration/dev-server/#devserversockport), [sockPath](https://webpack.js.org/configuration/dev-server/#devserversockpath), 和 [sockHost](https://webpack.js.org/configuration/dev-server/#devserversockhost) 在你的 `devServer` 设置中。
=======
1. Set the output target to `system`. In webpack, this is done via [`output.libraryTarget`](https://webpack.js.org/configuration/output/#outputlibrarytarget)
1. Use a single [entry point](https://webpack.js.org/concepts/entry-points/#root), with [dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports) for any code splitting that you'd like to accomplish. This best matches the "one bundled project = one in-browser module" paradigm encouraged by the single-spa core team.
1. Do not use webpack's [`optimization`](https://webpack.js.org/configuration/optimization/#root) configuration options, as they make it harder to load the outputted JavaScript files as a single in-browser JavaScript module. Doing so does not make your bundle less optimized - dynamic imports are a viable strategy for accomplishing optimized bundles.
1. Follow [the systemjs docs for webpack](https://github.com/systemjs/systemjs#compatibility-with-webpack).
1. Consider using [systemjs-webpack-interop](https://github.com/joeldenning/systemjs-webpack-interop) to create or verify your webpack config.
1. Use [systemjs-webpack-interop](https://github.com/joeldenning/systemjs-webpack-interop) to [set your webpack public path "on the fly"](https://webpack.js.org/guides/public-path/#on-the-fly).
1. Do not set webpack [`output.library`](https://webpack.js.org/configuration/output/#outputlibrary). SystemJS does not need a name, and in fact does not support named modules without additional configuration.
1. Consider turning off [webpack hashing](https://webpack.js.org/configuration/output/#outputfilename) for both entry and code split bundles. It is often easier to add in a commit hash during deployment of your microfrontend via your CI environment variables.
1. Configure webpack-dev-server to not do host checks. ([docs](https://webpack.js.org/configuration/dev-server/#devserverdisablehostcheck)).
1. Configure webpack-dev-server for CORS by setting `{headers: {'Access-Control-Allow-Origin': '*'}}`. ([docs](https://stackoverflow.com/questions/31602697/webpack-dev-server-cors-issue))
1. If developing on https, [configure webpack-dev-server for HTTPS](https://webpack.js.org/configuration/dev-server/#devserverhttps). Also consider [trusting SSL certificates from localhost](https://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate).
1. Make sure that your [webpack externals](https://webpack.js.org/configuration/externals/#root) are correctly configured for any shared, in-browser modules that you are importing.
1. Set [output.jsonpFunction](https://webpack.js.org/configuration/output/#outputjsonpfunction) to be a unique string for this project. Since you'll have multiple webpack bundles running in the same browser tab, a collision of the `jsonpFunction` could result in webpack modules getting mixed between bundles.
1. Set [sockPort](https://webpack.js.org/configuration/dev-server/#devserversockport), [sockPath](https://webpack.js.org/configuration/dev-server/#devserversockpath), and [sockHost](https://webpack.js.org/configuration/dev-server/#devserversockhost) inside of your `devServer` configuration.
1. For webpack, set [`output.devtoolNamespace`](https://webpack.js.org/configuration/output/#outputdevtoolnamespace) to your MFE's name. This helps namespace your sourcemaps to each MFE.
>>>>>>> 7ee3e839dbf58f6bd720111fea001ddb6b04c113

更多关于webpack代码拆分的信息请见[the code splits FAQ](/docs/faq#code-splits).

## 通用模块 (样式指南, API等等)

“通用模块”是一个运行时的JavaScript模块，它不是一个single-spa应用程序或parcel。换句话说，它的唯一目的是为其他微前端导出要导入的功能。

实用程序模块的常见示例包括样式指南、身份验证助手和API助手。这些模块不需要向single-spa注册，但是对于维护几个single-spa应用程序和parcel之间的一致性非常重要。

通用模块中的示例代码:
```js
// In a repo called "api", you may export functions from the repo's entry file.
// These functions will be available to single-spa application, parcels, and other in-browser modules
// via an import statement.

export function authenticatedFetch(url, init) {
  return fetch(url, init).then(r => {
    // Maybe do some auth stuff here
    return r.json()
  })
}
```

在single-spa应用中引用的实例代码:
```js
// Inside of a single-spa application, you can import the functions from the 'api' repo
import React from 'react'
import { authenticatedFetch } from '@org-name/api';

export function Foo(props) {
  React.useEffect(() => {
    const abortController = new AbortController()
    authenticatedFetch(`/api/clients/${props.clientId}`, {signal: abortController.signal})
    .then(client => {
      console.log(client)
    })

    return () => {
      abortController.abort()
    }
  }, [props.clientId])

  return null
}
```

要使通用模块工作，你必须确保你的webpack externals和import map正确配置。使用样式指南的一个例子可以在https://github.com/vue-microfrontends/styleguide上找到。

## 共享依赖

为了提高性能，web应用程序只加载一次大型JavaScript库是至关重要的。你选择的框架(React, Vue, Angular等)应该只在页面上加载一次。

不建议把所有东西都变成共享依赖项，因为当每个微前沿需要升级时共享依赖项必须立即升级。对于小型库，在使用它们的每个微前端中重复加载它们是可以接受的。例如，react-router可能足够小，可以重复，当您想一次升级一个微前端路由时，这是很好的。然而，对于像react、momentjs、rxjs等大型库，你可以考虑让它们共享依赖。

有两种共享依赖关系的方法:

1. [运行时import maps](#import-maps)
2. [构建时module federation](#module-federation)

你可以用其中一个，也可以两者都用。我们目前建议只使用导入映射，但我们也不反对模块联合。

### 两种方案对比

| 方案          | 共享依赖 | 打包依赖 |  依赖管理 |
| ----------------- | ------------------ | -------------------- | ---------------------- |
| Import Maps       | 完全支持    | 任何包          | [共享依赖demo](https://github.com/polyglot-microfrontends/shared-dependencies/blob/master/importmap.json) |
| 模块联合 | 完全支持    | 只支持webpack@>=5     | [多个webpack配置](https://github.com/ScriptedAlchemy/mfe-webpack-demo/blob/f48ff0bd0b7d62b722ea000e5ded73f0d076a0b7/packages/01-host/webpack.config.js#L47) |

### 使用Import Maps共享

使用[Import Maps](#import-maps)共享依赖，你可以使用[webpack externals](https://webpack.js.org/configuration/externals/#root), [rollup externals](https://rollupjs.org/guide/en/#external),或者类似配置，使依赖包作为外部依赖，告诉你的应用不在node_modules里寻找，而是去运行时的模块中寻找。

To make the shared dependencies available as in-browser modules, they must be present in your import map. A good way of managing them is to create a repository called `shared-dependencies` that has a partial import map in it. The CI process for that repository updates your deployed import map. Upgrading the shared dependencies can then be achieved by making a pull request to that repository.

要使共享依赖项作为运行时模块可用，它们在import map中。管理它们的一个好方法是创建一个名为“共享依赖”的存储库，其中有部分import map。存储库的CI流程更新已部署的import map。然后可以通过向存储库发出拉请求来升级共享依赖项。

不是所有的模块都发布SystemJs格式的包，这种情况下，可以先查看https://github.com/esm-bundle 有没有SystemJs的版本，或者在[SystemJS extras](https://github.com/systemjs/systemjs#extras)查找适合UMD格式的包。

在 https://github.com/polyglot-microfrontends/shared-dependencies 网址下，每一个依赖共享仓库都有一个可用的CI，

### 模块联合共享

At the time of this writing, module federation is new and still changing. Check out [this example repo](https://github.com/joeldenning/mfe-webpack-demo/tree/system) which uses systemjs to load the microfrontends, but module federation to share `react`, `react-dom`, and `react-router`.

在撰写本文时，模块联合还是一个新事物，而且还在不断变化。看看[这个示例repo](https://github.com/joeldenning/mfe webpack-demo/tree/system)，它使用systemjs加载微前端，但是模块联合来共享`react`, `react-dom`, 和 `react-router`

## 部署和持续集成 (CI)

教程视频 (Part 1): [Youtube](https://www.youtube.com/watch?v=QHunH3MFPZs&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=5) / [Bilibili](https://www.bilibili.com/video/av84100303/)

教程视频 (Part 2): [Youtube](https://www.youtube.com/watch?v=nC7rpDXa4B8&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=6) / [Bilibili](https://www.bilibili.com/video/av84099642/)

[CI配置文件阳历](https://github.com/single-spa/import-map-deployer/tree/master/examples)

微前端是完全独立地构建和部署的。这意味着git存储库、CI、构建和部署都无需通过集中式存储库。由于这个原因，不鼓励使用一个大项目，因为对于这样项目中的所有包，可能只有一个CI。

有两个步骤即可部署微前端：

1. 上传生产JavaScript包到web服务器或CDN，我们鼓励使用诸如AWS S3 + Cloudfront、谷歌云存储、Microsoft Azure存储、Digital Ocean space等CDN，因为它们具有优越的可用性、缓存和性能。您上传的JavaScript文件是完全静态的。鼓励总是向CDN写入新文件，而不是覆盖文件。

2. 更新import map指向新部署文件。

<<<<<<< HEAD
第一步的实现依赖你所使用的CDN，AWS CLI ([`aws s3 sync`](https://docs.aws.amazon.com/cli/latest/reference/s3/)), Google gsutil ([`gsutil cp`](https://github.com/single-spa/import-map-deployer/blob/master/examples/ci-for-javascript-repo/gitlab-gcp-storage/.gitlab-ci.yml)) 等等都很方便的实现这些功能。
=======
Microfrontends are built and deployed completely independently. This means that the git repository, CI, build, and deployments all occur without going through a centralized repository. For this reason, monorepos are not encouraged for microfrontends. CI for monorepos can be configured to only build and deploy the packages that have changed but it is often more complex. Modern CI platforms such as [AWS Amplify](https://aws.amazon.com/blogs/mobile/set-up-continuous-deployment-and-hosting-for-a-monorepo-with-aws-amplify-console/) and [Vercel](https://vercel.com/blog/monorepos) are starting to have built-in support for monorepos however.
>>>>>>> 7ee3e839dbf58f6bd720111fea001ddb6b04c113

对于第二步的实现，你可以有以下选择：

a) 你的CI可以发送`curl` HTTP请求一个执行的[import-map-deployer](https://github.com/single-spa/import-map-deployer)实例, 它可以可靠的，并发的更新import map.
b) 你的CI机器可以下载import map, 修改后再上传。

a)的优势在于同时部署的多个请求的并发是很安全的，如果没有并发的解决方案，会造成多个程序同时下载和上传import map，它会导致谁快谁赢的竞速情况，即当一个CI成功更新后，另一个CI会基于旧版本来覆盖import map。

b)的优势在于它不需要一个机器执行生产环境的import-map-deployer，最终，你应该选择对你的组织有意义的任何选项。

## 应用 vs. parcels vs. 通用模块

Single-spa 有微前端的[不同目录](/docs/microfrontends-concept#types-of-microfrontends)。在何处和如何使用他们，决定权在于你。然而，single-spa核心团队有如下推荐：

**多用基于路由的single-spa应用, 少用 single-spa parcels**

1. 首选按路由而不是按路由中的组件拆分微前端。 这意味着在可能的情况下，首选single-spa应用程序而不是single-spa parcels。 原因是路由之间的转换通常涉及破坏和重新创建大多数UI状态，这意味着位于不同路由上的single-spa应用程序无需共享UI状态。
2. 将固定的导航菜单移至其自己的single-spa应用程序中时，要使自己的[激活函数](/docs/configuration#activity-function)默认激活, 除此之外只有在登录页才需要卸载。
3. 为你核心的组件，样式，权限和全局错误处理新增通用模块。
4. 如果你只使用一个框架，尽可能使用框架组件(例如 React, Vue, and Angular 组件)而不是single-spa parcels。这是因为框架组件之间的互操作比有single-spa包的中间层时更容易。 您应该只在需要使用多个框架时创建single-spa parcels，在多个single-spa应用程序之间导入组件。

## 应用内通信

*一个好的体系结构是将微前端解耦，并且不需要频繁通信。遵循上面关于应用程序与parces的指导原则，可以帮助您保持微前端的解耦。基于路由的single-spa应用程序本质上需要较少的应用程序间通信。*

微前端直接通信的可能有三样东西：

1. 方法，组件，逻辑，全局状态
2. API数据
3. UI状态

### 方法，组件，逻辑，全局状态

例子 - [导出一个共享的组件](https://github.com/vue-microfrontends/styleguide/blob/af3eaa70bec7daa74635eb3ec76140fb647b0b14/src/vue-mf-styleguide.js#L5) 和 [导入一个共享的组件](https://github.com/vue-microfrontends/rate-dogs/blob/fe3196234b9cbd6d627199b03a96e7b5f0285c4b/src/components/rate-dogs.vue#L25).

你可以在不同git仓库或JS包的微前端之间导入或导出方法，组件，逻辑，全局状态：

```js
// Inside of a utility module called @org-name/auth
export function userHasAccess(permission) {
  return loggedInUser.permissions.some(p => p === permission);
}
```

```js
import { userHasAccess } from '@org-name/auth'

// Inside of a single-spa application, import and use a util function from a different microfrontend
const showLinkToInvoiceFeature = userHasAccess('invoicing');
```

### API数据

例子 - [导出一个`fetchWithCache` 方法](https://github.com/react-microfrontends/api/blob/c3c336129e920bbc6137f04cce24b718105efed1/src/react-mf-api.js#L3) and [导入方法](https://github.com/react-microfrontends/people/blob/ad18de9b96b52e6975244e6662becfe13e41a2db/src/utils/api.js#L1).

API数据通常不需要在microfrontend之间共享，因为每个单独的spa应用程序控制不同的路由，而不同的路由通常有不同的数据。然而，有时您确实需要在microfrontend之间共享API数据。API对象的内存中的JavaScript缓存是一些公司用来解决这个问题的解决方案。对于React用户，这类似于带Suspense的数据获取，其中路由的获取逻辑是从使用数据的组件代码中分离出来的。
```js
// Inside of your api utility module, you can lazily fetch data either when another microfrontend calls your exported
// functions, or eagerly fetch it when the route changes.
let loggedInUserPromise = fetch('...').then(r => {
  if (r.ok) {
    return r.json()
  } else {
    throw Error(`Error getting user, server responded with HTTP ${r.status}`)
  }
})

export function getLoggedInUser() {
  return loggedInUserPromise;
}
```

```js
import { getLoggedInUser } from '@org-name/api';

// Inside of app1, you can import something from an "api" utility module
getLoggedInUser().then(user => {
  console.log('user', user);
});
```

### UI状态

*如果两个微前端经常在彼此之间传递状态，可以考虑合并它们。当你的microfrontend不是孤立的模块时，它的缺点就会被放大*

比如“是模态打开的”、“输入的当前值是多少”等等的UI状态，基本上不需要在微前端之间共享。如果您发现自己需要不断共享UI状态，那么您的微前端可能拆分的太多了。考虑将它们合并。

在极少的情况下在需要在singlespa应用程序之间共享UI状态，可以使用event emitter来实现。下面是一些event emitter的例子，可能会对你有所帮助。

1. Observables / Subjects (rxjs) - 一个微前端发布一个新值到一个可以被其他微前端消费的流对象，它可以向所有的微前端应用暴露出来以便其他应用可以订阅。
2. CustomEvents - browsers have a built-in event emitter system that allows you to fire custom events. Check out [this documentation](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) for more information. Firing the events with `window.dispatchEvent` allows you to subscribe in any other microfrontend with `window.addEventListener`.
2. CustomEvents - 浏览器有一个内置的事件发射器系统，允许你触发自定义事件。查看[此文档](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)以获得更多信息。`window.dispatchEvent`事件允许任何其他的微前端通过`window.addEventListener`订阅。
3. 其他订阅发布系统。

## 状态管理

Single-spa核心团队警告不要使用redux、mobx和其他全局状态管理库。然而，如果您想使用状态管理库，我们建议您将状态管理工具保持为特定于单个仓库/微前端，而不是为所有的微前端应用存储。原因是，如果它们都必须使用全局存储，那么微前端就不是真正的解耦。如果它们依赖全局状态或其他应用的特性行为，你不能独立的部署某一个微前端应用，所以你需要思考是否需要改变全局存储向前或向后的兼容性是否需要调整。另外，在路由转换期间管理全局状态足够困难，而不会导致多个微前端复杂和消耗全局状态。

Single-spa核心团队推荐使用组件状态或微前端应用级别状态来代替全局状态，查看“应用内通信”获取更多信息。
