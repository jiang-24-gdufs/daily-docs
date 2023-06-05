# [#](https://v3.cn.vuejs.org/api/sfc-script-setup.html#单文件组件-script-setup)单文件组件`<script setup>`

`<script setup>` 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖。

相比于普通的` <script> `语法，它具有更多优势：

- 更少的样板内容，更简洁的代码。
- 能够使用纯 Typescript 声明 props 和抛出事件。
- 更好的运行时性能 (其模板会被编译成与其同一作用域的渲染函数，没有任何的中间代理)。
- 更好的 IDE 类型推断性能 (减少语言服务器从代码中抽离类型的工作)。



## [#](https://v3.cn.vuejs.org/api/sfc-script-setup.html#基本语法)基本语法

要使用这个语法，需要将 `setup` attribute 添加到 `<script>` 代码块上：

```vue
<script setup>
console.log('hello script setup')
</script>
```

里面的代码会被编译成组件 `setup()` 函数的内容。这意味着与**普通的 `<script>` 只在组件被首次引入的时候执行一次**不同，

`<script setup>` 中的代码会在**每次组件实例被创建的时候执行**。



### [#](https://v3.cn.vuejs.org/api/sfc-script-setup.html#顶层的绑定会被暴露给模板)顶层的绑定会被暴露给模板



## [#](https://v3.cn.vuejs.org/api/sfc-script-setup.html#响应式)响应式

响应式状态需要明确使用[响应式 APIs](https://v3.cn.vuejs.org/api/basic-reactivity.html) 来创建。

和从 `setup()` 函数中返回值一样，ref 值在模板中使用的时候会自动解包：



## [#](https://v3.cn.vuejs.org/api/sfc-script-setup.html#使用组件)使用组件

`<script setup>` 范围里的值也能被直接作为自定义组件的标签名使用：



### [#](https://v3.cn.vuejs.org/api/sfc-script-setup.html#动态组件)动态组件

### [#](https://v3.cn.vuejs.org/api/sfc-script-setup.html#递归组件)递归组件



### [#](https://v3.cn.vuejs.org/api/sfc-script-setup.html#命名空间组件)命名空间组件

可以使用带点的组件标记，例如 `<Foo.Bar>` 来引用嵌套在对象属性中的组件。

这在需要从单个文件中导入多个组件的时候非常有用：

```vue
<script setup>
import * as Form from './form-components'
</script>

<template>
  <Form.Input>
    <Form.Label>label</Form.Label>
  </Form.Input>
</template>
```



## [#](https://v3.cn.vuejs.org/api/sfc-script-setup.html#使用自定义指令)使用自定义指令



## [#](https://v3.cn.vuejs.org/api/sfc-script-setup.html#defineprops-和-defineemits)`defineProps` 和 `defineEmits`

在 `<script setup>` 中必须使用 `defineProps` 和 `defineEmits` API 来**声明 `props` 和 `emits`** ，它们具备完整的类型推断并且在 `<script setup>` 中是直接可用的 (不需要引入)

```vue
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
// setup code
</script>
```

- `defineProps` 和 `defineEmits` 都是只在 `<script setup>` 中才能使用的**编译器宏**。他们不需要导入且会随着 `<script setup>` 处理过程一同被编译掉。

- `defineProps` 接收与 [`props` 选项](https://v3.cn.vuejs.org/api/options-data.html#props)相同的值，`defineEmits` 也接收 [`emits` 选项](https://v3.cn.vuejs.org/api/options-data.html#emits)相同的值。

- `defineProps` 和 `defineEmits` 在选项传入后，会提供恰当的类型推断。

- 传入到 `defineProps` 和 `defineEmits` 的选项会**从 setup 中提升到模块的范围**。

  因此，传入的选项**不能引用在 setup 范围中声明的局部变量**。这样做会引起编译错误。但是，它**可以引用导入**的绑定，因为它们也在模块范围内。

如果使用了 Typescript，[使用纯类型声明来声明 prop 和 emits](https://v3.cn.vuejs.org/api/sfc-script-setup.html#仅限-typescript-的功能) 也是可以的



## [#](https://v3.cn.vuejs.org/api/sfc-script-setup.html#defineexpose)`defineExpose`

使用 `<script setup>` 的组件是**默认关闭**的，也即通过模板 ref 或者 `$parent` 链获取到的组件的公开实例，不会暴露任何在 `<script setup>` 中声明的绑定。

为了在 `<script setup>` 组件中明确要暴露出去的属性，使用 `defineExpose` 编译器宏：

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

当父组件通过模板 ref 的方式获取到当前组件的实例，获取到的实例会像这样 `{ a: number, b: number }` (ref 会和在普通实例中一样被自动解包)



## [#](https://v3.cn.vuejs.org/api/sfc-script-setup.html#useslots-和-useattrs)`useSlots` 和 `useAttrs`

在 `<script setup>` 使用 `slots` 和 `attrs` 的情况应该是很罕见的，因为可以在模板中通过 `$slots` 和 `$attrs` 来访问它们。



## [#](https://v3.cn.vuejs.org/api/sfc-script-setup.html#与普通的-script-一起使用)与普通的 `<script>` 一起使用

`<script setup>` 可以和普通的 `<script>` 一起使用。普通的 `<script>` 在有这些需要的情况下或许会被使用到：

- 无法在 `<script setup>` 声明的选项，例如 `inheritAttrs` 或通过插件启用的自定义的选项。
- 声明命名导出。
- **运行副作用或者创建只需要执行一次的对象**。

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



## [#](https://v3.cn.vuejs.org/api/sfc-script-setup.html#顶层-await)顶层 `await`

`<script setup>` 中可以使用顶层 `await`。结果代码会被编译成 `async setup()`：

```vue
<script setup>
const post = await fetch(`/api/post/1`).then(r => r.json())
</script>
```


另外，await 的表达式会自动编译成在 `await` 之后保留当前组件实例上下文的格式。

> 注意: `async setup()` 必须与 `Suspense` 组合使用，`Suspense` 目前还是处于实验阶段的特性。我们打算在将来的某个发布版本中开发完成并提供文档 - 如果你现在感兴趣，可以参照 [tests](https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/__tests__/components/Suspense.spec.ts) 看它是如何工作的。



## 仅限 TypeScript 的功能



## 限制：没有 Src 导入