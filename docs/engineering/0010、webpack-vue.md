---
title: webpack-vue
date: 2022-05-16
categories:
  - 工程化
tags:
  - 项目打包
  - webpack
---

平时我们可以通过 Vue-cli 快速搭建 Vue 开发环境，但是要知道 Vue-cli 也是基于 webpack 构建的，那么如何使用 webpack 搭建 Vue 开发环境呢？

前面已经了解了 webpack 如何对 js、css、图片、字体等其他资源进行打包处理，而想要搭建 Vue 开发环境，主要就是对 `.vue` 文件进行处理。

## 准备

现在 Vue@3.x 已经发布了，因此需要安装 `vue@next`。

```bash
npm install vue@next
```

在 `src` 文件夹下新增 `vue` 文件夹，新建 `App.vue` 文件，同时在 `index.js` 中导入：

**project**

```diff
  webpack-demo
  |- node_modules
  |- package-lock.json
  |- package.json
  |- postcss.config.js
  |- babel.config.js
  |- webpack.config.js
  |- /public
    |- favicon.ico
    |- index.html
  |- /src
    |- /css
      |- style.css
      |- title.less
    |- /font
      |- iconfont.css
      |- iconfont.eot
      |- iconfont.ttf
      |- iconfont.woff
      |- iconfont.woff2
    |- /img
      |- avatar.png
      |- wallpaper.png
    |- /js
      |- format.js
      |- math.js
+   |- /vue
+     |- App.vue
    |- index.js
```

**App.vue**

```js
<template>
  <h2>我是Vue渲染出来的</h2>
  <h2>{{title}}</h2>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello Vue"
    }
  }
}
</script>

<style>

</style>
```

**index.js**

```diff
+ import { createApp } from "vue";
 
  import { sum } from "./js/math.js";
  const { priceFormat } = require("./js/format");
  
+ import App from "./vue/App.vue";
  
  import "./css/style.css";
  import "./css/title.less";
  import "./font/iconfont.css";
  
  // 导入图片
  import avatar from "./img/avatar.png";
  
  console.log(sum(10, 20));
  console.log(priceFormat());
  
  const div = document.createElement("div");
  div.className = "title";
  div.innerHTML = "webpack-css";
  
  // 方式一：设置 img 元素的 src
  const imgEl = document.createElement("img");
  imgEl.src = avatar;
  
  // 方式二：设置背景图片
  const bgEl = document.createElement("div");
  bgEl.className = "image-bg";
  
  // i元素
  const iEl = document.createElement('i');
  iEl.className = "iconfont icon-ashbin";
  
  document.body.appendChild(div);
  document.body.appendChild(imgEl);
  document.body.appendChild(bgEl);
  document.body.appendChild(iEl);
  
  // babel
  const messages = [1, 2, 3];
  messages.map((n) => n + 1);
  
+ // vue
+ const app = createApp(App);
+ app.mount("#app");
```

## 配置 webpack

默认情况下 `vue-loader` 是对 Vue@2.x 准备的，而我们是 Vue@3.x，因此需要安装 `vue-loader@next`，而 `vue-loader` 又依赖于 `@vue/compiler-sfc` 的，因此也需要安装。

```bash
npm install vue-loader@next @vue/compiler-sfc -D
```

修改 `webpack.config.js` 配置：

**webpack.config.js**

```diff
  //...
+ const { VueLoaderPlugin } = require("vue-loader/dist/index");
  //...
  
  module.exports = {
    plugins: [
      //...
+     new VueLoaderPlugin()
      //...
    ]
  }
```

执行 `npm run build`，打开浏览器可以看到渲染正常。但是浏览器控制台出现了一个警告：

```bash
runtime-core.esm-bundler.js:4432 Feature flags __VUE_OPTIONS_API__, __VUE_PROD_DEVTOOLS__ are not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.
```

从 3.0.0-rc.3 开始，Vue 希望我们手动设置全局标识，可以对最终的打包代码进行 tree-shaking 优化：

* __VUE_OPTIONS_API__（是否支持 Options API，默认为 `true`）
* __VUE_PROD_DEVTOOLS__（是否在生产环境中支持 devtools，默认为 `false`）

为了在 webpack 中配置全局标识，可以使用 `DefinePlugin`。

**webpack.config.js**

```diff
  module.exports = {
    plugins: [
      //...
      new DefinePlugin({
        BASE_URL: "'./'",
+       __VUE_OPTIONS_API__: true,
+       __VUE_PROD_DEVTOOLS__: false
      }),
      //...
    ]
  }
```

这时重新打包后，浏览器控制台的警告就会消除了。

## 搭建本地服务器

目前我们开发的项目，为了运行需要有两个操作：

* 操作一：npm run build，编译相关的代码；
* 操作二：通过live server或者直接通过浏览器，打开index.html代码，查看效果。

这个过程会影响我们的开发效率，我们希望当文件发生改变后，可以自动的完成编译并展示。为了完成自动编译，webpack 提供了几种可选的方式：

* webpack watch mode
* webpack-dev-server
* webpack-dev-middleware

### `watch`

webpack 给我们提供了 **watch** 模式，在该模式下，webpack 依赖图中的所有文件，只要有一个发生了更新，那么代码将会被重新编译，不需要再手动执行 `npm run build` 了。

为了配置 watch 模式，可以直接在 `package.json` 中修改脚本命令：

**package.json**

```diff
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
+   "watch": "webpack --watch"
  },
```

此时执行 `npm run watch`，以后所有的更新都会被检测到重新编译。

### `webpack-dev-server`

但上述的方式其实只是帮我们完成了操作一，操作二自动刷新浏览器其实是 live server 帮我们完成的。为了在**不使用** live server 的情况下完成 live reloading （实时重新加载）的功能，需要使用 `webpack-dev-server`。

```bash
npm install webpack-dev-server -D
```

在 `package.json` 中修改脚本命令：

```diff
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "watch": "webpack --watch",
+   "serve": "webpack serve"
  },
```

执行 `npm run serve` 后，webpack 内部会找到 `webpack-dev-server` 来开启服务。

> `webpack-dev-server` 在编译之后不会写入到任何输出文件，而是将打包的文件保留在内存中。

#### 热模块替换（HMR）

热模块更新（Hot Module Replacement），指在应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个页面。

HMR 通过以下几种方式，提升开发效率：

* 不需重新加载整个页面，这样可以保留某些应用程序的状态不丢失；
* 只更新需要变化的内容，节省开发时间；
* 修改了 css、js 源代码，会立即在浏览器更新，相当于直接在浏览器的 devtools 中直接修改样式。

`webpack-dev-server` 内置支持 HMR，只需要开启即可。

> 在不开启 HMR 的情况下，整个页面会重新刷新，使用的是 live reloading。

**webpack.config.js**

```diff
  module.exports = {
    ...
+   devServer: {
+     hot: true
+   }
  }
```

在开启后，修改内容仍然是进行整个页面的重新刷新，因为你还没有告知 webpack 哪些模块需要热更新。我们修改 `index.js`。

**index.js**

```diff
  ...
  import { sum } from "./js/math.js";
+ if (module.hot) {
+   module.hot.accept("./js/math.js", () => {
+     console.log("模块更新了");
+   })
+ }
  ...
```

这时修改 `math.js`，浏览器就不会再重新刷新整个页面了。

```bash
[webpack-dev-server] App updated. Recompiling...
[webpack-dev-server] App hot update...
[HMR] Checking for updates on the server...
HMR111
模块更新了
[HMR] Updated modules:
[HMR]  - ./src/js/math.js
[HMR] App is up to date.
```

而在真实开发中，难道每个文件都需要手动指定 HMR 吗？事实上不需要这么麻烦。

在 Vue 开发中，使用 `vue-loader` 就能支持 vue 组件的 HMR。

可以试试修改 `App.vue` 组件，不需手动配置即可达到 HMR 的效果。

#### 其他配置

`host` 可以设置主机地址，默认值为 localhost，还可以设置为 0.0.0.0。

localhost 和 0.0.0.0 的区别：

* localhost：本质上是一个域名，通常情况下会被解析成 127.0.0.1；
* 127.0.0.1：回环地址(Loop Back Address)，表达的意思其实是我们主机自己发出去的包，直接被自己接收，正常的数据包经过应用层 - 传输层 - 网络层 - 数据链路层 - 物理层，而回环地址，是在网络层直接就被获取到了，是不会经过数据链路层和物理层的。比如我们监听 127.0.0.1 时，在同一个网段下的主机中，通过 ip 地址是不能访问的，只能本机访问；
* 0.0.0.0：监听 IPV4 上所有的地址，再根据端口找到不同的应用程序，比如我们监听 0.0.0.0 时，在同一个网段下的主机中，通过 ip 地址是可以访问的;

`port` 可以配置端口号。

`open` 是否打开浏览器，默认值为 false，也可以设置 Chrome Google 等值。

`compress` 是否为静态文件开启 gzip 压缩。

`proxy` 可以设置代理解决跨域访问的问题。可以先将请求发送到一个代理服务器，代理服务器和 API 服务器没有跨域问题，就可以解决跨域问题。

## 总结

在这个案例中对 .vue 单文件进行了解析，同时配置了 dev-server 搭建本地服务器，能做到 live reloading，并且说到了如何开启热更新及 dev-server 的一些其他配置。