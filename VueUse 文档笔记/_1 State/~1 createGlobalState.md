[toc]

# createGlobalState[#](https://vueuse.org/shared/createGlobalState/#createglobalstate)

Keep states in the global scope to be reusable across Vue instances.

将状态保留在全局范围内，以便在不同的Vue实例中可重复使用。

#### 源码: 

```ts
import { effectScope } from 'vue-demi'

export type CreateGlobalStateReturn<T> = () => T

export function createGlobalState<T>(
  stateFactory: () => T,
): CreateGlobalStateReturn<T> {
  let initialized = false
  let state: T
  const scope = effectScope(true)

  return () => {
    if (!initialized) {
      state = scope.run(stateFactory)!
      initialized = true
    }
    return state
  }
}
```

单例模式..

接收一个状态工厂函数, 函数返回一个状态 state

内部闭包一个状态开关和一个scope作用域. `effectScope(true)`

返回一个函数, 该函数多次执行都只返回同一个状态.



## Demo

```vue
<script setup lang="ts">
import { stringify } from '@vueuse/docs-utils'
import { createGlobalState, useStorage } from '@vueuse/core'

const useState = createGlobalState(() =>
  useStorage('vue-use-locale-storage', {
    name: 'Banana',
    color: 'Yellow',
    size: 'Medium',
  }),
)

const state = useState()
const text = stringify(state)
</script>

<template>
  <div>
    <input v-model="state.name" type="text">
    <input v-model="state.color" type="text">
    <input v-model="state.size" type="text">

    <pre lang="yaml">{{ text }}</pre>
  </div>
</template>

```





## Usage[#](https://vueuse.org/shared/createGlobalState/#usage)

### Without Persistence (Store in Memory)

```ts
// store.js
import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => {
    const count = ref(0)
    return { count }
  }
)

```

A bigger example:

```ts
// store.js
import { computed, ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => {
    // state
    const count = ref(initialValue)

    // getters
    const doubleCount = computed(() => count.value * 2)

    // actions
    function increment() {
      count.value++
    }

    return { count, doubleCount, increment }
  }
)
```

**简易 pinia**

pinia源码中也确实使用了 effectScope



### With Persistence

Store in `localStorage` with `useStorage()`:

```ts
// store.js
import { createGlobalState, useStorage } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => useStorage('vueuse-local-storage', 'initialValue'),
)
```

```ts
// component.js
import { useGlobalState } from './store'

export default defineComponent({
  setup() {
    const state = useGlobalState()
    return { state }
  },
})
```

