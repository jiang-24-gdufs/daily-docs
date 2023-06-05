[toc]

# Computed 与 watch

[TOC]

## `computed`

接受一个 **getter 函数**，并根据 getter 的返回值返回一个**不可变readonly**的响应式 [ref](https://v3.cn.vuejs.org/api/refs-api.html#ref) 对象。

```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // 错误
```

或者，接受一个**具有 `get` 和 `set` 函数的对象**，用来创建可写的 ref 对象。

```js
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: val => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0
```

**类型声明：**

```ts
// 只读的
function computed<T>(
  getter: () => T,
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>

// 可写的
function computed<T>(
  options: {
    get: () => T
    set: (value: T) => void
  },
  debuggerOptions?: DebuggerOptions
): Ref<T>
interface DebuggerOptions {
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}
interface DebuggerEvent {
  effect: ReactiveEffect
  target: any
  type: OperationTypes
  key: string | symbol | undefined
}
```



## `watchEffect`

**立即执行传入的一个函数**，同时响应式**追踪其依赖**，并在其依赖变更时重新运行该函数。

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)
```

**类型声明：**

```ts
function watchEffect(
  effect: (onInvalidate: InvalidateCbRegistrator) => void,
  options?: WatchEffectOptions
): StopHandle

interface WatchEffectOptions {
  flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

interface DebuggerEvent {
  effect: ReactiveEffect
  target: any
  type: OperationTypes
  key: string | symbol | undefined
}

type InvalidateCbRegistrator = (invalidate: () => void) => void

type StopHandle = () => void
```

**参考**：[`watchEffect` 指南](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#watcheffect)

如果需要在组件更新**后**(例如：当与[模板引用](https://v3.cn.vuejs.org/guide/composition-api-template-refs.html#侦听模板引用)一起)重新运行侦听器副作用，我们可以传递带有 `flush` 选项的附加 `options` 对象 (默认为 `'pre'`)：

```js
// 在组件更新后触发，这样你就可以访问更新的 DOM。
// 注意：这也将推迟副作用的初始运行，直到组件的首次渲染完成。
watchEffect(
  () => {
    /* ... */
  },
  {
    flush: 'post'
  }
)
```

`flush` 选项还接受 `sync`，这将强制效果始终同步触发。然而，这是低效的，应该很少需要。

从 Vue 3.2.0 开始，`watchPostEffect` 和 `watchSyncEffect` 别名也可以用来让代码意图更加明显。



## `watchPostEffect` 3.2+

`watchEffect` 的别名，带有 `flush: 'post'` 选项。

## `watchSyncEffect` 3.2+

`watchEffect` 的别名，带有 `flush: 'sync'` 选项。



## watch

`watch` API 与选项式 API [this.$watch](https://v3.cn.vuejs.org/api/instance-methods.html#watch) (以及相应的 [watch](https://v3.cn.vuejs.org/api/options-data.html#watch) 选项) 完全等效。

`watch` 需要侦听特定的数据源，并在单独的回调函数中执行副作用。

默认情况下，它也是惰性的——即回调**仅在侦听源**发生变化时被调用。



与 [watchEffect](https://v3.cn.vuejs.org/api/computed-watch-api.html#watcheffect) 相比，`watch` 允许我们：

- **惰性地执行副作用**；
- 更**具体地**说明应触发侦听器重新运行的状态；
- **访问被侦听状态的先前值和当前值**

1.  (watchEffect 可以**同时追踪多个依赖** ; 并在其依赖变更时重新运行该函数。)
2. 
3. 可以在回调函数中访问 变化前后的值

### 侦听单一源

侦听器数据源可以是

- 一个具有返回值的 getter 函数，
- 也可以直接是一个 [ref](https://v3.cn.vuejs.org/api/refs-api.html#ref)

```ts
// 侦听一个 getter
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// 直接侦听一个 ref
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```

### 侦听多个源

侦听器还可以使用数组以同时侦听多个源：

```js
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
})
```

### 与 `watchEffect` 相同的行为

`watch` 与 [`watchEffect`](https://v3.cn.vuejs.org/api/computed-watch-api.html#watcheffect) 在[手动停止侦听](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#停止侦听)、[清除副作用](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#清除副作用) (将 `onInvalidate` 作为第三个参数传递给回调)、[刷新时机](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#副作用刷新时机)和[调试](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#侦听器调试)方面有相同的行为。



**类型声明：**

```ts
// 侦听单一源
function watch<T>(
  source: WatcherSource<T>,
  callback: (
    value: T,
    oldValue: T,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options?: WatchOptions
): StopHandle

// 侦听多个源
function watch<T extends WatcherSource<unknown>[]>(
  sources: T
  callback: (
    values: MapSources<T>,
    oldValues: MapSources<T>,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options? : WatchOptions
): StopHandle

type WatcherSource<T> = Ref<T> | (() => T)

type MapSources<T> = {
  [K in keyof T]: T[K] extends WatcherSource<infer V> ? V : never
}

// 参见 `watchEffect` 共享选项的类型声明
interface WatchOptions extends WatchEffectOptions {
  immediate?: boolean // 默认：false
  deep?: boolean
}
```



**参考**：[`watch` 指南](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#watch)