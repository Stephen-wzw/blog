---
title: String.slice() 和 String.substring()
date: 2022-04-20
categories:
  - JavaScrit
tags:
  - 字符串
---

* `slice(start[, end])`：返回 [start, end) 之间的元素，若 end 未指定，则默认到末尾所有元素；
* `substring(start[, end])`：返回 [start, end) 之间的元素，若 end 未指定，则默认到末尾所有元素；

二者在参数都为正数时，效果一致，但是它们对负数的处理不一样，下面看看例子。

```js
// 参数为正数
const str = 'Hello world';

console.log(str.slice(1)); // "ello world"
console.log(str.slice(1, 5)); // "ello"

console.log(str.substring(1)); // "ello world"
console.log(str.substring(1, 5)); // "ello"
```

* `slice(start[, end])`：所有负值与字符串长度相加；
* `substring(start[, end])`：所有负值置 0，若 start 大于 end，则会将二者调换。

```js
// 参数为负数
const str = 'Hello world';
console.log(str.slice(-3)); // str.slice(8) "rld"
console.log(str.slice(3, -4)); // str.slice(3, 7) "lo w"

console.log(str.substring(-3)); // str.substring(0) "hello world"
console.log(str.substring(3, -4)); // str.substring(3, 0) -> str.substring(0, 3) "hel"
```