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

更多关于webpack代码拆分的信息请见[the code splits FAQ](/docs/faq#code-splits).

## Utility modules (styleguide, API, etc)

A "utility module" is an in-browser JavaScript module that is not a single-spa application or parcel. In other words, it's only purpose is to export functionality for other microfrontends to import.

Common examples of utility modules include styleguides, authentication helpers, and API helpers. These modules do not need to be registered with single-spa, but are important for maintaining consistency between several single-spa applications and parcels.

Example code in a utility module:
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

Example code in a single-spa application that is using the utility module:
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

To make utility modules work, you must ensure that your webpack externals and import map are properly configured. An example of a working styleguide may be found at https://github.com/vue-microfrontends/styleguide.

## Shared dependencies

For performance, it is crucial that your web app loads large JavaScript libraries only once. Your framework of choice (React, Vue, Angular, etc) should only be loaded on the page a single time.

It is not advisable to make everything a shared dependency, because shared dependencies must be upgraded at once for every microfrontend that uses them. For small libraries, it is likely acceptable to duplicate them in each microfrontend that uses them. For example, react-router is likely small enough to duplicate, which is nice when you want to upgrade your routing one microfrontend at a time. However, for large libraries like react, momentjs, rxjs, etc, you may consider making them shared dependencies.

There are two approaches to sharing dependencies:

1. [In-browser modules with import maps](#import-maps)
2. [Build-time modules with module federation](#module-federation)

You may use either one, or both. We currently recommend only using import maps, although we have no objection to module federation.

### Comparison of approaches

| Approach          | Share dependencies | Bundler requirements |  Managing dependencies |
| ----------------- | ------------------ | -------------------- | ---------------------- |
| Import Maps       | Fully supported    | Any bundler          | [shared dependecies repo](https://github.com/polyglot-microfrontends/shared-dependencies/blob/master/importmap.json) |
| Module Federation | Fully supported    | Only webpack@>=5     | [multiple webpack configs](https://github.com/ScriptedAlchemy/mfe-webpack-demo/blob/f48ff0bd0b7d62b722ea000e5ded73f0d076a0b7/packages/01-host/webpack.config.js#L47) |

### Sharing with Import Maps

To share a dependency between microfrontends with [Import Maps](#import-maps), you should use [webpack externals](https://webpack.js.org/configuration/externals/#root), [rollup externals](https://rollupjs.org/guide/en/#external), or similar. Marking libraries as external tells your bundler to not use the version in your node_modules, but rather to expect the library to exist as an in-browser module.

To make the shared dependencies available as in-browser modules, they must be present in your import map. A good way of managing them is to create a repository called `shared-dependencies` that has a partial import map in it. The CI process for that repository updates your deployed import map. Upgrading the shared dependencies can then be achieved by making a pull request to that repository.

Not all libraries publish their code in a suitable format for SystemJS consumption. In those cases, check https://github.com/esm-bundle for a SystemJS version of those libraries. Alternatively, you may use [SystemJS extras](https://github.com/systemjs/systemjs#extras) to support UMD bundles, which are often available.

An example of a shared-dependencies repo, along with a functioning CI process for it, can be found at https://github.com/polyglot-microfrontends/shared-dependencies.

### Sharing with Module Federation

At the time of this writing, module federation is new and still changing. Check out [this example repo](https://github.com/joeldenning/mfe-webpack-demo/tree/system) which uses systemjs to load the microfrontends, but module federation to share `react`, `react-dom`, and `react-router`.

## Deployment and Continuous Integration (CI)

Tutorial video (Part 1): [Youtube](https://www.youtube.com/watch?v=QHunH3MFPZs&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=5) / [Bilibili](https://www.bilibili.com/video/av84100303/)

Tutorial video (Part 2): [Youtube](https://www.youtube.com/watch?v=nC7rpDXa4B8&list=PLLUD8RtHvsAOhtHnyGx57EYXoaNsxGrTU&index=6) / [Bilibili](https://www.bilibili.com/video/av84099642/)

[Example CI configuration files](https://github.com/single-spa/import-map-deployer/tree/master/examples)

Microfrontends are built and deployed completely independently. This means that the git repository, CI, build, and deployments all occur without going through a centralized repository. For this reason, monorepos are not encouraged for microfrontends since monorepos may only have one CI for all of the packages in the repo.

There are two steps to deploying a microfrontend.

1. Uploading production JavaScript bundles to a web server / CDN. It is encouraged to use a CDN such as AWS S3 + Cloudfront, Google Cloud Storage, Microsoft Azure Storage, Digital Ocean Spaces, etc because of their superior availability, caching, and performance due to edge locations. The JavaScript files that you upload are completely static. It is encouraged to always write new files to the CDN instead of overwriting files.
2. Updating your import map to point to the newly deployed file.

The implementation of Step 1 is dependent on the infrastructure you're using for your CDN. The AWS CLI ([`aws s3 sync`](https://docs.aws.amazon.com/cli/latest/reference/s3/)), Google gsutil ([`gsutil cp`](https://github.com/single-spa/import-map-deployer/blob/master/examples/ci-for-javascript-repo/gitlab-gcp-storage/.gitlab-ci.yml)), etc are easy ways of accomplishing this.

For the implementation of Step 2, you have a choice:

a) Your CI makes a `curl` HTTP call to a running instance of [import-map-deployer](https://github.com/single-spa/import-map-deployer), which updates the import map in a concurrent-safe way.
b) Your CI runner pulls down the import map, modify it, and reuploads it.

The advantage of a) is that it is concurrent-safe for multiple, simultaneous deployments. Without a concurrent-safe solution, there might be multiple processes pulling down and reuploading the import map at the same time, which could result in a race condition where one CI process thinks it successfully updated the import map when in reality the other CI process wrote the import map later, having based its changes on a stale version of the import map.

The advantage of b) is that it doesn't require running the import-map-deployer in your production environment. Ultimately, you should choose whichever option makes sense for your organization.

## Applications versus parcels versus utility modules

Single-spa has [different categories](/docs/microfrontends-concept#types-of-microfrontends) of microfrontends. It is up to you where and how you use each of them. However, the single-spa core team recommends the following:

**Many route-based single-spa applications, very few single-spa parcels**

1. Prefer splitting microfrontends by route, instead of by components within a route. This means preferring single-spa applications over single-spa parcels whenever possible. The reason for this is that transitions between routes often involve destroying and recreating most UI state, which means your single-spa applications on different routes do not need to ever share UI state.
2. Move fixed navigation menus into their own single-spa applications. Implement their [activity functions](/docs/configuration#activity-function) to be active by default, only unmounting for the login page.
3. Create utility modules for your core component library / styleguide, for shared authentication / authorization code, and for global error handling.
4. If you are only using one framework, prefer framework components (i.e. React, Vue, and Angular components) over single-spa parcels. This is because framework components interop easier with each other than when there is an intermediate layer of single-spa parcels. You can import components between single-spa applications You should only create a single-spa parcel if you need it to work with multiple frameworks.

## Inter-app communication

*A good architecture is one in which microfrontends are decoupled and do not need to frequently communicate. Following the guidelines above about applications versus parcels helps you keep your microfrontends decoupled. Route-based single-spa applications inherently require less inter-app communication.*

There are three things that microfrontends might need to share / communicate:

1. Functions, components, logic, and environment variables.
2. API data
3. UI state

### Functions, components, logic, and environment variables

Example - [exporting a shared component](https://github.com/vue-microfrontends/styleguide/blob/af3eaa70bec7daa74635eb3ec76140fb647b0b14/src/vue-mf-styleguide.js#L5) and [importing a shared component](https://github.com/vue-microfrontends/rate-dogs/blob/fe3196234b9cbd6d627199b03a96e7b5f0285c4b/src/components/rate-dogs.vue#L25).

You can import and export functions, components, logic, and environment variables between your microfrontends that are in different git repos and JavaScript bundles:

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

### API Data

Example - [exporting a `fetchWithCache` function](https://github.com/react-microfrontends/api/blob/c3c336129e920bbc6137f04cce24b718105efed1/src/react-mf-api.js#L3) and [importing the function](https://github.com/react-microfrontends/people/blob/ad18de9b96b52e6975244e6662becfe13e41a2db/src/utils/api.js#L1).

API data often does not need to be shared between microfrontends, since each single-spa application controls different routes and different routes often have different data. However, occasionally you do need to share API data between microfrontends. An in-memory JavaScript cache of API objects is a solution used by several companies to solve this. For React users, this is similar to Data Fetching with Suspense, where the fetching logic for routes is split out from the component code that uses the data.

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

### UI State

*If two microfrontends are frequently passing state between each other, consider merging them. The disadvantages of microfrontends are enhanced when your microfrontends are not isolated modules.*

UI State, such as "is the modal open," "what's the current value of that input," etc. largely does not need to be shared between microfrontends. If you find yourself needing constant sharing of UI state, your microfrontends are likely more coupled than they should be. Consider merging them into a single microfrontend.

Under the rare circumstances where you do need to share UI state between single-spa applications, an event emitter may be used to do so. Below are a few examples of event emitters that might help you out.

1. Observables / Subjects (rxjs) - one microfrontend emits new values to a stream that can be consumed by any other microfrontend. It exports the observable to all microfrontends from its in-browser module, so that others may import it.
2. CustomEvents - browsers have a built-in event emitter system that allows you to fire custom events. Check out [this documentation](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) for more information. Firing the events with `window.dispatchEvent` allows you to subscribe in any other microfrontend with `window.addEventListener`.
3. Any other pub/sub event emitter system.

## State management

The single-spa core team cautions against using redux, mobx, and other global state management libraries. However, if you'd like to use a state management library, we recommend keeping the state management tool specific to a single repository / microfrontend instead of a single store for all of your microfrontends. The reason is that microfrontends are not truly decoupled or framework agnostic if they all must use a global store. You cannot independently deploy a microfrontend if it relies on the global store's state to be a specific shape or have specific actions fired by other microfrontends - to do so you'd have to think really hard about whether your changes to the global store are backwards and forwards compatible with all other microfrontends. Additionally, managing global state during route transitions is hard enough without the complexity of multiple microfrontends contributing to and consuming the global state.

Instead of a global store, the single-spa core team recommends using local component state for your components, or a store for each of your microfrontends. See the above section "Inter-app communication" for more related information.
