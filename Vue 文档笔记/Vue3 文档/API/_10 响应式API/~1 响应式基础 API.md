

[TOC]

# [#](https://v3.cn.vuejs.org/api/basic-reactivity.html#响应性基础-api)响应性基础 API

> 本节例子中代码使用[单文件组件](https://v3.cn.vuejs.org/guide/single-file-component.html)语法



## [#](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive)`reactive`

返回对象的响应式副本

```js
const obj = reactive({ count: 0 })
```

**响应式转换是“深层”的**——它影响所有嵌套 property。

在基于 [ES2015 Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 的实现中，返回的 proxy 是**不**等于原始对象的。

建议只使用响应式 proxy，避免依赖原始对象。

**类型声明：**

```ts
function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
```



提示: `reactive` 将解包所有深层的 [refs](https://v3.cn.vuejs.org/api/refs-api.html#ref)，同时维持 ref 的响应性。

```ts
const count = ref(1)
const obj = reactive({ count })

// ref 会被解包
console.log(obj.count === count.value) // true

// 它会更新 `obj.count`
count.value++
console.log(count.value) // 2
console.log(obj.count) // 2

// 它也会更新 `count` ref
obj.count++
console.log(obj.count) // 3
console.log(count.value) // 3
```



> 重要: 当将 [ref](https://v3.cn.vuejs.org/api/refs-api.html#ref) 分配给 `reactive` property 时，ref 将被自动解包。

```ts
const count = ref(1)
const obj = reactive({})

obj.count = count

console.log(obj.count) // 1
console.log(obj.count === count.value) // true
```



## readonly

接受一个对象 (**响应式或纯对象**) 或 [ref](https://v3.cn.vuejs.org/api/refs-api.html#ref) 并返回原始对象的只读代理。只读代理是深层的：任何被访问的嵌套 property 也是只读的。

```js
const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // 用于响应性追踪
  console.log(copy.count)
})

// 变更 original 会触发依赖于副本的侦听器
original.count++

// 变更副本将失败并导致警告
copy.count++ // 警告!
```

与 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 一样，如果任何 property 使用了 `ref`，当它通过代理访问时，则被自动解包：

```js
const raw = {
  count: ref(123)
}

const copy = readonly(raw)

console.log(raw.count.value) // 123
console.log(copy.count) // 123
```

## isProxy

检查对象是否是由 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 或 [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly) 创建的 proxy。

## isReactive

检查对象是否是由 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 创建的响应式代理。

如果该代理是 [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly) 创建的，但包裹了由 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 创建的另一个代理，它也会返回 `true`。

## `isReadonly`

检查对象是否是由 [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly) 创建的只读代理。

# TODO...