https://v3.cn.vuejs.org/api/refs-api.html#ref

[TOC]

# Refs

> 本节例子中代码使用的[单文件组件](https://v3.cn.vuejs.org/guide/single-file-component.html)语法

## [#](https://v3.cn.vuejs.org/api/refs-api.html#ref)`ref`

接受一个内部值并返回一个响应式且可变的 ref 对象。

ref 对象仅有一个 `.value` property，指向该内部值。

**示例：**

```js
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

如果将对象分配为 ref 值，则通过 [reactive](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 函数使该对象具有高度的响应式。



**类型声明：**

```ts
interface Ref<T> {
  value: T
}

function ref<T>(value: T): Ref<T>
```

有时我们可能需要为 ref 的内部值指定复杂类型。

想要简洁地做到这一点，我们可以在**调用 `ref` 覆盖默认推断时传递一个泛型参数**：

```ts
const foo = ref<string | number>('foo') // foo 的类型：Ref<string | number>

foo.value = 123 // ok!
```

如果泛型的类型未知，建议将 `ref` 转换为 `Ref`：

```ts
function useState<State extends string>(initial: State) {
  const state = ref(initial) as Ref<State> // state.value -> State extends string
  return state
}
```



## `toRef`

可以用来为源响应式对象上的某个 property 新创建一个 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3
```

当你要将 prop 的 ref 传递给复合函数时，`toRef` 很有用：

```js
export default {
  setup(props) {
    useSomeFeature(toRef(props, 'foo'))
  }
}
```

即使源 property 不存在，`toRef` 也会返回一个可用的 ref。这使得它在使用可选 prop 时特别有用，可选 prop 并不会被 [`toRefs`](https://v3.cn.vuejs.org/api/refs-api.html#torefs) 处理。



## `toRefs`

**将响应式对象转换为普通对象**，其中结果**对象的每个 property 都是指向原始对象相应 property 的 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)。**

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const stateAsRefs = toRefs(state)
/*
stateAsRefs 的类型:

{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

// ref 和原始 property 已经“链接”起来了
state.foo++
console.log(stateAsRefs.foo.value) // 2

stateAsRefs.foo.value++
console.log(state.foo) // 3
```

当从组合式函数返回响应式对象时，`toRefs` 非常有用，这样消费组件就可以在**不丢失响应性**的情况下对返回的对象进行解构/展开：

```js
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // 操作 state 的逻辑

  // 返回时转换为ref
  return toRefs(state)
}

export default {
  setup() {
    // 可以在不失去响应性的情况下解构
    const { foo, bar } = useFeatureX()

    return {
      foo,
      bar
    }
  }
}
```

`toRefs` 只会为源对象中包含的 property 生成 ref。如果要为特定的 property 创建 ref，则应当使用 [`toRef`](https://v3.cn.vuejs.org/api/refs-api.html#toref)



# TODO...