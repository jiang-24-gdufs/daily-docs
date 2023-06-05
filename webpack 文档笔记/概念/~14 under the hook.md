# Under the hook

between input and output, it also has [modules](https://webpack.js.org/concepts/modules/), [entry points](https://webpack.js.org/concepts/entry-points/), chunks, chunk groups, and many other intermediate parts.

在输入和输出之间，它也具有[模块](https://webpack.js.org/concepts/modules/)，[入口点](https://webpack.js.org/concepts/entry-points/)，块，块组和许多其他中间部分。



### module

Every file used in your project is a [Module](https://webpack.js.org/concepts/modules/)

项目中使用的每个文件都是一个[模块](https://webpack.js.org/concepts/modules/)

### graph

By using each other, the modules form a graph (`ModuleGraph`).

通过相互使用，这些模块形成一个图形（`模块图形`）。

### chunks

During the bundling process, modules are combined into chunks.

在捆绑过程中，模块被组合成**块**。

### ChunkGraph

Chunks combine into chunk groups and form a graph (`ChunkGraph`) interconnected through modules.

**块**组合成**块组**，并形成`ChunkGraph`通过模块互连的图形（`ChunkGraph`）。

When you describe an entry point - under the hood, you create a chunk group with one chunk.

当您描述一个入口点时，您将创建一个只有一个块的块组。

```js
module.exports = {
  entry: './index.js'
};
```

One chunk group with the `main` name created (`main` is the default name for an entry point). This chunk group contains `./index.js` module. As the parser handles imports inside `./index.js` new modules are added into this chunk.

一个具有`main`名称创建的块组（这`main`是入口点的默认名称）。该块组包含`./index.js`模块。随着解析器处理，`./index.js`新模块内部的导入将添加到该块中。



```js
module.exports = {
  entry: {
    home: './home.js',
    about: './about.js'
  }
};
```

Two chunk groups with names `home` and `about` are created. Each of them has a chunk with a module - `./home.js` for `home` and `./about.js` for `about`

将创建两个具有名称`home`和的块组`about`。他们每个人都有一个模块块- `./home.js`用于`home`与`./about.js`供`about`



## Chunks

Chunks come in two forms:

- `initial` is the main chunk for the entry point. This chunk contains all the modules and its dependencies that you specify for an entry point.
- `non-initial` is a chunk that may be lazy-loaded. It may appear when [dynamic import](https://webpack.js.org/guides/code-splitting/#dynamic-imports) or [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) is being used.

Each chunk has a corresponding **asset**. The assets are the output files - the result of bundling.

块有两种形式：

- `initial`是**入口点的主要块**。该块包含您为入口点指定的所有模块及其依赖项。
- `non-initial`是可以**延迟加载的块**。使用[动态导入](https://webpack.js.org/guides/code-splitting/#dynamic-imports)或[SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)时可能会出现。

每个块都有对应的**资产**。资产是输出文件-捆绑的结果。

**webpack.config.js**

```js
module.exports = {
  entry: './src/index.jsx'
};
```

**./src/index.js**

```js
import React from 'react';
import ReactDOM from 'react-dom';

import('./app.jsx').then(App => ReactDOM.render(<App />, root));
```

`main`创建具有名称的**初始块**。它包含：

- `./src/index.jsx`
- `react`
- `react-dom`

及其所有依赖项，除了 `./app.jsx`

`./app.jsx`由于该模块是**动态导入**的，因此创建了**非初始块**。

**输出：**

- `/dist/main.js`-  an `initial` chunk
- `/dist/394.js`- `non-initial` chunk

默认情况下，没有`non-initial`块的名称，因此使用唯一的ID代替名称。

使用动态导入时，我们可以通过使用[“魔术”注释](https://webpack.js.org/api/module-methods/#magic-comments)来显式指定块名称：

```js
import(
  /* webpackChunkName: "app" */
    /* 上面注释中webpackChunkName指定输出chunk的name */
  './app.jsx'
).then(App => ReactDOM.render(<App />, root));
```

# Output

输出文件的名称受配置中的两个字段的影响：

- [`output.filename`](https://webpack.js.org/configuration/output/#outputfilename)-用于`initial`块文件
- [`output.chunkFilename`](https://webpack.js.org/configuration/output/#outputchunkfilename)-用于`non-initial`块文件

这些字段中有[一些占位符](https://webpack.js.org/configuration/output/#template-strings)。最经常：

- `[id]`-块ID（例如`[id].js`-> `485.js`）
- `[name]`-块名称（例如`[name].js`-> `app.js`）。如果块没有名称，则将使用其ID
- `[contenthash]`-输出文件内容的md4-hash（例如`[contenthash].js`-> `4ea6ff1de66c537eb9b2.js`）





[SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)将一个块拆分为一个或多个块。





