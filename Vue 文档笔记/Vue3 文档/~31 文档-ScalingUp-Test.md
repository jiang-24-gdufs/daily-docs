[toc]

## 测试的类型[#](https://cn.vuejs.org/guide/scaling-up/testing.html#testing-types)

当设计你的 Vue 应用的测试策略时，你应该利用以下几种测试类型：

- **单元测试**：检查给定函数、类或组合式函数的输入是否产生预期的输出或副作用。
- **组件测试**：检查你的组件是否正常挂载和渲染、是否可以与之互动，以及表现是否符合预期。这些测试比单元测试导入了更多的代码，更复杂，需要更多时间来执行。
- **端到端测试**：检查跨越多个页面的功能，并对生产构建的 Vue 应用进行实际的网络请求。这些测试通常涉及到建立一个数据库或其他后端。

每种测试类型在你的应用的测试策略中都发挥着作用，保护你免受不同类型的问题的影响。



## 总览[#](https://cn.vuejs.org/guide/scaling-up/testing.html#overview)

我们将简要地讨论这些测试是什么，以及如何在 Vue 应用中实现它们，并提供一些普适性建议。



## 单元测试[#](https://cn.vuejs.org/guide/scaling-up/testing.html#unit-testing)

编写单元测试是为了验证**小的、独立的代码单元**是否按预期工作。

一个单元测试通常覆盖**一个单个函数、类、组合式函数或模块**。

单元测试侧重于逻辑上的正确性，只关注应用整体功能的一小部分。

他们可能会模拟你的应用环境的很大一部分（如初始状态、复杂的类、第三方模块和网络请求）。

一般来说，单元测试将捕获函数的业务逻辑和逻辑正确性的问题。

这些通常是与 Vue 无关的纯 JavaScript/TypeScript 模块。

一般来说，在 Vue 应用中为业务逻辑编写单元测试与使用其他框架的应用没有明显区别。



### 组合式函数[#](https://cn.vuejs.org/guide/scaling-up/testing.html#composables)

有一类 Vue 应用中特有的函数被称为 [组合式函数](https://cn.vuejs.org/guide/reusability/composables.html)，在测试过程中可能需要特殊处理。 你可以跳转到下方查看 [测试组合式函数](https://cn.vuejs.org/guide/scaling-up/testing.html#testing-composables) 了解更多细节。



### 组件的单元测试[#](https://cn.vuejs.org/guide/scaling-up/testing.html#unit-testing-components)

一个组件可以通过两种方式测试：

1. 白盒：单元测试

   白盒测试知晓一个组件的实现细节和依赖关系。它们更专注于将组件进行更 **独立** 的测试。这些测试通常会涉及到模拟一些组件的部分子组件，以及设置插件的状态和依赖性（例如 Vuex）。

2. 黑盒：组件测试

   黑盒测试不知晓一个组件的实现细节。这些测试尽可能少地模拟，以测试组件在整个系统中的集成情况。它们通常会渲染所有子组件，因而会被认为更像一种“集成测试”。请查看下方的[组件测试建议](https://cn.vuejs.org/guide/scaling-up/testing.html#component-testing)作进一步了解。



### 推荐方案[#](https://cn.vuejs.org/guide/scaling-up/testing.html#recommendation)

- [Vitest](https://vitest.dev/)

  因为由 `create-vue` 创建的官方项目配置是基于 [Vite](https://cn.vitejs.dev/) 的，所以我们推荐你使用一个可以利用同一套 Vite 配置和转换管道的单元测试框架。

  [Vitest](https://cn.vitest.dev/) 正是一个针对此目标设计的单元测试框架，它由 Vue / Vite 团队成员开发和维护。

  在 Vite 的项目集成它会非常简单，而且速度非常快。



## 组件测试[#](https://cn.vuejs.org/guide/scaling-up/testing.html#component-testing)

在 Vue 应用中，主要用组件来构建用户界面。因此，当验证应用的行为时，组件是一个很自然的独立单元。

从粒度的角度来看，组件测试位于单元测试之上，可以被认为是集成测试的一种形式。

你的 Vue 应用中大部分内容都应该由组件测试来覆盖，我们**建议每个 Vue 组件都应有自己的组件测试文件**。

组件测试应该捕捉组件中的 prop、事件、提供的插槽、样式、CSS class 名、生命周期钩子，和其他相关的问题。

组件测试不应该模拟子组件，而应该像用户一样，**通过与组件互动来测试组件和其子组件之间的交互**。例如，组件测试应该像用户那样点击一个元素，而不是编程式地与组件进行交互。



组件测试主要需要**关心组件的公开接口**而不是内部实现细节。对于大部分的组件来说，公开接口包括触发的事件、prop 和插槽。

当进行测试时，请记住，**测试这个组件做了什么，而不是测试它是怎么做到的**。



- **推荐的做法**

  - 对于 **视图** 的测试：根据输入 prop 和插槽断言渲染输出是否正确。
  - 对于 **交互** 的测试：断言渲染的更新是否正确或触发的事件是否正确地响应了用户输入事件。

  在下面的例子中，我们展示了一个步进器（Stepper）组件，它拥有一个标记为 `increment` 的可点击的 DOM 元素。我们还传入了一个名为 `max` 的 prop 防止步进器增长超过 `2`，因此如果我们点击了按钮 3 次，视图将仍然显示 `2`。

  我们不了解这个步进器的实现细节，只知道“输入”是这个 `max` prop，“输出”是这个组件状态所呈现出的视图。



- **应避免的做法**

  不要去断言一个组件实例的私有状态或测试一个组件的私有方法。测试实现细节会使测试代码太脆弱，因为当实现发生变化时，它们更有可能失败并需要更新重写。

  组件的最终工作是渲染正确的 DOM 输出，所以专注于 DOM 输出的测试提供了足够的正确性保证（如果你不需要更多其他方面测试的话），同时更加健壮、需要的改动更少。

  不要完全依赖快照测试。断言 HTML 字符串并不能完全说明正确性。应当编写有意图的测试。

  如果一个方法需要测试，把它提取到一个独立的实用函数中，并为它写一个专门的单元测试。如果它不能被直截了当地抽离出来，那么对它的调用应该作为交互测试的一部分。



### 推荐方案[#](https://cn.vuejs.org/guide/scaling-up/testing.html#recommendation-1)

- [Vitest](https://vitest.dev/) 对于组件和组合式函数都采用无头渲染的方式 (例如 VueUse 中的 [`useFavicon`](https://vueuse.org/core/useFavicon/#usefavicon) 函数)。组件和 DOM 都可以通过 [@testing-library/vue](https://testing-library.com/docs/vue-testing-library/intro) 来测试。
- [Cypress 组件测试](https://on.cypress.io/component) 会预期其准确地渲染样式或者触发原生 DOM 事件。可以搭配 [@testing-library/cypress](https://testing-library.com/docs/cypress-testing-library/intro) 这个库一同进行测试。

Vitest 和基于浏览器的运行器之间的主要区别是速度和执行上下文。

简而言之，基于浏览器的运行器，如 Cypress，可以捕捉到基于 Node 的运行器（如 Vitest）所不能捕捉的问题（比如样式问题、原生 DOM 事件、Cookies、本地存储和网络故障），但基于浏览器的运行器比 Vitest *慢几个数量级*，因为它们要执行打开浏览器，编译样式表以及其他步骤。

Cypress 是一个基于浏览器的运行器，支持组件测试。请阅读 [Vitest 文档的“比较”这一章](https://vitest.dev/guide/comparisons.html#cypress) 了解 Vitest 和 Cypress 最新的比较信息。



### 组件挂载库[#](https://cn.vuejs.org/guide/scaling-up/testing.html#mounting-libraries)

组件测试通常涉及到单独挂载被测试的组件，触发模拟的用户输入事件，并对渲染的 DOM 输出进行断言。有一些专门的工具库可以使这些任务变得更简单。

- [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library) 是一个 Vue 的测试库，专注于测试组件而不依赖其他实现细节。因其良好的设计使得代码重构也变得非常容易。它的指导原则是，测试代码越接近软件的使用方式，它们就越值得信赖。
- [`@vue/test-utils`](https://github.com/vuejs/test-utils) 是官方的底层组件测试库，用来提供给用户访问 Vue 特有的 API。`@testing-library/vue` 也是基于此库构建的。

我们推荐使用 `@testing-library/vue` 测试应用中的组件, 因为它更匹配整个应用的测试优先级。只有在你构建高级组件、并需要测试内部的 Vue 特有 API 时再使用 `@vue/test-utils`。



## 端到端（E2E）测试