[TOC]

# Data [#](https://v3.cn.vuejs.org/api/options-data.html)

## data

## props

## computed

## methods

## watch

## emits

- **类型：**`Array | Object`

- **详细：**

  emits 可以是数组或对象，**从组件触发自定义事件**，emits 可以是简单的数组，也可以是对象，后者允许配置事件验证。

  > 实现定义事件类型 或者事件对象

  在对象语法中，每个 property 的值可以为 `null` 或验证函数。验证函数将接收传递给 `$emit` 调用的其他参数。如果 `this.$emit('foo',1)` 被调用，`foo` 的相应验证函数将接收参数 `1`。验证函数应返回布尔值，以表示事件参数是否有效。

- **用法：**

  ```js
  const app = createApp({})
  
  // 数组语法
  app.component('todo-item', {
    emits: ['check'],
    created() {
      this.$emit('check')
    }
  })
  
  // 对象语法
  app.component('reply-form', {
    emits: {
      // 没有验证函数
      click: null,
  
      // 带有验证函数
      submit: payload => {
        if (payload.email && payload.password) {
          return true
        } else {
          console.warn(`Invalid submit event payload!`)
          return false
        }
      }
    }
  })
  ```

## expose (3.2+)

- **类型：** `Array`

- **详细：**

  一个将暴露在公共组件实例上的 property 列表。

  默认情况下，通过 [`$refs`](https://v3.cn.vuejs.org/api/instance-properties.html#refs)、[`$parent`](https://v3.cn.vuejs.org/api/instance-properties.html#parent) 或 [`$root`](https://v3.cn.vuejs.org/api/instance-properties.html#root) 访问到的公共实例与模板使用的组件内部实例是一样的。**`expose` 选项将限制公共实例可以访问的 property。**

  由 Vue 自身定义的 property，比如 `$el` 和 `$parent`，将始终可以被公共实例访问，并不需要列出。

- **用法：**

  ```js
  export default {
    // increment 将被暴露，
    // 但 count 只能被内部访问
    expose: ['increment'],
  
    data() {
      return {
        count: 0
      }
    },
  
    methods: {
      increment() {
        this.count++
      }
    }
  }
  ```

- **参考：** [defineExpose](https://v3.cn.vuejs.org/api/sfc-script-setup.html#defineexpose)