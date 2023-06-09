[TOC]

## 深入解析 Vue 的热更新原理，尤大是如何巧用源码中的细节 [$](https://mp.weixin.qq.com/s?__biz=MzU0MTU4OTU2MA==&mid=2247485045&idx=1&sn=ba472a4641a42f38e72c320924880bec&chksm=fb26ef22cc5166340c56cb4226134913b0b42c2df82a079d2f4d3e791a0237a4b34e916bdf31&mpshare=1&scene=1&srcid=0901kzxTPJdzdfrrRaRWX4Ib&sharer_sharetime=1598929915687&sharer_shareid=dd77661e1974996925a2c13e778b2919&key=bd016e65e5676701da9614b88804db232a0033bb5cbc3f5742e635a948c42a84267cef3165dd3055f5972e408461ee020ed5c2e43e09b4681aca409bbf6bae42f40c55b12c6a721ec69cd3bf86283312e919a69d5a1c1ecdb20817f1f8aa4b4908f1fbbb83460702a38181ca7e24766e8b7a41980a3d26175e284944bc568cc6&ascene=1&uin=MTgzNDQ0NjEyNw%3D%3D&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=A8ZCYQ%2BsgkpAUj5PGYoCkK0%3D&pass_ticket=4lHH1D7P48JR05YvIhNhO9HWA5VSmZBV%2FqqQu4MgZQ%2BAzFv40uJdUPx85tBAWXqQ) 

> 编者荐语：vue-hot-load-api [源码](https://github.com/vuejs/vue-hot-reload-api/blob/master/src/index.js) 原理解析，这个库虽然很小，但得益以 vue 的良好的设计，让它能够完整地实现热更新功能。让我们一步步来看这个库如何和 vue 结合，完成HMR的。

> 以下文章来源于前端从进阶到入院 ，作者ssh前端

大家都用过 Vue-CLI 创建 vue 应用，在开发的时候我们修改了 vue 文件，保存了文件，浏览器上就自动更新出我们写的组件内容，非常的顺滑流畅，大大提高了开发效率。想知道这背后是怎么实现的吗，其实代码并不复杂。

这个功能的实现底层用了vue-hot-load-api[1]这个库，得益于 vue 的良好设计，热更新的实现总共就一个 js 文件，200 行代码，绰绰有余。

而在这个库里涉及到的技巧又非常适合我们去深入了解 vue 内部的一些机制，所以赶快来和我一起学习吧。

## 提要

本文单纯的从`vue-hot-load-api`这个库出发，在浏览器的环境运行 Vue 的热更新示例，主要测试的组件是普通的 vue 组件而不是 functional 等特殊组件，以最简单的流程搞懂热更新的原理。
在源码解析中贴出的代码会省略掉一些不太相关的流程，更便于理解。

## 解析

### 从 github 仓库示例入手

进入了这个 github 仓库以后，最先开始看的肯定是 Readme 的里的示例，在看示例的时候作者给出的注释就非常重要了，他会标注出每一个重要的环节。并且我们要结合自己的一些经验排除掉和这个库无关的代码。（在这个示例中，webpack 的相关代码就可以先不去过多关注）

第一步需要调用`install`方法，传入 Vue 构造函数，根据注释来看，这一步是要知道这个库与 Vue 版本之间是否兼容。

```js
// make the API aware of the Vue that you are using.
// also checks compatibility.
api.install(Vue);
```

接下来的这段注释告诉我们，每个需要热更新的组件选项对象，我们都需要为它建立一个独一无二的 id，并且这段代码需要在初始化的时候完成。

```js
if (初始化) {
  // for each component option object to be hot-reloaded,
  // you need to create a record for it with a unique id.
  // do this once on startup.
  api.createRecord('very-unique-id', myComponentOptions);
}
```

最后就是激动人心的热更新时间了，
根据注释来看，这个库的使用分为两种情况。

- `rerender` 只有 template 或者 render 函改变的情况下使用。
- `reload` 如果 template 或者 render 未改变，则这个函数需要调用 reload 方法先销毁然后重新创建（包括它的子组件）。

```js
// if a component has only its template or render function changed,
// you can force a re-render for all its active instances without
// destroying/re-creating them. This keeps all current app state intact.
api.rerender('very-unique-id', myComponentOptions);

// --- OR ---

// if a component has non-template/render options changed,
// it needs to be fully reloaded. This will destroy and re-create all its
// active instances (and their children).
api.reload('very-unique-id', myComponentOptions);
```

从这个简单的示例里面可以看出，这个库的核心流程就是：

1. `api.install` 检测兼容性。
2. `api.createRecord` 为组件对象通过一个独一无二的 id 建立一个记录。
3. `api.rerender` 或`api.reload` 进行组件的热更新。

什么，Readme 的示例到此就结束了？这个 very-unique-id 到底是个什么东西，myComponentOptions 又是什么样的。

因为这个仓库可能并不是面向广大开发者的，所以它的文档写的非常的简略。其实看完了这个简短的示例，大家肯定还是一脸懵逼的。

在看一个你没有熟练使用的库的源码的时候，其实还有一个很关键的步骤，那就是看测试用例。

### 探索测试用例

测试用例[2]

上面我们总结出两个关键 api `rerender` 和 `reload` 之后，就带着目的性的去看测试用例。

```js
const Vue = require('vue');
const api = require('../src');

// 初始化
api.install(Vue);

// 这个方法接受id和组件选项对象，
// 通过createRecord去记录组件
// 然后返回一个vue组件实例。
function prepare(id, Comp) {
  api.createRecord(id, Comp);
  return new Vue({
    render: h => h(Comp),
  });
}
```

#### rerender 用例

```js
const id0 = 'rerender: mounted';
test(id0, done => {
  // 用'rerender: mounted'作为这个组件对象的id，
  // 这个组件的内容应该是 <div>foo</div>
  // 调用 $mount生成dom节点
  const app = prepare(id0, {
    render: h => h('div', 'foo'),
  }).$mount();

  // $el就是组件生成的dom元素，期望textContent文字内容为foo
  expect(app.$el.textContent).toBe('foo');

  // rerender 后dom节点变成 <div>bar</div>
  api.rerender(id0, {
    render: h => h('div', 'bar'),
  });

  // 通过nextTick保证dom节点已经更新
  // 期望textContent文字内容为bar
  Vue.nextTick(() => {
    expect(app.$el.textContent).toBe('bar');
    done();
  });
});
```

#### reload 用例

```js
const id1 = 'reload: mounted';
test(id1, done => {
  // 通过一个count来计数
  let count = 0;

  // app组件会在created的时候让count + 1
  // destroyed的时候让count - 1
  const app = prepare(id1, {
    created() {
      count++;
    },
    destroyed() {
      count--;
    },
    data: () => ({ msg: 'foo' }),
    render(h) {
      return h('div', this.msg);
    },
  }).$mount();
  // 确保内容正确
  expect(app.$el.textContent).toBe('foo');
  // 确保created周期执行 此时的count是1
  expect(count).toBe(1);

  // 调用created 传入新组件的created时 count会-1
  api.reload(id1, {
    created() {
      count--;
    },
    data: () => ({ msg: 'bar' }),
    render(h) {
      return h('div', this.msg);
    },
  });

  Vue.nextTick(() => {
    // 确保内容正确
    expect(app.$el.textContent).toBe('bar');
    // 在reload之前 count是1
    // 调用reload之后 会先调用前一个组件的destory生命周期 此时count是0
    // 接下来调用新组建的created生命周期 此时count是-1
    expect(count).toBe(-1);
    done();
  });
});
```

具体流程已经在注释里分析了，果然和示例代码的注释里写的一样，而且现在我们也更清楚这个 api 到底该怎么用了。

总结一个最简单的可用 demo

```js
import api from 'vue-hot-reload-api';
import Vue from 'vue';

// 初始化
api.install(Vue, true);

const appOptions = {
  render: h => h('div', 'foo'),
};

api.createRecord('my-app', appOptions);

new Vue(appOptions).$mount('#app');

setTimeout(() => {
  api.rerender('my-app', {
    render: h => h('div', 'bar'),
  });
}, 2000);
```

这个 demo（源码[3]）是直接在浏览器可用的，效果如下：![img](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

### 源码分析

源码地址[4]

#### 全局变量

进入 js 文件的入口，首先定义了一些变量

```js
// Vue构造函数
let Vue; // late bind
// Vue版本
let version;
// createRecord方法保存id -> 组件映射关系的对象
const map = Object.create(null);
if (typeof window !== 'undefined') {
  // 将map对象存储在window上
  window.__VUE_HOT_MAP__ = map;
}
// 是否已经安装过
let installed = false;
// 这个变量暂时没用
let isBrowserify = false;
// 初始化生命周期的名字 默认是Vue的beforeCreate生命周期
let initHookName = 'beforeCreate';
```

其实看到 window 对象的出现，我们就已经可以确定这个 api 可以在浏览器端调用。

#### install

```js
exports.install = function(vue, browserify) {
  // 如果安装过了就不再重复安装
  if (installed) {
    return;
  }
  installed = true;

  // 兼容es modules模块
  Vue = vue.__esModule ? vue.default : vue;
  // 把vue的版本如2.6.3分隔成[2, 6, 3] 这样的数组
  version = Vue.version.split('.').map(Number);
  isBrowserify = browserify;

  // compat with < 2.0.0-alpha.7
  // 兼容2.0.0-alpha.7以下版本
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init';
  }

  // 只有Vue在2.0以上的版本才支持这个库。
  exports.compatible = version[0] >= 2;
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    );
    return;
  }
};
```

可以看出 install 方法很简单，就是帮你看一下 Vue 的版本是否在 2.0 以上，确认一下兼容性，关于初始化生命周期，在这篇文章里我们就不考虑 2.0.0-alpha.7 以下版本，可以认为这个库的初始化工作就是在 beforeCreate 这个生命周期进行。

#### createRecord

```js
/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function(id, options) {
  // 如果已经存储过了就return
  if (map[id]) {
    return;
  }

  // 关键流程 下一步解析
  makeOptionsHot(id, options);

  // 将记录存储在map中
  // instances变量应该不难猜出是vue的实例对象。
  map[id] = {
    options: options,
    instances: [],
  };
};
```

这一步在把 id 和对应的 options 对象存进 map 后，就没做啥了，关键步骤肯定在于`makeOptionsHot`这个方法。

```js
/**
 * Make a Component options object hot.
 * 让一个组件对象变得性感...哦不，是支持热更新。
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  // options 就是我们传入的组件对象
  // initHookName 就是'beforeCreate'
  injectHook(options, initHookName, function() {
    // 这个函数会在beforeCreate声明周期执行
    const record = map[id];
    if (!record.Ctor) {
      // 此时this已经是vue的实例对象了
      // 把组件实例的构造函数赋值给record的Ctor属性。
      record.Ctor = this.constructor;
    }
    // 在instances里存储这个实例。
    record.instances.push(this);
  });
  // 在组件销毁的时候把上面存储的instance删除掉。
  injectHook(options, 'beforeDestroy', function() {
    const instances = map[id].instances;
    instances.splice(instances.indexOf(this), 1);
  });
}

// 往生命周期里注入某个方法
function injectHook(options, name, hook) {
  const existing = options[name];
  options[name] = existing
    ? Array.isArray(existing)
      ? existing.concat(hook)
      : [existing, hook]
    : [hook];
}
```

看完了这几个函数以后，我们对 createRecord 应该有个清晰的认识了。
比如上面我们的例子中这段代码

```js
const appOptions = {
  render: h => h('div', 'foo'),
};

api.createRecord('my-app', appOptions);
```

1. 在 map 中创建一个记录，这个记录有`options`字段也就是上面传入的组件对象，还有`instances`用于记录活动组件的实例，`Ctor`用来记录组件的构造函数。

```js
// map
{
    my-app: {
        options: appOptions,
        instances: [],
        Ctor: null
    }
}
```

1. 在 appOptions 中，混入生命周期方法 beforeCreate，在组件的这个生命周期中，把组件自身的示例 push 到 map 里对应 instances 数组中，并且记录自己的构造函数在 Ctor 字段上。 beforeCreate 执行完了以后的 map 对象长这样。![img](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

接下来进入关键的 rerender 函数。

#### rerender

```js
exports.rerender = (id, options) => {
  const record = map[id];
  if (!options) {
    // 如果没传第二个参数 就把所有实例调用 $forceUpdate
    record.instances.slice().forEach(instance => {
      instance.$forceUpdate();
    });
    return;
  }
  record.instances.slice().forEach(instance => {
    // 将实例上的 $options上的render直接替换为新传入的render函数
    instance.$options.render = options.render;
    // 执行 $forceUpdate更新视图
    instance.$forceUpdate();
  });
};
```

其实这个原函数很长，但是简化以后核心的更改视图的方法就是这些，平常我们在写 vue 单文件组件的时候都会像下面这样写：

```js
<template>
    <span>{{ msg }}</span>
</template>

<script>
export default {
  data() {
      return {
          msg: 'Hello World'
      }
  }
}
</script>
```

这样的.vue 文件，会被 vue-loader 编译成单个的组件选项对象，template 中的部分会被编译成 render 函数挂到组件上，最终生成的对象是类似于：

```js
export default {
  data() {
    return {
      msg: 'Hello World',
    };
  },
  render(h) {
    return h('span', this.msg);
  },
};
```

而在运行时，组件实例（也就是生命周期或者 methods 中访问的 this 对象）会通过option.render 去实现的。我们可以去 vue 的源码里验证一下我们的猜想。

![img](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)_render

而在options.render 给替换成新的 render 方法了，这个时候再调用$forceUpdate，不就渲染新传入的 render 了吗？这个运行时的偷天换日我不得不佩服~

#### reload

reload 的讲解我们基于这样一个示例：
一开始会显示 foo 的文本，一秒以后会显示成 bar。

```js
function prepare(id, Comp) {
  api.createRecord(id, Comp);
  return new Vue({
    render: h => h(Comp),
  });
}

const id1 = 'reload: mounted';
const app = prepare(id1, {
  data: () => ({ msg: 'foo' }),
  render(h) {
    return h('div', this.msg);
  },
}).$mount('#app');

// reload
setTimeout(() => {
  api.reload(id1, {
    data: () => ({ msg: 'bar' }),
    render(h) {
      return h('div', this.msg);
    },
  });
}, 1000);
```

reload 的情况会更加复杂，涉及到很多 Vue 内部的运行原理，这里只能简单的描述一下。

```
exports.reload = function(id, options) {
  const record = map[id];
  if (options) {
    // reload的情况下 传入的options会当做一个新的组件
    // 所以要用makeOptionsHot重新做一下记录
    makeOptionsHot(id, options);
    const newCtor = record.Ctor.super.extend(options);

    newCtor.options._Ctor = record.options._Ctor;
    record.Ctor.options = newCtor.options;
    record.Ctor.cid = newCtor.cid;
    record.Ctor.prototype = newCtor.prototype;
  }
  record.instances.slice().forEach(function(instance) {
    instance.$vnode.context.$forceUpdate();
  });
};
```

这段代码关键的点开始于

```js
const newCtor = record.Ctor.super.extend(options);
```

利用新传入的配置生成了一个新的组件构造函数 然后对 record 上的 Ctor 进行了一系列的赋值

```js
newCtor.options._Ctor = record.options._Ctor;
record.Ctor.options = newCtor.options;
record.Ctor.cid = newCtor.cid;
record.Ctor.prototype = newCtor.prototype;
```

注意第一次调用 reload 时，这里的 record.Ctor 还是最初传入的 Ctor，是由

```js
const app = prepare(id1, {
  data: () => ({ msg: 'foo' }),
  render(h) {
    return h('div', this.msg);
  },
}).$mount('#app');
```

这个配置对象所生成的构造函数，但是构造函数的 options、cid 和 prototype 被替换成了由

```js
api.reload(id1, {
  data: () => ({ msg: 'bar' }),
  render(h) {
    return h('div', this.msg);
  },
});
```

这个配置对象所生成的构造函数上的 options、cid 和 prototype，此时的 cid 肯定是不同的。

也就是说，**构造函数的 cid 变了！**，这个点记住后面要考！

继续看源码

```js
record.instances.slice().forEach(function(instance) {
  instance.$vnode.context.$forceUpdate();
});
```

此时的 instance 只有一个，就是在 reload 之前运行的那个 msg 为 foo 的实例，它的$vnode.context 是什么呢？![img](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)
直接在放上控制台打印出来的截图，这个 context 是一个 vue 实例，注意这个 options 里的 render 函数，是不是非常眼熟，没错，这个 vue 实例其实就是我们的 prepare 函数中

```js
new Vue({
  render: h => h(Comp),
});
```

返回的 vm 实例。

那么这个函数的 $forceUpdate必然会触发 `render: h => h(Comp)` 这个函数，看到此时我们似乎还是没看出来这些操作为什么会销毁旧组件，创建新组件。那么此时只能探究一下这个h到底做了什么，这个h就是对应着 $createElement 方法。

![img](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)$createElement方法

$createElement 在创建 vnode 的时候，最底层会调用一个 createComponent 方法，

这个方法把 Comp 对象当做 Ctor，然后调用 Vue.extend 这个 api 创造出构造函数，

默认情况下第一次 h(Comp) 会生成类似于 vue-component-${cid}作为组件的 tag，

在本例中最开始渲染 msg 为 foo 的组件时，tag 为 vue-component-1，

并且会把这个构造函数缓存在_Ctor 这个变量上，这样下次渲染再执行到 createComponent 的时候就不需要重新生成一次构造函数了，

Vue 在选择更新策略时调用一个`sameVnode`方法

来决定是要进行打补丁，还是彻底销毁重建，这个`sameVnode`如下：

```js
function sameVnode(a, b) {
  return (
    // 省略其他...
    a.tag === b.tag
  );
}
```

其中很关键的一个对比就是`a.tag === b.tag`

但是 reload 方法偷梁换柱把 Ctor 的 cid 换成了 2，

生成的 vnode 的 tag 是就 vue-component-2

后续再调用 context.$forceUpdate 的时候，会发现两个组件的 tag 不一样，所以就走了销毁 -> 重新创建的流程。

## 总结

这个库里面还是能看出很多尤大的编程风格，很适合进行学习，只是 reload 方法必须要深入了解 Vue 源码才有可能搞懂生效的原理。

可以看出来 Vue 的很多第三方库是利用 Vue 内部提供的一些机制，甚至是只有了解源码细节才能想到的一些 hack 的方式去实现的，所以如果想更加深入的玩好 Vue，源码是有必要去学习的，在学习 Vue 源码的过程中会被尤大的代码规范，还有一些精妙的设计所折服，肯定会有很大的收获。

`rerender`这个方法相对来说还是比较好理解的，但是`reload`方法是怎么生效的就非常让人难以理解了，我一步一步断点调试了大概六七个小时，才渐渐得出结论，只能说好用的 api 后面潜藏着作者用心良苦的设计啊！想要彻底深入的理解 vue 的原理，强烈推荐黄轶老师的这门课程：

Vue.js 源码全方位深入解析 （含 Vue3.0 源码分析）[5]



### 参考资料

[1]vue-hot-load-api: *https://github.com/vuejs/vue-hot-reload-api*

[2]测试用例: *https://github.com/vuejs/vue-hot-reload-api/blob/master/test/test.js*

[3]源码: *https://github.com/sl1673495/vue-hot-reload-demo*

[4]源码地址: *https://github.com/vuejs/vue-hot-reload-api/blob/master/src/index.js*

[5]Vue.js 源码全方位深入解析 （含 Vue3.0 源码分析）: *https://coding.imooc.com/class/228.html*e

