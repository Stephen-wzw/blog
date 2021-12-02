# grid 布局

## 基本概念

给块元素设置 `display: grid` 或给行内元素设置 `display: inline-grid`，就能创建 grid 布局。

```css
div {
	display: grid;
}
```

此时该 div 就是“grid 容器”，子元素为“grid 子项”。

grid 是二维布局，可以同时控制行**和**列，而与之对比的 flex 是一维布局，只能单独控制行**或**列。

## 容器属性

### grid-template-columns 和 grid-template-rows

columns 控制竖直方向的划分；rows 控制水平方向的划分。

```css
.container {
  display: grid
  grid-template-columns: 80px auto 100px;
  grid-template-rows: 25% 100px auto 60px;
}
```

这样会将 `.container` 划分为一个四行三列的网格。

有时候，需要创建的网格划分非常有规律，比如每个网格的列宽固定，比如要创建 24 列，宽为 40px 的网格，就可以使用 `repeat()` 语法：

```css
.container {
	grid-template-columns: r
}
```

