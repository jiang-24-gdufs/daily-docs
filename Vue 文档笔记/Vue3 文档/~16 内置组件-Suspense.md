# Suspense[#](https://cn.vuejs.org/guide/built-ins/suspense.html#suspense)



> `<Suspense>` 是一项实验性功能。
>
> 它不一定会最终成为稳定功能，并且在稳定之前相关 API 也可能会发生变化。

`<Suspense>` 是一个内置组件，用来在**组件树中协调对异步依赖的处理**。



It can render **a loading state** while **waiting** for **multiple nested async dependencies** down the component tree to be resolved.

它让我们可以在组件树**上层等待下层的多个嵌套异步依赖项解析完成**，并可以在等待时渲染一个加载状态。