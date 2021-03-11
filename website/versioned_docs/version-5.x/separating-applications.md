---
id: separating-applications
title: 拆分应用
sidebar_label: 拆分应用
---

<<<<<<< HEAD
在大型微服务系统中，你的single-spa基础配置和每个应用程序都应该有自己的git仓库。如何在JavaScript项目中实现这一点暂无定论，因此下面列出了一些建议。

由于single-spa是一个有助于组织扩展的框架，因此了解如何将应用程序彼此分离是很重要的，这样开发人员和团队就可以在不相互干扰的情况下开发子应用。

大多数的微服务体系都鼓励独立的代码仓库、构建和部署。虽然 **single-spa不能解决如何托管、构建或部署** 代码的问题，但是这些问题与许多single-spa用户相关，因此这里讨论了一些策略。

#### 选择 1: 一个代码仓库, 一个build包

使用single-spa的最简单方法是拥有一个包含所有代码的仓库。通常，您只有一个package.json,一个的webpack配置，产生一个包，它在一个html文件中通过` <script> `标签引用。

优势:

- 最容易部署
- [单一版本（monorepo）控制的优点](https://danluu.com/monorepo/)

劣势:
- 对于每个单独的项目来说，一个Webpack配置和package.json意味着的灵活性和自由度不足。
- 当你的项目越来越大时，打包速度越来越慢。
- 构建和部署都是捆绑在一起的，这要求固定的发版计划，而不能临时发布。

#### 选择 2: NPM包

创建一个父应用，npm安装每个single-spa应用。每个子应用在一个单独的代码仓库中，负责每次更新时发布一个新版本。当single-spa应用发生更改时，根应用程序应该重新安装、重新构建和重新部署。

通常，single-spa应用分别使用babel或者webpack来编译。

请注意，您还可以使用[monorepo方法](https://medium.com/netscape/thecase-for-monorepos-907c1361708a)，该方法允许单独构建，而不需要单独的代码仓库。

优势:

- npm安装对于开发中更熟悉，易于搭建。
- 独立的npm包意味着，每个应用在发布到npm仓库之前可以分别打包。

劣势:

- 父应用必须重新安装子应用来重新构建或部署。
- 中等难度搭建。

#### 选择 3: 动态加载模块

创建一个父应用，允许子应用单独部署。为了实现这一点，创建一个manifest文件，当子应用部署更新时，它控制子应用的“上线”版本及加载的JavaScript文件。

改变每个子应用加载的JavaScript文件有很多的方法

1. Web服务器：在你的web服务器为每个子应用的正确版本创建一个动态脚本。
2. 使用[模块加载](https://www.jvandemo.com/a-10-minute-primer-to-javascript-modules-module-formats-module-loaders-and-module-bundlers/) 例如 [SystemJS](https://github.com/systemjs/systemjs) 可以在浏览器通过动态urls下载并执行JavaScript代码。

#### 对比

<style dangerouslySetInnerHTML={{__html: `
  .comparisonTable td {
    width: 25%;
  }
  .comparisonTable .middle {
    text-align: center;
    vertical-align: middle;
  }
  .comparisonTable ul {
    padding-left: 1em;
  }
`}}/>
<table className="comparisonTable">
  <caption>前端系统架构对比</caption>
  <thead>
    <tr>
      <th></th>
      <th scope="col" className="middle">Monorepo</th>
      <th scope="col" className="middle">NPM包</th>
      <th scope="col" className="middle">动态加载模块</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">搭建难度</th>
      <td className="middle">简单</td>
      <td className="middle">中等</td>
      <td className="middle">困难</td>
    </tr>
    <tr>
      <th scope="row">代码是否独立</th>
      <td className="middle">
        <span className="sr-text">No</span>
      </td>
      <td className="middle">
        <span className="sr-text">No</span>  
      </td>
      <td className="middle">
        <span role="img" aria-label="Yes">✅</span>
      </td>
    </tr>
    <tr>
      <th scope="row">分开构建</th>
      <td className="middle">
        <span className="sr-text">No</span>
      </td>
      <td className="middle">
        <span role="img" aria-label="Yes">✅</span>
      </td>
      <td className="middle">
        <span role="img" aria-label="Yes">✅</span>
      </td>
    </tr>
    <tr>
      <th scope="row">分别部署</th>
      <td className="middle">
        <span className="sr-text">No</span>
      </td>
      <td className="middle">
        <span role="img" aria-label="Yes">✅</span>
      </td>
      <td className="middle">
        <span role="img" aria-label="Yes">✅</span>
      </td>
    </tr>
    <tr>
      <th>例子</th>
      <td>
        <ul>
          <li>
            <a href="https://github.com/joeldenning/simple-single-spa-webpack-example">simple-webpack-example</a>
          </li>
          <li>
            <a href="https://github.com/single-spa/single-spa-examples">single-spa-examples</a>
          </li>
        </ul>
      </td>
      <td>
        <ul>
          <li>
            <a href="https://github.com/jualoppaz/single-spa-login-example-with-npm-packages">single-spa-login-example-with-npm-packages</a>
          </li>
        </ul>
      </td>
      <td>
        <ul>
          <li>
            <a href="https://gitlab.com/TheMcMurder/single-spa-portal-example">SystemJS example</a>
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
=======
In a large, microserviced system, your root single-spa configuration and each of the applications should probably have its own git repository. How to do that in a JavaScript project isn't necessarily clear, so some options are listed below.

Since single-spa is a framework that helps with organizational scaling, it is important to figure out how to split out and separate applications from each other so that developers and teams can work on the applications without interfering one another.

Most interpretations of microservice architecture encourage separate code repositories, builds, and deployments. Although **single-spa does not solve how code is hosted, built, or deployed**, these are relevant to many users of single-spa, so some strategies for doing so are discussed here.

#### Option 1: One code repo, one build

The simplest approach for using single-spa is to have one code repository with everything in it. Typically, you would have a single package.json with a single webpack config that produces a bundle that can be included in an HTML file with a `<script>` tag.

Advantages:

- Simplest to set up
- [monolithic version control has some advantages](https://danluu.com/monorepo/)

Disadvantages:
- One master Webpack config and package.json means less flexibility and freedom for each individual project
- Slow build times once your project gets large
- Builds and deployments are all tied together, which can necessitate fixed release schedules instead of ad hoc releases.

#### Option 2: NPM packages

Create a root application that npm installs each of the single-spa applications. Each child application is in a separate code repository and is responsible for publishing a new version everytime that it updates. The root application should reinstall, rebuild, and redeploy whenever a single-spa application changes.

Typically, the single-spa applications compile themselves separately with babel and/or webpack.

Advantages:

- npm install is familiar and easy to set up
- Separate npm packages means each application can build itself separately before publishing to npm

Disadvantages:

- The root application must reinstall the child applications in order to rebuild/redeploy
- Medium difficulty to set up

#### Option 3: Monorepos

Create a [monorepo](https://medium.com/netscape/the-case-for-monorepos-907c1361708a) with multiple SPAs in a single (mono) repo. 
This allows for separate builds and deployment without having separate code repositories.


#### Option 4: Dynamic Module Loading

Create a root application which can allow single-spa applications to deploy themselves separately. To do so,
create a manifest file that the single-spa applications update during their deployment process, which controls
which versions of the single-spa applications are "live". Then change which JavaScript file is loaded based on the manifest.

Changing which JavaScript file is loaded for each child application can be done in many ways.

1. Web server: have your webserver create a dynamic script tag for the "live" version of each single-spa application.
2. Use a [module loader](https://www.jvandemo.com/a-10-minute-primer-to-javascript-modules-module-formats-module-loaders-and-module-bundlers/) such as [SystemJS](https://github.com/systemjs/systemjs) that can download and execute JavaScript code in the browser from dynamic urls.

#### Comparison

|   | Separate code repositories possible | Independent CI builds | Separate deployments | Examples |
| - | ----------------------------------- | --------------- | -------------------- | -------- |
| NPM Packages | :white_check_mark: | :white_check_mark: | :x: | [1](https://github.com/jualoppaz/single-spa-login-example-with-npm-packages) |
| Monorepo | :x: | :white_check_mark: [1](https://medium.com/labs42/monorepo-with-circleci-conditional-workflows-69e65d3f1bd0) | :white_check_mark: [1](https://medium.com/labs42/monorepo-with-circleci-conditional-workflows-69e65d3f1bd0) | &mdash; |
| Module loading | :white_check_mark: | :white_check_mark: | :white_check_mark: | [1](https://github.com/react-microfrontends/) [2](https://github.com/vue-microfrontends/) [3](https://github.com/polyglot-microfrontends/) |
>>>>>>> 57aa93b31cc827abc7cd46bd123fc62a16e59790
