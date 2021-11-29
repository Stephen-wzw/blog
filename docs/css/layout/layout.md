# 布局

## 1. 盒模型宽度的计算

* 普通盒模型

  * 默认盒子属性：box-sizing: content-box;

  * offsetWidth = (width + padding + border)    不算 margin

    <img src="img\image-20210524161522345.png" alt="image-20210524161522345" style="zoom:50%;" />

* 怪异盒模型

  * 设置语句：box-sizing: border-box;

  * offsetWidth = width（padding和border都挤压到内容里面）

    <img src="img\image-20210524161747963.png" alt="image-20210524161747963" style="zoom:50%;" />

## 2. margin 纵向重叠

* margin纵向重叠取重叠区最大值，不进行叠加

  <img src="img\image-20210524162223533.png" alt="image-20210524162223533" style="zoom:50%;" />

## 3. margin 负值问题

* margin-top 和 margin-left 是负值，元素会向上或者向左移动
* margin-right 负值，右侧元素左移，自身不受影响
* margin-bottom 负值，下侧元素上移，自身不受影响

## 4. BFC

* Block Format Context ：块级格式化上下文
* 一块独立的渲染区域，内部元素的渲染不会影响边界以外的元素
* 形成 BFC 的条件
  * float 不设置成 none
  * position 是 absolute 或者 fixed
  * overflow 不是 visible
  * display 是 flex 或者 inline-block 等
* 应用：
  * 清除浮动

## 5. float

### 5.1 圣杯布局和双飞翼布局

#### 5.1.1 作用

* 实现 pc 端三栏布局，中间一栏最先渲染

* 实现两边宽度固定，中间自适应

* 效果图

  ![image-20210524144236366](img\image-20210524144236366.png)

#### 5.1.2 圣杯布局

* 为了让中间盒子最先渲染，所以中间盒子放在三个盒子的第一个位置  

  ![image-20210524145454648](img\01.png)

* 左中右盒子全部浮动

  ![image-20210524145555488](img\02.png)

* 防止中间内容被两侧覆盖，父元素设置 padding

  ![image-20210524145631862](img\03.png)

* 两侧使用 margin 负值，分别放置左右两边

  * 左边 margin-left: -100%

    ![image-20210524145850683](img\04.png)

  * 左边用相对定位平移 padding 宽度

    ![image-20210524145938264](img\05.png)

  * 右边盒子 margin-right : -200px     (设置成自身宽度，且是负值，平移到上一行)

    ![image-20210524150130335](img\06.png)

#### 5.1.3 双飞翼布局

* 中间盒子最先渲染

  ![image-20210524153123511](img\07.png)

* 全部浮动

  ![image-20210524153400845](img\08.png)

* 为了不让左右盒子覆盖中间盒子内部，中间盒子内部设置 margin

  ![image-20210524154055992](img\09.png)

* 左边盒子设置 margin-left: -100%;

  ![image-20210524154322827](img\10.png)

* 右边盒子设置 margin-left： -200px ；和圣杯布局设置不一样原因是圣杯布局的 margin 是放在同一个外层盒子中，而双飞翼布局是三个独立的盒子，右盒子是被挤下去的

  ![image-20210524154628042](img\11.png)

### 5.2 手写clearfix

```css
/* 1、父级标签定义伪类 */
.clearfix::after {
	content: '';
	display: table;
	clear: both;
}
/* 兼容IE低版本 */
.clearfix {
	*zoom: 1;
}

/* 2、父级标签 overflow */
.clearfix {
	overflow: hidden;
}

/* 3、添加空 div 标签 */
.clearfix {
	clear: both;
}
```

## 6. flex布局

### 6.1 flex基本了解

* 元素结构：容器内部放子元素,容器设置display：flex
* 布局思想：
  * 设置主轴方向控制子元素排列方向，
  * 设置容器相关属性控制子元素布局
  * 设置子元素相关属性控制子元素布局
* 容器样式属性
  * flex-direction 
  * justify-content
  * align-items
  * flex-wrap
* 子元素
  * align-self

### 6.2 实现骰子三点

* 容器设置：flex，justify-content: space-between
* 2,3子元素，设置align-self

## 7. 元素居中

### 7.1 定位回顾

* relative相对自身定位
* absolute 依据最近的一层的定位元素定位
  * 定位元素：设置了absolute、relative、fixed
  * 找不到最近定位元素 ，依据body

### 7.2 行内元素水平垂直居中

设置父级标签。

* 水平居中： text-align: center
* 垂直居中： line-height：盒子高度

### 7.3 块级元素水平垂直居中

* 水平居中: 
  * margin : 0 auto;

* 水平垂直都居中
  * position：absolute; top： 50%；left： 50%；transform：translate（-50%，-50%）不会触发重排，因此最常用。
  * position：absolute; top: 0; left:  0; right: 0; bottom: 0; margin: auto;
  * 容器设置：display：flex; justify-content: center; align-items: center;
  * 容器：display: table-cell;  text-align: center; vertical-align: middle;  子元素：display: inline-block; 

## 8. 样式单位

* em：相对于自身字体大小的单位
* rem：相对于html标签字体大小的单位
* vh：相对于视口高度大小的单位，20vh == 视口高度/100*20
* vw：相对于视口宽度大小的单位,  20vw == 视口宽度/100*20

## 9. 移动端布局方案

### 9.1 流式布局（百分比）

* 不能改变字体大小，可改变元素尺寸，高度固定

### 9.2 flex （弹性盒）

* 使用方便，通常配合其他方案一起使用

### 9.3 rem + 媒体查询/flexible.js

* 改变单位，字体大小元素尺寸均可改变

<img src="img/image-20210525183246580.png" alt="image-20210525183246580" style="zoom:67%;" />

<img src="img/image-20210525183543431.png" alt="image-20210525183543431" style="zoom:33%;" />

### 9.4 rem + vw

* 兼容性不如前面的

  <img src="img/image-20210525183851075.png" alt="image-20210525183851075" style="zoom:33%;" />



## 10. 样式预处理器

### 10.1 sass 是什么?    样式预处理

CSS 本身可能很有趣，但是样式表正变得越来越大、 越来越复杂、越来越难以维护。这就是预处理可以提供帮助的地方。 Sass 为你提供了 CSS 中还不存在的特性，例如变量、 嵌套、混合、继承和其它实用的功能，让编写 CSS 代码变得再次有趣。

### 10.2 sass 和 scss 的区别

CSS 是 Sass 3 引入新的语法，其语法完全兼容 CSS3，并且继承了 Sass 的强大功能。Sass 和 SCSS 其实是同一种东西，我们平时都称之为 Sass，两者之间不同之处有以下两点：

1. 文件扩展名不同，Sass 是以“.sass”后缀为扩展名，而 SCSS 是以“.scss”后缀为扩展名
2. 语法书写方式不同，Sass 是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而 SCSS 的语法书写和我们的 CSS 语法书写方式非常类似。

先来看一个示例：

**Sass 语法：**

```php
$font-stack: Helvetica, sans-serif  //定义变量
$primary-color: #333 //定义变量

body
  font: 100% $font-stack
  color: $primary-color
```

**SCSS 语法：**

```bash
$font-stark: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

编译出来的 CSS

```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

由于 SCSS 是 CSS 的扩展，因此，所有在 CSS 中正常工作的代码也能在 SCSS 中正常工作。也就是说，对于一个 Sass 用户，只需要理解 Sass 扩展部分如何工作的，就能完全理解 SCSS。大部分扩展，例如变量、parent references 和 指令都是一致的；唯一不同的是，SCSS 需要使用分号和花括号而不是换行和缩进。 例如，以下这段简单的 Sass 代码：

```bash
#sidebar
  width: 30%
  background-color: #faa
```

只需添加花括号和分号就能转换为 SCSS 语法：

```css
#sidebar {
  width: 30%;
  background-color: #faa;
}
```

另外，SCSS 对空白符号不敏感。上面的代码也可以书写成下面的样子：

```css
#sidebar {width: 30%; background-color: #faa}
```

### 10.3 scss 的作用

1. 变量

   ```scss
   $font-stack:    Helvetica, sans-serif;
   $primary-color: #333;
   
   body {
     font: 100% $font-stack;
     color: $primary-color;
   }
   ```

   ```css
   body {
     font: 100% Helvetica, sans-serif;
     color: #333;
   }
   ```

2. 嵌套

   ```scss
   nav {
     ul {
       margin: 0;
       padding: 0;
       list-style: none;
     }
   
     li { display: inline-block; }
   
     a {
       display: block;
       padding: 6px 12px;
       text-decoration: none;
     }
   }
   ```

   ```css
   nav ul {
     margin: 0;
     padding: 0;
     list-style: none;
   }
   nav li {
     display: inline-block;
   }
   nav a {
     display: block;
     padding: 6px 12px;
     text-decoration: none;
   }
   ```

3. 模组

   ```scss
   // _base.scss
   $font-stack:    Helvetica, sans-serif;
   $primary-color: #333;
   
   body {
     font: 100% $font-stack;
     color: $primary-color;
   }
   ```

   ```scss
   // styles.scss
   @import 'base';
   
   .inverse {
     background-color: 'green';
     color: white;
   }
   ```

   ```css
   body {
     font: 100% Helvetica, sans-serif;
     color: #333;
   }
   
   .inverse {
     background-color: #333;
     color: white;
   }
   
   ```

4. 混合（mixin）

   要创建一个 mixin，您可以使用 `@mixin` 指令并为其命名。我们将其命名为 mixin `transform`。我们还在 `$property` 括号内使用了变量 ，因此我们可以传递任何所需的变换。创建混入之后，您可以将其用作 CSS 声明 `@include`，以混入的名称开头。

   ```scss
   @mixin transform($property) {
     -webkit-transform: $property;
     -ms-transform: $property;
     transform: $property;
   }
   .box { @include transform(rotate(30deg)); }
   ```

   ```css
   .box {
     -webkit-transform: rotate(30deg);
     -ms-transform: rotate(30deg);
      transform: rotate(30deg);
   }
   ```

5. 操作符 +-*/

   ```scss
   .container {
     width: 100%;
   }
   
   article[role="main"] {
     float: left;
     width: 600px / 960px * 100%;
   }
   
   aside[role="complementary"] {
     float: right;
     width: 300px / 960px * 100%;
   }
   ```

## 11. iconfont

### 11.1 字体图标的优势劣势

#### 优势

1. **轻量级：**一个图标字体要比一系列的图像要小。一旦字体加载了，图标就会马上渲染出来，不需要下载一个个图像。这样可以减少HTTP的请求数量，而且和HTML5的离线存储配合，可以对性能做出优化。

2. **灵活性**：不调字体可以像页面中的文字一样，通过font-size属性来对其进行大小的设置，而且还可以添加各种文字效果，如color、hover、filter、text-shadow、transform等效果。灵活的简直不像话！

3. **兼容性**：图标字体支持现代浏览器，甚至是低版本的IE浏览器，所以可以放心的使用它。

4. 相比于位图放大图片会出现失真、缩小又会浪费掉像素点，图标字体不会出现这种情况。

#### 劣势

1. 图标字体只能被渲染成单色，或者是CSS3的渐变色

2. 版权上也有着对应的限制，当然还是有很多免费的图标字体可以供我们下载。

3. 当自己创作图标字体的时候，是比较耗费时间的，重构人员的后期维护成本也比较高

### 11.2 字体图标库都有哪些

####  Iconfont-阿里巴巴矢量图标库

**官网：**[http://iconfont.cn/](https://link.zhihu.com/?target=http%3A//iconfont.cn/)

阿里妈妈MUX倾力打造的矢量图标管理、交流平台。 设计师将图标上传到Iconfont平台，用户可以自定义下载多种格式的icon，平台也可将图标转换为字体，便于前端工程师自由调整与调用。

#### Icons - Material Design

**官网：**[https://material.io/icons/](https://link.zhihu.com/?target=https%3A//material.io/icons/)

Google 设计团队出品，用于常见操作和项目。 在桌面上下载，在Android，iOS和Web的数字产品中使用它们。

#### Ionicons

**官网：**[http://ionicons.com/](https://link.zhihu.com/?target=http%3A//ionicons.com/)

高级设计的图标，用于Web，iOS，Android和桌面应用程序。 支持SVG和Web字体。 完全开源，MIT由Ionic Framework团队授权和构建。

#### LivIcons Evolution

**官网：**[https://livicons.com/](https://link.zhihu.com/?target=https%3A//livicons.com/)

真正的动态 SVG 图标。 这是面向 Web 开发人员和网站所有者的产品。 LivIcons Evolution 是经典 LivIcons 包的下一代现代产品，带有交叉浏览器矢量图标，每个都有独立的迷你动画。 它们基于由 JavaScript 驱动的 SVG（可缩放矢量图形），适用于所有现代浏览器，在任何设备上都看起来很完美。 是的，Retina 也是。

#### Fontello

**官网：**[http://fontello.com/](https://link.zhihu.com/?target=http%3A//fontello.com/)

可以根据您的需求很轻松地制作自定义图标 webfont。

####  Font Awesome

**官网：**[https://fontawesome.com/](https://link.zhihu.com/?target=https%3A//fontawesome.com/)

一套绝佳的图标字体库和 CSS 框架。 Font Awesome为您提供可缩放的矢量图标,您可以使用CSS所提供的所有特性对它们进行更改,包括:大小、颜色、阴影或者其它任何支持的效果。

### 11.3  I confont-阿里巴巴矢量图标库的使用

创建线上图标库的使用方法

1. 登录：https://www.iconfont.cn/
2. 选中图标添加购物车
3. 点击最右侧购物车图标，创建项目 
4. 分三种使用方式 unicode 、fontclass、symbol

注意：使用 unicode，静态页使用浏览器访问，要+http前缀

#### 阿里图标三种模式

- **unicode 模式**

  - 它本身和引用外部自定义字体没有区别。只是一个表现出来是图形，另一个是文字。对系统来说，没有区别。
  - 引用 iconfont 和引用自定义字体，使用的代码是一样
  - 定义字体族

  ```css
  @font-face {
      font-family: 'iconfont';  /* 自定义字体族名，可以是任意名， */
      src: url('//at.alicdn.com/t/font_1357308_kygursq6jw.eot'); /* 字体描述文件链接 */
      src: url('//at.alicdn.com/t/font_1357308_kygursq6jw.eot?#iefix') format('embedded-opentype'), /* 兼容 IE9 */
      url('//at.alicdn.com/t/font_1357308_kygursq6jw.woff2') format('woff2'), /* 兼容 IE6-IE8 */
      url('//at.alicdn.com/t/font_1357308_kygursq6jw.woff') format('woff'), /* 兼容 chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url('//at.alicdn.com/t/font_1357308_kygursq6jw.ttf') format('truetype'), /* 兼容 chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url('//at.alicdn.com/t/font_1357308_kygursq6jw.svg#iconfont') format('svg'); /* 兼容 iOS 4.1及以上 */
  }
  ```

  - 使用字体族（无论是文本还是icon）

  ```css
  .iconfont {
      font-family: "iconfont" !important; /*使用自定义字体或者icon*/
      /* 上面一句，和我们平时定义「微软雅黑」（font-family: "Microsoft YaHei", sans-serif;）字体是同样的语法 */
      /* 只是「微软雅黑」在大部分电脑都会自带有，浏览器能直接找到系统的「微软雅黑」字体描述文件，不需要我们自己定义字体族，不需要使用外部的字体描述文件 */
  }
  ```

  - 「&#」的意思，「&#」 开头的是HTML实体。所有 html 显示的内容，都可以通过 &# 的形式表述。例如，汉字的HTML实体由三部分组成，`&#(中文对应ASCII码);`。例如，把“最新” 转换成“&#26368;&#26032;”
  - 为什么中英文能直接显示，不需要使用「&#」形式表示呢？因为中英文有 ASCII 进行自动转义。而 iconfont 不在 ASCII 中定义。是自定义的。
  - iconfont 相当于使用了剩余的 unicode 编码，将自定义的图标描述通过 &# 开头的 HTML 实体的形式表现出来。
  - 以「&#」开头的后接十进制数字，以「&#\x」开头的后接十六进制数字

- **Font class**

  - 该模式和 unicode 模式是同样的原理，通过 unicode 编码保存。只是使用方式不同。

  - unicode 是直接将内容写到 innerHTML 中转义，而 font class 则是通过 css 的 :before 伪类，将通过 content 来定义。

  - 在 font class 中，「&#\x」被转义符「\」替换，因为「&#\x」是 html 实体字符，只会被 html 解析，不能在 css 中被解析。

  - 通过阿里iconfont 给出的 css 链接，在浏览器中直接查看该文件可以看到其定义

    

    ![img](https://user-gold-cdn.xitu.io/2019/8/21/16cb2075ee4c0e7a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

    ![img](https://user-gold-cdn.xitu.io/2019/8/21/16cb207617607bd3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

    

- **Symbol**

  - 该模式和上述二者有本质区别，Symbol 模式是通过 svg 技术来描绘图标，没有运用到 unicode 编码

  - 即通过不同的 svg 标签来描绘不同的图标。

  - 由于使用的是 svg 技术，属于图形，而不仅仅是字符。所以该模式支持彩色图标。

  - 通过阿里 iconfont 给出的 js 链接，在浏览器中直接查看该文件可以看到其定义

    ![img](https://user-gold-cdn.xitu.io/2019/8/21/16cb2076088a3996?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

    ![img](https://user-gold-cdn.xitu.io/2019/8/21/16cb207634a995c4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 不同文件后缀的含义

- EOT（Embedded Open Type）是微软创造的字体格式。在 IE 系列的浏览器下使用。

- SVG（Scalable Vector Graphics (Font)）是一种用矢量图格式改进的字体格式。注意这里的 svg 与 symbol 的 svg 是两个概念。前者是 svg 类型的字体描述，后缀是直接描述svg 图形。该模式在 ios 移动端中才支持

- OTF（OpenType Font）和 TTF（TrueType Font）是 Apple 公司和 Microsoft 公司共同推出的字体文件格式,随着 windows 的流行,已经变成最常用的一种字体文件表示方式。目前主流浏览器都支持该模式。

- WOFF（Web Open Font Format），WOFF字体通常比其它字体加载的要快些，使用了 OTF 和 TTF 字体里的存储结构和压缩算法。目前主流浏览器都支持该模式

- 其具体兼容性情况，我们可以通过打开 iconfont 的 Font class 链接，通过备注信息得知。

  ![img](https://user-gold-cdn.xitu.io/2019/8/21/16cb207617607bd3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

