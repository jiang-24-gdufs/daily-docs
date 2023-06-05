[TOC]

# TypeScript 工具类型

> INFO
>
> 此页面仅列出了一些可能需要解释其使用方式的常用工具类型。有关导出类型的完整列表，请查看[源代码](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/index.ts#L131)。

## `PropType<T>` [#](https://cn.vuejs.org/api/utility-types.html#proptypet)

用于在用**运行时 props 声明时**给一个 prop 标注更复杂的类型定义。

- **示例**

  ```ts
  import { PropType } from 'vue'
  
  interface Book {
    title: string
    author: string
    year: number
  }
  
  export default {
    props: {
      book: {
        // 提供一个比 `Object` 更具体的类型
        type: Object as PropType<Book>,
        required: true
      }
    }
  }
  ```

- **参考**：[指南 - 为组件 props 标注类型](https://cn.vuejs.org/guide/typescript/options-api.html#typing-component-props)

### [#](https://cn.vuejs.org/guide/typescript/options-api.html#typing-component-props)TypeScript 与选项式 API - 为组件的 props 标注类型

选项式 API 中对 props 的类型推导需要用 `defineComponent()` 来包装组件。

有了它，Vue 才可以通过 `props` 以及一些额外的选项，比如 `required: true` 和 `default` 来推导出 props 的类型：

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  // 启用了类型推导
  props: {
    name: String,
    id: [Number, String],
    msg: { type: String, required: true },
    metadata: null
  },
  mounted() {
    this.name // 类型：string | undefined
    this.id // 类型：number | string | undefined
    this.msg // 类型：string
    this.metadata // 类型：any
  }
})
```

然而，这种运行时 `props` 选项**仅支持使用构造函数来作为一个 prop 的类型**——没有办法**指定多层级对象或函数签名之类的复杂类型**。

可以使用 `PropType` 这个**工具类型来标记更复杂的 props 类型**：

```ts
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Book {
  title: string
  author: string
  year: number
}

export default defineComponent({
  props: {
    book: {
      // 提供相对 `Object` 更确定的类型
      type: Object as PropType<Book>,
      required: true
    },
    // 也可以标记函数
    callback: Function as PropType<(id: number) => void>
  },
  mounted() {
    this.book.title // string
    this.book.year // number

    // TS Error: argument of type 'string' is not
    // assignable to parameter of type 'number'
    this.callback?.('123')
  }
})
```



### [#](https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props)TypeScript 与组合式 API - 为组件的 props 标注类型

#### 使用`<script setup>`

当使用` <script setup>` 时，**`defineProps()` 宏函数**支持**从它的参数中推导类型**：
```ts
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```

这被称之为“**运行时声明**”，因为传递给 `defineProps()` 的参数会作为运行时的 `props` 选项使用。

然而，通过泛型参数来定义 props 的类型通常更直接：

```vue
<script setup lang="ts">
    
const props = defineProps<{ // 直接给defineProps传入一个泛型参数 <type>
  foo: string
  bar?: number
}>()
</script>
```

这被称之为“**基于类型的声明**”。

编译器会尽可能地尝试根据类型参数推导出等价的运行时选项。

在这种场景下，我们第二个例子中编译出的运行时选项和第一个是完全一致的。

基于类型的声明或者运行时声明可以择一使用，但是**不能同时使用**。

也可以将 props 的类型移入一个**单独的接口 (interface)** 中：

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

#### 语法限制[#](https://cn.vuejs.org/guide/typescript/composition-api.html#syntax-limitations)

为了生成正确的运行时代码，传给 `defineProps()` 的泛型参数必须是以下之一：

- 一个类型字面量：

  ```ts
  defineProps<{ /*... */ }>()
  ```

- 对**同一个文件**中的一个接口或对象类型字面量的引用：

  ```ts
  interface Props {/* ... */}
  
  defineProps<Props>()
  ```

接口或对象字面类型可以包含从其他文件导入的类型引用

但是，传递给 `defineProps` 的**泛型参数本身不能**是一个导入的类型：

```ts
import { Props } from './other-file'

// 不支持！
defineProps<Props>()
```

这是因为 **Vue 组件是单独编译**的，编译器目前不会抓取导入的文件以分析源类型。

我们计划在未来的版本中解决这个限制。

#### Props 解构默认值

当**使用基于类型的声明**时，我们失去了为 props **声明默认值**的能力。

针对**类型**的 `defineProps` **声明**的不足之处在于，它没有可以给 props 提供默认值的方式。

这可以通过 `withDefaults` **编译器宏**解决：

```ts
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

这将被编译为等效的运行时 props `default` 选项。此外，`withDefaults` 帮助程序为默认值提供类型检查，并确保返回的 props 类型删除了已声明默认值的属性的可选标志。

### 非 `<script setup>` 场景下

如果没有使用`<script setup>`，那么**为了开启 props 的类型推导，必须使用 defineComponent()**。

传入 setup() 的 props 对象类型是从 props 选项中推导而来

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    message: String
  },
  setup(props) {
    props.message // <-- 类型：string
  }
})
```



## ComponentCustomProperties[#](https://cn.vuejs.org/api/utility-types.html#componentcustomproperties)

用于增强组件实例类型以支持**自定义全局属性**。

## ComponentCustomOptions[#](https://cn.vuejs.org/api/utility-types.html#componentcustomoptions)

用来扩展组件选项类型以支持**自定义选项**。

## ComponentCustomProps[#](https://cn.vuejs.org/api/utility-types.html#componentcustomprops)

用于扩展全局可用的 TSX props，以便在 TSX 元素上使用没有在组件选项上定义过的 props。



## CSSProperties[#](https://cn.vuejs.org/api/utility-types.html#cssproperties)

用于扩展在样式属性绑定上允许的值的类型。

- **示例**

允许任意自定义 CSS 属性：

```ts
declare module 'vue' {
  interface CSSProperties {
    [key: `--${string}`]: string
  }
}
```

```tsx
<div style={ { '--bg-color': 'blue' } }>
```

```html
<div :style="{ '--bg-color': 'blue' }">
```