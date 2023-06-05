# KeepAlive

`<KeepAlive>` 是一个内置组件，它的功能是在多个**组件间动态切换**时缓存被移除的**组件实例**。

## 基本使用[#](https://cn.vuejs.org/guide/built-ins/keep-alive.html#basic-usage)

在组件基础章节中，我们已经介绍了通过特殊的 `<component>` 元素来实现[动态组件](https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components)的用法：

```html
<component :is="activeComponent" />	
```

默认情况下，一个组件实例在被替换掉后会被销毁。

这会导致它丢失其中所有已变化的状态 —— 当这个组件再一次被显示时，会创建一个**只带有初始状态的新实例**。

在切换时创建新的组件实例通常是有意义的，但在这个例子中，我们的确想要组件能在被“切走”的时候保留它们的状态。

用 `<KeepAlive>` 内置组件将这些动态组件包装起来：

```html
<!-- 非活跃的组件将会被缓存！ -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```



## 包含/排除[#](https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude)

`<KeepAlive>` 默认会缓存内部的所有组件实例，但我们可以通过 `include` 和 `exclude` prop 来定制该行为。



## 缓存实例的生命周期

当一个组件实例从 DOM 上移除但因为被 `<KeepAlive>` 缓存而仍作为组件树的一部分时，它将变为**不活跃**状态而不是被卸载。

当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新**被激活**。

一个持续存在的**组件**可以通过 [`activated`](https://cn.vuejs.org/api/options-lifecycle.html#activated) 和 [`deactivated`](https://cn.vuejs.org/api/options-lifecycle.html#deactivated) 选项来注册相应的两个状态的生命周期钩子

请注意：

- `activated` 在组件挂载时也会调用，并且 `deactivated` 在组件卸载时也会调用。
- 这两个钩子不仅适用于 `<KeepAlive>` 缓存的根组件，也适用于**缓存树中的后代组件**。



## `<KeepAlive> API`[#](https://cn.vuejs.org/api/built-in-components.html#keepalive)

缓存包裹在其中的**动态切换组件**。

- **Props**

  ```ts
  interface KeepAliveProps {
    /**
     * 如果指定，则只有与 `include` 名称
     * 匹配的组件才会被缓存。
     */
    include?: MatchPattern
    /**
     * 任何名称与 `exclude`
     * 匹配的组件都不会被缓存。
     */
    exclude?: MatchPattern
    /**
     * 最多可以缓存多少组件实例。
     */
    max?: number | string
  }
  
  type MatchPattern = string | RegExp | (string | RegExp)[]
  ```

- **详细信息**

  `<KeepAlive>` 包裹动态组件时，会**缓存不活跃**的**组件实例**，而不是销毁它们。

  任何时候都只能有**一个活跃组件实例**作为 `<KeepAlive>` 的**直接子节点**。

  - 当一个组件在 `<KeepAlive>` 中被切换时，它的 `activated` 和 `deactivated` 生命周期钩子将被调用，用来替代 `mounted` 和 `unmounted`。
  - 这适用于 `<KeepAlive>` 的直接子节点及其所有子孙节点。

- **示例**

  基本用法：

  ```html
  <KeepAlive>
    <component :is="view"></component>
  </KeepAlive>
  ```

  与 `v-if` / `v-else` 分支一起使用时，同一时间**只能有一个组件被渲染**：

  ```html
  <KeepAlive>
    <comp-a v-if="a > 1"></comp-a>
    <comp-b v-else></comp-b>
  </KeepAlive>
  ```

  与 `<Transition>` 一起使用：

  ```html
  <Transition>
    <KeepAlive>
      <component :is="view"></component>
    </KeepAlive>
  </Transition>
  ```

  使用 `include` / `exclude`：

  ```html
  <!-- 用逗号分隔的字符串 -->
  <KeepAlive include="a,b">
    <component :is="view"></component>
  </KeepAlive>
  
  <!-- 正则表达式 (使用 `v-bind`) -->
  <KeepAlive :include="/a|b/">
    <component :is="view"></component>
  </KeepAlive>
  
  <!-- 数组 (使用 `v-bind`) -->
  <KeepAlive :include="['a', 'b']">
    <component :is="view"></component>
  </KeepAlive>
  ```

  使用 `max`：

  ```html
  <KeepAlive :max="10">
    <component :is="view"></component>
  </KeepAlive>
  ```