[TOC]

# [#](https://v3.cn.vuejs.org/guide/migration/render-function-api.html#渲染函数-api)渲染函数 API**非兼容**

## [#](https://v3.cn.vuejs.org/guide/migration/render-function-api.html#概览)概览

更改的简要总结：

- `h` 现在是全局导入，而不是作为参数传递给渲染函数
- **更改渲染函数参数**，使其在有状态组件和函数组件的表现更加一致
- VNode 现在有一个扁平的 **prop 结构**



在 2.x 中，`render` 函数会自动接收 `h` 函数 (它是 `createElement` 的惯用别名) 作为参数：

在 3.x 中，`h` 函数现在是全局导入的，而不是作为参数自动传递。

由于 `render` 函数不再接收任何参数，它将主要在 `setup()` 函数内部使用。这还有一个好处：可以访问在作用域中声明的响应式状态和函数，以及传递给 `setup()` 的参数。



## VNode Prop 格式化

### [#](https://v3.cn.vuejs.org/guide/migration/render-function-api.html#_2-x-语法-3)2.x 语法

在 2.x 中，`domProps` 包含 VNode prop 中的嵌套列表：

```js
// 2.x
{
  staticClass: 'button',
  class: { 'is-outlined': isOutlined },
  staticStyle: { color: '#34495E' },
  style: { backgroundColor: buttonColor },
  attrs: { id: 'submit' },
  domProps: { innerHTML: '' },
  on: { click: submitForm },
  key: 'submit-button'
}
```

### [#](https://v3.cn.vuejs.org/guide/migration/render-function-api.html#_3-x-语法-3)3.x 语法

在 3.x 中，**整个 VNode prop 的结构都是扁平的**。使用上面的例子，来看看它现在的样子。

```js
// 3.x 语法
{
  class: ['button', { 'is-outlined': isOutlined }],
  style: [{ color: '#34495E' }, { backgroundColor: buttonColor }],
  id: 'submit',
  innerHTML: '',
  onClick: submitForm,
  key: 'submit-button'
}
```

没有特意针对 props 使用的键值, 直接使用 prop 的名称进行追加.

```js
h(componentOption, {
	id: 'domId',
	propdata: 'props-string'
})
```



## 注册组件

### [#](https://v3.cn.vuejs.org/guide/migration/render-function-api.html#_2-x-语法-4)2.x 语法

在 2.x 中，注册一个组件后，把组件名作为字符串传递给渲染函数的第一个参数，它可以正常地工作

在 3.x 中，由于 VNode 是上下文无关的，不能再用字符串 ID 隐式查找已注册组件。取而代之的是，需要使用一个导入的 `resolveComponent` 方法：

```js
// 3.x
import { h, resolveComponent } from 'vue'

export default {
  setup() {
    const ButtonCounter = resolveComponent('button-counter')
    return () => h(ButtonCounter)
  }
}
```

