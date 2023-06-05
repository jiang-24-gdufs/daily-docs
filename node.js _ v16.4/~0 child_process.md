[TOC]

# child_process 子进程

`child_process` 模块提供了以与 [`popen(3)`](http://url.nodejs.cn/zGgP4K) 类似但不完全相同的方式衍生子进程的能力。 

此功能主要由 [`child_process.spawn()`](http://nodejs.cn/api/child_process.html#child_process_child_process_spawn_command_args_options) 函数提供：

```js
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

默认情况下，会在父 Node.js 进程和衍生的子进程之间建立 `stdin`、`stdout` 和 `stderr` 的管道。这些管道的容量有限（且特定于平台）。

如果子进程在没有捕获输出的情况下写入标准输出超过该限制，则子进程会阻塞等待管道缓冲区接受更多数据。 

这与 shell 中管道的行为相同。 如果不消费输出，则使用 `{ stdio: 'ignore' }` 选项。

如果在 `options` 对象中有 `options.env.PATH` 环境变量，则使用其执行命令查找。 否则，使用 `process.env.PATH`。

在 Windows 上，环境变量不区分大小写。 Node.js 按字典顺序对 `env` 键进行排序，并使用不区分大小写匹配的第一个键。 只有第一个（按字典顺序）条目将传给子流程。 当传给 `env` 选项的对象具有多个相同键名的变体时（例如 `PATH` 和 `Path`），在 Windows 上可能会导致出现问题。



[`child_process.spawn()`](http://nodejs.cn/api/child_process.html#child_process_child_process_spawn_command_args_options) 方法异步**衍生子进程**，不会阻塞 Node.js 事件循环。 [`child_process.spawnSync()`](http://nodejs.cn/api/child_process.html#child_process_child_process_spawnsync_command_args_options) 函数以同步方式提供等效的功能，其会阻塞事件循环，直到衍生的进程退出或终止。



为方便起见，`child_process` 模块提供了一些同步和异步方法替代 [`child_process.spawn()`](http://nodejs.cn/api/child_process.html#child_process_child_process_spawn_command_args_options) 和 [`child_process.spawnSync()`](http://nodejs.cn/api/child_process.html#child_process_child_process_spawnsync_command_args_options)。

这些替代方法中的每一个都是基于 [`child_process.spawn()`](http://nodejs.cn/api/child_process.html#child_process_child_process_spawn_command_args_options) 或 [`child_process.spawnSync()`](http://nodejs.cn/api/child_process.html#child_process_child_process_spawnsync_command_args_options) 实现。

- [`child_process.exec()`](http://nodejs.cn/api/child_process.html#child_process_child_process_exec_command_options_callback): **衍生 shell 并在该 shell 中运行命令**，完成后将 `stdout` 和 `stderr` 传给回调函数。
- [`child_process.execSync()`](http://nodejs.cn/api/child_process.html#child_process_child_process_execsync_command_options): [`child_process.exec()`](http://nodejs.cn/api/child_process.html#child_process_child_process_exec_command_options_callback) 的同步版本，其将阻塞 Node.js 事件循环。
- [`child_process.execFile()`](http://nodejs.cn/api/child_process.html#child_process_child_process_execfile_file_args_options_callback): 与 [`child_process.exec()`](http://nodejs.cn/api/child_process.html#child_process_child_process_exec_command_options_callback) 类似，不同之处在于，默认情况下，它**直接衍生命令，而不先衍生 shell**。
- [`child_process.execFileSync()`](http://nodejs.cn/api/child_process.html#child_process_child_process_execfilesync_file_args_options): [`child_process.execFile()`](http://nodejs.cn/api/child_process.html#child_process_child_process_execfile_file_args_options_callback) 的同步版本，其将阻塞 Node.js 事件循环。
- [`child_process.fork()`](http://nodejs.cn/api/child_process.html#child_process_child_process_fork_modulepath_args_options): **衍生新的 Node.js 进程**并使用建立的 IPC 通信通道（其允许在父子进程之间发送消息）调用指定的模块。

对于某些情况，例如自动化 shell 脚本，[同步的方法](http://nodejs.cn/api/child_process.html#child_process_synchronous_process_creation)可能更方便。 但是，在许多情况下，由于在衍生的进程完成前会停止事件循环，**同步方法会对性能产生重大影响**。

## 异步创建的进程

[`child_process.spawn()`](http://nodejs.cn/api/child_process.html#child_process_child_process_spawn_command_args_options)、[`child_process.fork()`](http://nodejs.cn/api/child_process.html#child_process_child_process_fork_modulepath_args_options)、[`child_process.exec()`](http://nodejs.cn/api/child_process.html#child_process_child_process_exec_command_options_callback) 和 [`child_process.execFile()`](http://nodejs.cn/api/child_process.html#child_process_child_process_execfile_file_args_options_callback) 方法都遵循其他 Node.js API 典型的惯用异步编程模式。

每个方法都返回 [`ChildProcess`](http://nodejs.cn/api/child_process.html#child_process_class_childprocess) 实例。 这些对象实现了 Node.js [`EventEmitter`](http://nodejs.cn/api/events.html#events_class_eventemitter) API，允许父进程注册在子进程的生命周期中发生某些事件时调用的监听器函数。

[`child_process.exec()`](http://nodejs.cn/api/child_process.html#child_process_child_process_exec_command_options_callback) 和 [`child_process.execFile()`](http://nodejs.cn/api/child_process.html#child_process_child_process_execfile_file_args_options_callback) 方法还允许指定可选的 `callback` 函数，其在子进程终止时调用。



#### `child_process.exec(command[, options][, callback])`

衍生 shell，然后在该 shell 中执行 `command`，缓冲任何生成的输出。

#### `child_process.spawn(command[, args][, options])`

使用给定的 `command` 和 `args` 中的命令行参数衍生新**进程**。



## 同步创建的进程

[`child_process.spawnSync()`](http://nodejs.cn/api/child_process.html#child_processspawnsynccommand-args-options)、[`child_process.execSync()`](http://nodejs.cn/api/child_process.html#child_processexecsynccommand-options) 和 [`child_process.execFileSync()`](http://nodejs.cn/api/child_process.html#child_processexecfilesyncfile-args-options) 方法是同步的，将**阻塞 Node.js 事件循环**，暂停任何其他代码的执行，直到衍生的进程退出。

像这样的阻塞调用对于简化通用脚本任务和在启动时简化应用程序配置的加载/处理非常有用。



... Todo ...



## ChildProcess 类 [#](http://nodejs.cn/api/child_process.html#class-childprocess)

### 事件

### 属性

### 方法