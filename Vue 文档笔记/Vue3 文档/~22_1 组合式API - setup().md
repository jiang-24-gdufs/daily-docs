[toc]

# 组合式 API：setup()

`setup()` **钩子**是在组件中使用**组合式 API 的入口**，通常只在以下情况下使用：

1. 需要在**非单文件组件**中使用组合式 API 时。
2. 需要在基于**选项式 API** 的组件中集成基于组合式 API 的代码时。

**其他情况下，都应优先使用 [`<script setup>`](https://cn.vuejs.org/api/sfc-script-setup.html) 语法。**



## 基本使用[#](https://cn.vuejs.org/api/composition-api-setup.html#basic-usage)

我们可以使用[响应式 API](https://cn.vuejs.org/api/reactivity-core.html) 来**声明响应式的状态**，在 `setup()` 函数中返回的对象会暴露给模板和组件实例。

其它的选项也可以通过组件实例来获取 `setup()` 暴露的属性：

```vue
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>

```

在模板中访问从 `setup` 返回的 [ref](https://cn.vuejs.org/api/reactivity-core.html#ref) 时，它会[自动浅层解包](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#deep-reactivity)，因此你无须再在模板中为它写 `.value`。当通过 `this` 访问时也会同样如此解包。

`setup()` 自身并不含对组件实例的访问权，即在 **`setup()` 中访问 `this` 会是 `undefined`**。

可以在选项式 API 中访问组合式 API 暴露的值，但反过来则不行。



## 访问 Props

`setup` 函数的第一个参数是组件的 `props`。

和标准的组件一致，一个 `setup` 函数的 `props` 是响应式的，并且会在传入新的 props 时同步更新。

如果你**解构了 `props` 对象，解构出的变量将会丢失响应性**。

>  因此推荐通过 `props.xxx` 的形式来使用其中的 props。

如果你确实需要解构 `props` 对象，或者需要将某个 prop 传到一个外部函数中并保持响应性，那么你可以使用 [toRefs()](https://cn.vuejs.org/api/reactivity-utilities.html#torefs) 和 [toRef()](https://cn.vuejs.org/api/reactivity-utilities.html#toref) 这两个工具函数

```diff
import { toRefs, toRef } from 'vue'

export default {
  setup(props) {
+    // 将 `props` 转为一个其中全是 ref 的对象，然后解构
+    const { title } = toRefs(props)
+    // `title` 是一个追踪着 `props.title` 的 ref
+    console.log(title.value)

+    // 或者，将 `props` 的单个属性转为一个 ref
+    const title = toRef(props, 'title')
  }
}
```



## Setup 上下文

传入 `setup` 函数的第二个参数是一个 **Setup 上下文**对象。

该上下文对象是非响应式的，可以安全地解构, 上下文对象暴露了其他一些**在 `setup` 中可能会用到的值**：

- `attrs`: 透传 Attributes（非响应式的对象，等价于 $attrs）    console.log(context.attrs)     
- `slots`: 插槽（非响应式的对象，等价于 $slots）    console.log(context.slots)     
- `emit`:  触发事件（函数，等价于 $emit）    console.log(context.emit)     
- `expose`: 暴露公共属性（函数）    console.log(context.expose)

`attrs` 和 `slots` 都是有状态的对象，它们总是会随着**组件自身的更新而更新**。

应当**避免解构它们**，并始终通过 `attrs.x` 或 `slots.x` 的形式使用其中的属性。

`attrs` 和 `slots` 的属性都**不是**响应式的。

如果想要基于 `attrs` 或 `slots` 的改变来执行副作用，那么你应该在 `onBeforeUpdate` 生命周期钩子中编写相关逻辑。



> sfc中访问props&emit: 宏 defineProps defineEmits
>
> 但是如何访问 Context ? 
>
> [[#]](https://cn.vuejs.org/api/sfc-script-setup.html#useslots-useattrs)`useSlots()` 和 `useAttrs()`



### 暴露公共属性[#](https://cn.vuejs.org/api/composition-api-setup.html#exposing-public-properties)

`expose` 函数用于显式地限制该组件暴露出的属性，当父组件通过[模板引用](https://cn.vuejs.org/guide/essentials/template-refs.html#ref-on-component)访问该组件的实例时，将**仅能访问 `expose` 函数暴露出的内容**：

```ts
export default {
  setup(props, { expose }) {
    // 让组件实例处于 “关闭状态”
    // 即不向父组件暴露任何东西
    expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // 有选择地暴露局部状态
    expose({ count: publicCount })
  }
}

```



## 与渲染函数一起使用[#](https://cn.vuejs.org/api/composition-api-setup.html#usage-with-render-functions)

`setup` 也可以返回一个[渲染函数](https://cn.vuejs.org/guide/extras/render-function.html)，此时在渲染函数中可以直接使用在同一作用域下声明的响应式状态

```ts
import { h, ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```

返回一个渲染函数将会阻止我们返回其他东西。

对于组件内部来说，这样没有问题，但如果我们想通过模板引用将这个组件的方法暴露给父组件，那就有问题了。

可以通过调用 [`expose()`](https://cn.vuejs.org/api/composition-api-setup.html#exposing-public-properties) 解决这个问题：

```ts
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```

此时父组件可以通过模板引用来访问这个 `increment` 方法。