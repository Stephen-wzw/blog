# 介绍

平时写的代码都是运行在浏览器上面，但是现在回想起来竟然不知道浏览器是怎样工作的，它对于我来说竟然是一个黑盒子，因此就想要学习浏览器的工作原理。

> 这一系列是在学习浏览器工作原理的过程中，查找各种资料记录下来的笔记。

## 浏览器内核

浏览器内核是浏览器的核心，也就是浏览器的**排版引擎**，分为两部分：

* 将 HTML 和 CSS 渲染到浏览器上的**渲染引擎**，
* 解析 JavaScript 的 **JavaScript 引擎**。

最开始渲染引擎和 JS 引擎并没有明确的区分，后来 JS 引擎开始独立起来，慢慢发展到现在，内核一般指的是渲染引擎。

不同的浏览器有不同的内核组成：

* Gecko：早期是 Netscape 和 Firefox 浏览器的内核；
* Trident：IE4 - IE11 的内核；
* Webkit：Safari 内核，Google Chrome 之前也使用过；
* Blink： Webkit 的一个分支，目前用于 Chrome、Edge、Opera 等。

## JavaScript 引擎

**JavaScript 引擎**是一个专门处理 JavaScript 脚本的虚拟机，一般会附带在网页浏览器之中，能为程序员提供部分操作浏览器的功能（网络、DOM、外部事件、HTML5 视频、canvas 和存储），并且用于将 JavaScript 代码翻译成 CPU 指令。比较常见的引擎有：

* SpiderMonkey：第一款 JavaScript 引擎，由 Brendan Eich 开发（也就是 JavaScript 作者）；
* Chakra（JScript 引擎）：微软开发，用于 IE 浏览器；
* Chakra（JavaScript 引擎）：微软开发，用于 Edge 浏览器；
* JavaScriptCore：WebKit 中的 JavaScript 引擎，Apple 公司开发，用于 Safari；
* V8：Google 开发的强大 JavaScript 引擎，也帮助 Chrome 从众多浏览器中脱颖而出；

## 主要内容

* [输入 URL 浏览器干了什么](./0001、输入 URL 浏览器干了什么.md)
* [浏览器是怎么渲染的](./0002、浏览器是怎么渲染的.md)
* [V8 引擎](./0003、V8 引擎.md)
* [DOM Tree、CSSOM](./DOM Tree、CSSOM.md)
* ...