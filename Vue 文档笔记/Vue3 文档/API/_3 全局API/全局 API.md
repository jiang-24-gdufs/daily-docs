[TOC]

## [#](https://v3.cn.vuejs.org/api/global-api.html#createapp)createApp

返回一个提供应用上下文的应用实例。

应用实例挂载的**整个组件树共享同一个上下文**。



## [#](https://v3.cn.vuejs.org/api/global-api.html#h)h

返回一个”虚拟节点“，通常缩写为 **VNode**：一个普通对象，其中包含向 Vue 描述它应在页面上渲染哪种节点的信息，包括所有子节点的描述。它的目的是用于手动编写的[渲染函数](https://v3.cn.vuejs.org/guide/render-function.html)：



## [#](https://v3.cn.vuejs.org/api/global-api.html#definecomponent)defineComponent

从实现上看，`defineComponent` 只返回传递给它的对象。但是，就类型而言，返回的值有一个合成类型的构造函数，用于手动渲染函数、TSX 和 IDE 工具支持。

### [#](https://v3.cn.vuejs.org/api/global-api.html#参数-3)参数

具有组件选项的对象

或者是一个 `setup` 函数，**函数名称将作为组件名称**来使用

```js
import { defineComponent, ref } from 'vue'

const HelloWorld = defineComponent(function HelloWorld() {
  const count = ref(0)
  return { count }
})
```

## defineAsyncComponent

创建一个只有在需要时才会加载的异步组件。

### [#](https://v3.cn.vuejs.org/api/global-api.html#参数-4)参数

对于基本用法，`defineAsyncComponent` 可以接受一个返回 `Promise` 的工厂函数。Promise 的 `resolve` 回调应该在服务端返回组件定义后被调用。你也可以调用 `reject(reason)` 来表示加载失败。

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)

app.component('async-component', AsyncComp)
```

当使用[局部注册](https://v3.cn.vuejs.org/guide/component-registration.html#局部注册)时，你也可以直接提供一个返回 `Promise` 的函数：

```js
import { createApp, defineAsyncComponent } from 'vue'

createApp({
  // ...
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import('./components/AsyncComponent.vue')
    )
  }
})
```

