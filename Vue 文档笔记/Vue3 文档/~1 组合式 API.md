# 组合式API 

[组合式API](https://v3.cn.vuejs.org/guide/composition-api-introduction.html)

在组件之外创建更细的独立**组合式函数** (以负责不同功能的逻辑分类)

​	组合式函数通过创建不依赖于组件的响应式数据

​		(ref/watch/computed/生命周期等)

在组件setup函数中把各个组合式函数组合起来暴露函数中的响应式数据和方法给组件使用; 

**setup函数返回的结果可以用于组件的其余部分**

> WARNING
>
> 在 `setup` 中你应该避免使用 `this`，因为它不会找到组件实例。`setup` 的调用发生在 `data` property、`computed` property 或 `methods` 被解析之前，所以它们无法在 `setup` 中被获取。



**<u>`setup` 选项</u>是一个接收 `props` 和 `context` 的函数，我们将在[之后](https://v3.cn.vuejs.org/guide/composition-api-setup.html#参数)进行讨论。**

**此外，我们将 `setup` <u>返回的所有内容</u>都暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。**