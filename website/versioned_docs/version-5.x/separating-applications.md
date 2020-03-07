---
id: separating-applications
title: 拆分应用
sidebar_label: 拆分应用
---

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
