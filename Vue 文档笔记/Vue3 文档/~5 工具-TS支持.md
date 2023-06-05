[TOC]

# TypeScript 支持

https://v3.cn.vuejs.org/guide/typescript-support.html





...

### 注解 Props [#](https://v3.cn.vuejs.org/guide/typescript-support.html#%E6%B3%A8%E8%A7%A3-props)

Vue 对定义了 `type` 的 prop 执行运行时验证。要将这些类型提供给 TypeScript，我们需要使用 `PropType` 指明构造函数：

```ts
import { defineComponent, PropType } from 'vue'
// 引入 PropType

interface Book {
  title: string
  author: string
  year: number
}

const Component = defineComponent({
  props: {
    name: String,
    id: [Number, String],
    success: { type: String },
    callback: {
      type: Function as PropType<() => void>
    },
    book: {
      type: Object as PropType<Book>,
      required: true
    },
    books: {
      type: Object as PropType<Books[]>,
      // type: Array as PropType<Books[]>, // or
      required: true
    },
    metadata: {
      type: null // metadata 的类型是 any
    }
  }
})
```

`Array<Book>`怎么设置props呢..  在state (interface) 后面加个[]表示数组



