# VNode Lifecycle Events

虚拟节点生命周期事件

## Overview[#](https://v3-migration.vuejs.org/breaking-changes/vnode-lifecycle-events.html#overview)

In Vue 2, it was possible to use events to listen for key stages in a component's lifecycle. 

These events had names that started with the prefix `hook:`, followed by the name of the corresponding lifecycle hook.



In Vue 3, **this prefix has been changed to `vue:`**. 

In addition, these events are now **available for HTML elements** as well as components.



In Vue 2, the event name is the same as the equivalent lifecycle hook, prefixed with `hook:`:

```
<template>
  <child-component @hook:updated="onUpdated">
</template>
```

## 3.x Syntax[#](https://v3-migration.vuejs.org/breaking-changes/vnode-lifecycle-events.html#_3-x-syntax)

In Vue 3, the event name is prefixed with `vue:`:

```
<template>
  <child-component @vue:updated="onUpdated">
</template>
```

**改变了前缀** @hook -> @vue