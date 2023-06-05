[TOC]

# [单文件组件 `<script setup>`](https://v3.cn.vuejs.org/api/sfc-script-setup.html)

### 顶层的绑定会被暴露给模板

任何声明的顶层的绑定 (包括变量，函数声明，以及 import 引入的内容) 都能在模板中直接使用：

import 导入的内容也会以同样的方式暴露。

- 能被直接作为自定义组件的标签名使用

  将 `MyComponent` 看做被一个变量所引用。如果你使用过 JSX，在这里的使用它的心智模型是一样的。

  其 kebab-case 格式的 `<my-component>` 同样能在模板中使用。

  不过，我们**强烈建议使用 PascalCase 格式以保持一致性**。同时也有助于区分原生的自定义元素。

  - 

```vue
<script setup>
import MyComponent from './MyComponent.vue'
import { capitalize } from './helpers'
// 变量
const msg = 'Hello!'

// 函数
function log() {
  console.log(msg)
}
</script>

<template>
	<MyComponent />
  	<div @click="log">{{ capitalize(msg) }}</div>
</template>
```

`<script setup>`里面的代码会被编译成组件 `setup()` 函数的内容。这意味着与普通的 `<script>` 只在组件被首次引入的时候执行一次不同，`<script setup>` 中的代码会在**每次组件实例被创建的时候执行**

是否可以通过`<script setup> `与普通options对象一起使用分离结构



## 响应式

响应式状态需要明确使用[响应式 APIs](https://v3.cn.vuejs.org/api/basic-reactivity.html) 来创建。

和从 `setup()` 函数中返回值一样，ref 值在模板中使用的时候会**自动解包**：

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0) // ref 返回了一个对象
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```



## defineExpose()[#](https://cn.vuejs.org/api/sfc-script-setup.html#defineexpose)

使用 `<script setup>` 的组件是**默认关闭**的——即通过模板引用或者 `$parent` 链获取到的组件的公开实例，**不会**暴露任何在 `<script setup>` 中声明的绑定。

可以通过 `defineExpose` 编译器宏来显式指定在 `<script setup>` 组件中要暴露出去的属性：

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

当父组件通过模板引用的方式获取到当前组件的**实例**，获取到的实例会像这样 `{ a: number, b: number }` (**ref 会和在普通实例中一样被自动解包**)



## 与普通的 `<script>` 一起使用

`<script setup>` 可以和普通的 `<script>` 一起使用。

普通的 `<script>` 在有这些需要的情况下或许会被使用到：

- 无法在 `<script setup>` 声明的选项，例如 `inheritAttrs` 或通过插件启用的自定义的选项。
- 
- 声明命名导出。
- 运行副作用或者创建只需要执行一次的对象。

```vue
<script>
// 普通 <script>, 在模块范围下执行(只执行一次)
runSideEffectOnce()

// 声明额外的选项
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
// 在 setup() 作用域中执行 (对每个实例皆如此)
</script>
```





