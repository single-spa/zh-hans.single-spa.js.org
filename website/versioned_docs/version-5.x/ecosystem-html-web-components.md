---
id: ecosystem-html-web-components
title: single-spa-html
sidebar_label: HTML / Web Components
---

[single-spa-html](https://github.com/single-spa/single-spa-html) 是一个工具库，用于将原始 html 和 web components 包装为 single-spa 应用程序。

## 安装
```sh
npm install --save single-spa-html

# 或
yarn add single-spa-html
```

另外，可以将从CDN上引用 single-spa-html，作为一个全局变量：
```html
<script src="https://cdn.jsdelivr.net/npm/single-spa-html"></script>
```

注意，你可能需要将依赖包锁定到特定版本。请参阅[此处](https://cdn.jsdelivr.net/npm/single-spa-html)以了解如何执行此操作。

## 使用
### 通过 npm 方式

```js
import singleSpaHtml from 'single-spa-html';

const htmlLifecycles = singleSpaHtml({
  template: '<x-my-web-component></x-my-web-component>',
})

export const bootstrap = htmlLifecycles.bootstrap;
export const mount = htmlLifecycles.mount;
export const unmount = htmlLifecycles.unmount;
```

### 通过 cdn 方式
使用 CDN 方式引用的例子：

```js
const webComponentApp = window.singleSpaHtml.default({
  template: props => `<x-my-web-component attr="${props.attr}"></x-my-web-component>`,
})

singleSpa.registerApplication({
  name: 'name',
  app: webComponentApp,
  activeWhen: () => true
})
```

<<<<<<< HEAD
## API和配置项
调用 single-spa-html 时传入的参数对象包含以下属性：

- `template` (必需): HTML字符串或一个返回字符串的函数。如果是函数，这个函数会被传入 single-spa 自定义 props 作为参数并调用，返回的字符串会在 single-spa 的 mount 声明周期阶段被注入到 DOM 中。
- `domElementGetter` (可选): 函数，返回将注入 HTML 的 容器dom元素。如果省略，则会提供默认实现，即将模板使用一个 `div` 标签包裹，append 到 `document.body` 上。
=======
## API / Options
single-spa-html is called with an object that has the following properties:
- `template` (required): An HTML string or a function that returns a string or promise that resolves a string. The function will be called with the single-spa custom props. The returned string is injected into the DOM during the single-spa mount lifecycle.
- `domElementGetter` (optional): A function that is given the single-spa props and returns the dom element container into which the HTML will be injected. If omitted,
  a default implementation is provided that wraps the template in a `<div>` that is appended to `document.body`.
>>>>>>> e0fe4dc73a8dd72eb3e9e391c5f097af1805c4fa
