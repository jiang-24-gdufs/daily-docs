[TOC]

# [Why should we use pnpm? by @ZoltanKochan](https://www.kochan.io/nodejs/why-should-we-use-pnpm.html)



19 Mar 2017 · 5 min read · [34 Comments](https://www.kochan.io/nodejs/why-should-we-use-pnpm.html#disqus_thread)

[pnpm](https://github.com/pnpm/pnpm) is an alternative package manager for Node.js. It is a drop-in replacement for npm, but faster and more efficient.

How fast? *3 times faster!* See benchmarks [here](https://github.com/pnpm/node-package-manager-benchmark).

Why more efficient? When you install a package, we keep it in a global store on your machine, then we create a hard link from it instead of copying. For each version of a module, there is only ever one copy kept on disk. When using npm or yarn for example, if you have 100 packages using lodash, you will have 100 copies of lodash on disk. *Pnpm allows you to save gigabytes of disk space!*

## Why not Yarn?

TBH, I was really disappointed when Yarn became public. I was heavily contributing to pnpm for several months and there was nowhere any news about Yarn. The info about its development was not public.

After a few days, I realized that Yarn is just a small improvement over npm. Although it makes installations faster and it has some nice new features, it uses the same flat *node_modules* structure that npm does (since version 3).

And flattened dependency trees come with a bunch of issues:

1. modules can access packages they don’t depend on
2. the algorithm of flattening a dependency tree is pretty complex
3. some of the packages have to be copied inside one project’s *node_modules* folder

几天后，我意识到 Yarn 只是比 npm 有了一点点改进。虽然它使安装更快，并且具有一些不错的新功能，但它使用与npm相同的扁平*node_modules*结构（从版本3开始）。

扁平化的依赖关系树带来了一堆问题：

1. 模块可以访问它们不依赖的包
2. 扁平化依赖关系树的算法非常复杂
3. 某些包必须复制到一个项目的*node_modules*文件夹中



Furthermore, there are issues that Yarn doesn’t plan to solve, like the disk space usage issue. So I decided to continue investing my time to pnpm, and with great success. As of now (March 2017), pnpm has all the additional features that Yarn has over npm:

1. **security.** Like Yarn, pnpm has a special file with all the installed packages’ checksums to verify the integrity of every installed package before its code is executed.
2. **offline mode.** pnpm saves all the downloaded package tarballs in a local registry mirror. It never makes requests when a package is available locally. With the parameter, HTTP requests can be prohibited at all.`--offline`
3. **speed.** pnpm is not only faster than npm, it is faster than Yarn. It is faster than Yarn both with cold and hot cache. Yarn copies files from cache whereas pnpm just links them from the global store.



截至目前（2017 年 3 月），pnpm 具有 Yarn 在 npm 上的所有附加功能：

1. **安全。**与Yarn一样，pnpm有一个特殊的文件，其中包含所有已安装软件包的校验和，以便在执行其代码之前验证每个已安装软件包的完整性。
2. **离线模式。**pnpm 将所有下载的包压缩包保存在本地注册表镜像中。当包在本地可用时，它从不发出请求。使用该参数，可以完全禁止 HTTP 请求。`--offline`
3. **速度。**pnpm不仅比npm快，而且比Yarn快。它比Arn更快，无论是冷缓存还是热缓存。Yarn 从缓存中复制文件，而 pnpm 只是从全局存储中链接它们。





## How is it possible?

As I mentioned earlier, pnpm does not flatten the dependency tree. As a result, the algorithms used by pnpm can be a lot easier! That’s why it is possible that only 1 developer could keep pace with the dozens of contributors of Yarn.

So how does pnpm structure the *node_modules* directory, if not by flattening? To understand it, we should recall how did the *node_modules* folder look like before npm version 3. Prior to *npm@3*, the *node_modules* structure was predictable and clean, as every dependency in *node_modules* had its own *node_modules* folder with all of its dependencies specified in *package.json*.

```
node_modules
└─ foo
   ├─ index.js
   ├─ package.json
   └─ node_modules
      └─ bar
         ├─ index.js
         └─ package.json
```

This approach had two serious issues:

- frequently packages were creating too deep dependency trees, which caused long directory paths issue on Windows
- packages were copy pasted several times when they were required in different dependencies



pnpm 如何构建*node_modules*目录（如果不是通过扁平化）呢？为了理解它，我们应该回想*一下node_modules*文件夹在npm版本3之前的样子。在*npm@3*之前，*node_modules*结构是可预测的和干净的，因为*node_modules*中的每个依赖项都有自己的*node_modules*文件夹，其所有依赖项都在*package.json*中指定。

这种方法有两个严重的问题：

- 软件包经常**创建太深的依赖关系树**，这导致Windows上的目录**路径过长**问题
- 当不同依赖项中需要包时，会**多次复制粘贴包**



To solve these issues, npm rethought the *node_modules* structure and came up with flattening. With *npm@3* the *node_modules* structure now looks like this:

为了解决这些问题，npm重新考虑了*node_modules*结构，并提出了扁平化。使用*npm@3**，node_modules*结构现在如下所示: 

```
node_modules
├─ foo
|  ├─ index.js
|  └─ package.json
└─ bar
   ├─ index.js
   └─ package.json
```

For more info about the npm v3 dependency resolution, see [npm v3 Dependency Resolution](https://docs.npmjs.com/how-npm-works/npm3).

Unlike npm@3, pnpm tries to solve the issues that npm@2 had, without flattening the dependency tree. In a *node_modules* folder created by pnpm, all packages have their own dependencies grouped together, but the directory tree is never as deep as with npm@2. pnpm keeps all dependencies flat but uses **symlinks** to group them together.

pnpm 尝试解决npm@2遇到的问题，而不会使依赖关系树变平。

在 pnpm 创建的*node_modules*文件夹中，所有包都有自己的依赖项组合在一起，但目录树的深度永远不会跟npm@2一样。

pnpm 保持所有依赖项保持平坦，但使用**符号链接**将它们组合在一起。

```
-> - a symlink (or junction on Windows) 

node_modules
├─ foo -> .registry.npmjs.org/foo/1.0.0/node_modules/foo
└─ .registry.npmjs.org
   ├─ foo/1.0.0/node_modules
   |  ├─ bar -> ../../bar/2.0.0/node_modules/bar
   |  └─ foo
   |     ├─ index.js
   |     └─ package.json
   └─ bar/2.0.0/node_modules
      └─ bar
         ├─ index.js
         └─ package.json
```

To see a live example, visit the [sample pnpm project](https://github.com/pnpm/sample-project) repo.

Although the example seems too complex for a small project, for bigger projects the structure looks better structured than what is created by npm/yarn. Let’s see why it works.

First of all, you might have noticed, that the package in the root of *node_modules* is just a symlink. This is fine as Node.js ignores symlinks and executes the realpath. So will execute the file in not in .`require('foo')``node_modules/.registry.npmjs.org/foo/1.0.0/node_modules/foo/index.js``node_modules/foo/index.js`

Secondly, none of the installed packages have their own *node_modules* folder inside their directories. So how can *foo* require *bar*? Lets have a look on the folder that contains the *foo* package:

```
node_modules/.registry.npmjs.org/foo/1.0.0/node_modules
├─ bar -> ../../bar/2.0.0/node_modules/bar
└─ foo
   ├─ index.js
   └─ package.json
```

As you can see

1. the dependencies of *foo* (which is just *bar*) are installed, but one level up in the directory structure.
2. both packages are inside a folder called *node_modules*

*foo* can require *bar*, because Node.js looks modules up in the directory structure till the root of the disk. And *foo* can also require *foo*, because it is in a folder called *node_modules* (yep, this is what some packages do).

*foo*可能依赖*bar*，因为Node.js在目录结构中查找模块，直到磁盘的根目录。

*foo*也可以依赖*foo*，因为它位于一个名为*node_modules*的文件夹中（是的，这是某些软件包的作用）。



## Are you convinced?

Just install pnpm via npm: `npm install -g pnpm` . And use it instead of npm whenever you want to install something: `pnpm i foo` .

Also you can read more info at the [pnpm GitHub repo](https://github.com/pnpm/pnpm) or [pnpm.js.org](https://pnpm.js.org/). You can follow [pnpm on Twitter](https://twitter.com/pnpmjs) or ask for help at the [pnpm Gitter Chat Room](https://gitter.im/pnpm/pnpm).



## COMMENTS

q1: does this supports private npm modules?

a1: Yes. If you have all configured for npm, it should work with pnpm.

​	pnpm uses the configs of npm and it uses the same package that npm uses for downloading the packages, which is [npm/npm-registry-client (github.com)](https://github.com/npm/npm-registry-client)



c2:  Nice! I've long since wondered if the problems of the nested-deps tree could be solved without making it totally flat, and this looks like a very promising solution. Thanks for your efforts in getting this going despite Yarn's wave of excitement, I know what that feels like. You're doing a really good thing!

