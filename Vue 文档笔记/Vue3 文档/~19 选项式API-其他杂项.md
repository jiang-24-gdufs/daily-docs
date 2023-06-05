## name[#](https://cn.vuejs.org/api/options-misc.html#name)

用于显式声明组件展示时的名称。

组件的名字有以下用途：

- 在组件自己的模板中递归引用自己时
- 在 Vue 开发者工具中的组件树显示时
- 在组件抛出的警告追踪栈信息中显示时



在使用单文件组件时，组件已经会根据其文件名推导出其名称。

举例来说，一个名为 `MyComponent.vue` 的文件会推导出显示名称为“MyComponent”。

在 3.2.34 或以上的版本中，使用 `<script setup>` 的单文件组件会自动根据`<KeepAlive>`对应的 `name` 选项，即使是在配合 `<KeepAlive>` 使用时也无需再手动声明。



当一个组件通过 [`app.component`](https://cn.vuejs.org/api/application.html#app-component) 被全局注册时，这个全局 ID 就自动被设为了其名称。



使用 `name` 选项使你可以覆盖推导出的名称，或是在没有推导出名字时显式提供一个。(例如没有使用构建工具时，或是一个内联的非 SFC 式的组件)

有一种场景下 `name` 必须是已显式声明的：即 [`<keepAlive>`](https://cn.vuejs.org/guide/built-ins/keep-alive.html) 通过其 `include / exclude` prop 来匹配其需要缓存的组件时。



## inheritAttrs[#](https://cn.vuejs.org/api/options-misc.html#inheritattrs)

用于控制是否启用默认的组件 attribute **透传**行为。

- **类型**

  ```
  interface ComponentOptions {
    inheritAttrs?: boolean // 默认值：true
  }
  ```

- **详细信息**

  默认情况下，父组件传递的，但**没有被子组件解析为 props** 的 attributes 绑定会被“透传”。

  这意味着当我们有一个单根节点的子组件时，这些绑定会被作为一个常规的 HTML attribute 应用在子组件的根节点元素上。

  当你编写的组件想要在一个目标元素或其他组件外面包一层时，可能并不期望这样的行为。

  我们可以通过设置 `inheritAttrs` 为 `false` 来禁用这个默认行为。

  这些 attributes 可以通过 `$attrs` 这个实例属性来访问，并且可以通过 `v-bind` 来显式绑定在一个非根节点的元素上。