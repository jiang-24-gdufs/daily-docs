[toc]

# process

`process` 对象是一个 `global`，其提供有关当前 Node.js 进程的信息并对其进行控制。 

作为**全局变量**，其始终可用于 Node.js 应用程序，而**无需使用** `require()`。  子进程就没有这种特性

也可以使用 `require()` 显式访问它：

```js
const process = require('process');
```



## 进程事件



## 属性

### process.argv [#](http://nodejs.cn/api/process.html#process_process_argv)

`process.argv` 属性返回数组，其中包含启动 Node.js 进程时传入的命令行参数。 

1. 第一个元素将是 [`process.execPath`](http://nodejs.cn/api/process.html#process_process_execpath)。 如果需要访问 `argv[0]` 的原始值，请参阅 `process.argv0`。 
2. 第二个元素将是正在执行的 JavaScript 文件的路径。
3.  其余元素将是任何其他命令行参数。
4. 

例如，假设 `process-args.js` 有以下脚本：

```js
// 打印 process.argv
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
```

以如下方式启动 Node.js 进程：

```bash
$ node process-args.js one two=three four
```

将生成输出：

```text
0: /usr/local/bin/node
1: /Users/mjr/work/node/process-args.js
2: one
3: two=three
4: four
```



## 方法