---
id: ecosystem-vue
title: single-spa-vue
sidebar_label: Vue
---

single-spa-vue是一个针对vue项目的初始化、挂载、卸载的库函数，可以实现[single-spa注册的应用](configuration#registering-applications)、[生命周期函数](building-applications.md#registered-application-lifecycle)等功能，详情请查看[single-spa-vue的github](https://github.com/single-spa/single-spa-vue)。

## 入门案例

先看一个功能完整的案例 [coexisting-vue-microfrontends](https://github.com/joeldenning/coexisting-vue-microfrontends).

## 功能更加丰富的案例

https://coexisting-vue-microfrontends.surge.sh

## 安装

### 使用Vue CLI的项目

[vue-cli-plugin-single-spa](https://github.com/single-spa/vue-cli-plugin-single-spa) 将会把所有的事情都做好.

```sh
vue add single-spa
```

这个CLI（控制台命令行接口）插件将会做下面的事情:

1. 修改webpack配置，从而使你的项目适用于一个single-spa项目或是一个子应用。
2. 安装[single-spa-vue](https://github.com/single-spa/single-spa-vue).
3. 修改你的`main.js`或`main.ts`文件，从而使你的项目适用于一个single-spa项目或是一个子应用。
4. 添加`set-public-path.js`，从而有序地使用`systemjs-webpack-interop`来设置你的应用的public path。

### 没有使用Vue CLI的项目

```sh
npm install --save single-spa-vue
```
你可以通过选择引入`<script src="https://unpkg.com/single-spa-vue"></script>`到你的html文件中，就可以得到`singleSpaVue`全局变量

## 用法

如果没有安装过的话，请安装`systemjs-webpack-interop`。

`npm install systemjs-webpack-interop -S`

在和项目目录同级的位置新建`set-public-path.js`文件作为你的`main.js/ts`

```js
import { setPublicPath } from 'systemjs-webpack-interop';

setPublicPath('appName');
```

请注意，如果您使用的是Vue CLI插件，则将使用此代码自动更新您的 `main.ts` 或 `main.js` 文件，并且将自动创建set-public-path.js 文件, 应用名称是 package.json 里面的 name 值 。

如果你想要获取到vue实例做一些操作，你可以通过如下指引修改mount方法。mount方法将会以Promise的形式返回Vue对象，该功能仅限于[v1.6.0](https://github.com/single-spa/single-spa-vue/releases/tag/v1.6.0)版本之后

```js
const vueLifecycles = singleSpaVue({...})

export const mount = props => vueLifecycles.mount(props).then(instance => {
  // do what you want with the Vue instance
  ...
})
```

### Vue 2

对于 Vue 2 项目，需要修改入口文件为以下内容：

```js
import './set-public-path';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import singleSpaVue from 'single-spa-vue';

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App);
    },
    router,
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
```


### Vue 3

对于 Vue 2 项目，需要修改入口文件为以下内容：

```js
import './set-public-path';
import { h, createApp } from 'vue';
import singleSpaVue from '../lib/single-spa-vue.js';

import App from './App.vue';

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa,
        },
      });
    },
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
```

## 自定义数据

以下写法可以传递[Single-spa 自定义数据](/docs/building-applications/#lifecycle-props) 给根组件:

```js
// main.js
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App, {
        props: {
          mountParcel: this.mountParcel,
          otherProp: this.otherProp,
        },
      });
    },
    router,
  },
});
```


```vue
// App.vue
<template>
  <button>{{ otherProp }}</button>
</template>
<script>
export default {
  props: ['mountParcel', 'otherProp'],
}
</script>
```

## 依赖共享

出于性能上的考虑，Vue、Vue Router以及其他较大的库，最好使用相同的版本

要实现不同应用间的依赖共享，添加你想要共享的依赖作为[webpack externals](https://webpack.js.org/configuration/externals)。然后使用
一个工作在浏览器中的模块加载工具，比如[systemjs](https://github.com/systemjs/systemjs)，来为single-spa中的每个项目提供这些共享的依赖，将`vue`以及其他库添加到[import map](http://single-spa-playground.org/playground/import-map)中。

如下案例给出一个import map的案例，可以作为参考：
[coexisting-vue-microfrontends的 index.html文件](https://github.com/joeldenning/coexisting-vue-microfrontends/blob/master/root-html-file/index.html)。

依赖共享是被强烈建议的。详细的原因可以查看[recommended setup for single-spa](https://single-spa.js.org/docs/faq.html#is-there-a-recommended-setup)

### 使用Vue CLI的情况下共享的配置

```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.externals(['vue', 'vue-router']);
  },
};
```

### 未使用Vue CLI的情况下共享的配置

```js
// webpack.config.js
module.exports = {
  externals: ['vue', 'vue-router'],
};
```

## 选项

当调用`singleSpaVue(opts)`时，所有选项都是通过`opts`参数传入single-spa-vue的

- `Vue`: (必传项) 主Vue对象, 通常暴露在window对象上，或通过`require('vue')` `import Vue from 'vue'`获得
- `appOptions`: (必传项) 类型为Object对象类型，用来实例化Vue应用。`appOptions`将直接透传为Vue构造函数实例化时的初始化参数`new Vue(appOptions)`。需要注意：如果你没有传el选项，插件就会自动创建一个div，并作为一个Vue项目的默认容器附加到DOM中。
- `loadRootComponent`: (非必传，用于取代`appOptions.render`) 在懒加载时有用，一个以root component为成功回调参数的Promise对象。

可以用[appOptions.el](https://vuejs.org/v2/api/#el)配置single-spa要挂载到哪个dom元素上，:

```js
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: h => h(App),
    el: '#a-special-container',
  },
});
```

## 作为一个single-spa应用

想要创建一个single-spa应用，只需要从appOptions中去掉`el`选项，如此一来，dom元素将需要应用的开发者来指定，除此之外的其他选项都应该和上述案例保持一致

## 自定义数据

[single-spa 自定义数据](/docs/building-applications.html#custom-props)通常以`appOptions.data`添加到你的App组件中，可以通过`vm.$data`得到。参考[Vue文档中相关的说明](https://vuejs.org/v2/api/#data)获取更多内容。


