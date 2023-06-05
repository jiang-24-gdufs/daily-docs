[toc]

# path

`path` 模块提供了用于处理文件和目录的路径的实用工具。 可以使用以下方式访问它：

```js
const path = require('path');
```



## 属性



## 方法

### path.resolve([...paths]) [#](http://nodejs.cn/api/path.html#path_path_resolve_paths)

- `...paths` [`<string>`](http://url.nodejs.cn/9Tw2bK) 路径或路径片段的序列
- 返回: [`<string>`](http://url.nodejs.cn/9Tw2bK)

`path.resolve()` 方法将**路径**或路径片段的序列**解析为绝对路径**。

给定的路径序列从右到左处理，每个后续的 `path` 会被追加到前面，直到构建绝对路径。
