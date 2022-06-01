---
title: 组合式 API 基础
date: 2022-05-30
categories:
  - Vue
tags:
  - 组合式 API
---

## options API 的缺点

使用 (`data`、`computed`、`methods`、`watch`) 组件选项来组织逻辑通常都很有效。然而，当我们的组件开始变得更大时，逻辑关注点的列表也会增长，会导致组件难以阅读和理解。

这种碎片化使得理解和维护复杂组件变得困难。选项的分离掩盖了潜在的逻辑问题。此外，在处理单个逻辑关注点时，我们必须不断地“跳转”相关代码的选项块。

如果能够将同一个逻辑关注点相关代码收集在一起会更好。而这正是组合式 API 使我们能够做到的。而使用组合式 API 的地方就是 `setup` 函数。

## `setup` 选项

`setup` 选项可以用来代替之前所编写的大部分其他选项，如 `methods`、`computed`、`watch`、`data` 和生命周期等。

`setup` 会在组件被创建**之前**执行，一旦 `props` 被解析完成，它就会作为组合式 API 的入口开始执行。

> 在 `setup` 中你应该避免使用 `this`，因为它找不到组件实例。`setup` 的调用发生在 `data` property、`computed` property 或 `methods` 被解析之前，所以它们无法在 `setup` 中被获取。

`setup` 是一个函数，主要有两个参数：

1. `props`
2. `context`

`props` 是父组件传递过来的属性，而 `context` 是当前可能使用的上下文，包含三个属性：

* `attrs`：所有非 prop 的 attribute；
* `slots`：父组件传递过来的插槽；
* `emit`：组件内部需要发出事件（由于在 `setup` 中无法使用 this，因此需要用 `emit` 代替 `this.$emit`）。

`setup` 拥有返回值，它返回的所有内容都会暴露给组件的其余部分（计算属性、方法、生命周期钩子等）以及组件的模板。

```js
setup() {
  const message = "hello setup";
  let counter = 0;
  
  const increment = () => {
    counter++;
  }
  const decrement = () => {
    counter--;
  }

  return {
    // 返回的数据，相当于 data 选项
    message,
    counter,
    // 返回的函数，相当于 methods 选项
    increment,
    decrement
  }
}
```

但是如果我们将 counter 进行 increment 或 decrement 操作，**不能实现界面的响应式**，因为对于一个定义的变量来说，Vue 在默认情况下不会跟踪它的变化。

## 响应式

### `reactive` API

如果想为在 `setup` 中定义的数据提供响应式的特性，那么我们可以使用 `reactive` 的函数，它会返回对象的响应式副本：

> `reactive` 的响应式转换是深层的，会影响所有嵌套的属性。

```js
import { reactive } from 'vue';

const state = reactive({
  counter: 0
})

state.counter++;
console.log(state.counter); // 1
```

但是 `reactive` 函数对传入的值有所限制，必须传入一个对象或数组类型，如果传入基本数据类型，则会报一个警告。所以，可以使用另一个 API：`ref` API。

### `ref` API

在 Vue@3.x 中，可以通过 `ref` 函数将变量变成响应式，它会返回一个 ref 对象，真正的值在它的 value 属性中：

```js
import { ref } from 'vue';

const counter = ref(0);

console.log(counter); // { value: 0 }
console.log(counter.value); // 0
```

注意：

* 在模板中引入 ref 的值时，Vue 会自动帮我们进行解包（浅层解包），所以不需要在模板中通过 ref.value 访问；
* 在 `setup` 函数内部，它依然是一个 ref 引用，因此需要使用 ref.value 进行访问。

## 生命周期

为了在 `setup` 中注册生命周期钩子，需要使用到几个新函数，它们与 options API 名称相同，但前缀为 `on`：即 `mounted` 为 `onMounted`。

> 因为 `setup` 是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的，所以不需要显式地定义它们，在这些钩子中编写的任何代码都应该直接在 `setup` 函数中编写。

```js
export default {
  setup() {
    // mounted
    onMounted(() => {
      console.log('Component is mounted!')
    })
  }
}
```

## `watch`

就像我们在组件中使用 `watch` 选项并在 property 上设置侦听器一样，我们也可以使用从 Vue 导入的 `watch` 函数执行相同的操作。它接受 3 个参数：

* 一个想要侦听的响应式引用或 `getter` 函数；
* 一个回调；
* 可选的配置选项。

```js
import { ref, watch } from 'vue';

const counter = ref(0);
watch(counter, (newValue, oldValue) => {
  console.log('新值是: ' + counter.value)
})
```

## `computed`

与 `ref` 和 `watch` 类似，也可以使用从 Vue 导入的 `computed` 函数在 Vue 组件外部创建计算属性：

```js
import { ref, computed } from 'vue'

const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2)

counter.value++
console.log(counter.value) // 1
console.log(twiceTheCounter.value) // 2
```