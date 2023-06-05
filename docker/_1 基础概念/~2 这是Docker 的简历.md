[toc]

# 这是 Docker 的简历

## Docker 开源项目

Docker 项目是一个由 Go 语言实现的容器引擎，它最初由 dotCloud 这家做云服务的公司在 2013 年开源。

Docker 越来越火。拥有商业头脑的他们，干脆不再做云服务了，也把公司名字改成 Docker Inc. 专门从事 Docker 周边的生意。Docker 的商业化也带来了一定的变化。为了更好的进行商业运作

Docker Inc. 将 Docker 开源项目的名称修改为了 Moby，所以大家要是在 GitHub 上没有搜索到 Docker 不要觉得惊讶，因为它现在的名字是 Moby ( [github.com/moby/moby](https://github.com/moby/moby) )。

关于 Moby 和 Docker 更多的内容，这里给大家提供一下参考资料，有兴趣的朋友们可以前往阅读：

- [Docker改名啦？什么是 Moby Project](https://developer.aliyun.com/article/74437)
- [对于 Docker 改名 Moby ，大家怎么看？](https://www.zhihu.com/question/58805021)
- [Introducing Moby Project](https://www.docker.com/blog/)



## Docker 所带来的改变

### 云计算时代的挑战

### 皆为效率

如果说在分布式部署中应用容器技术是一个方向，那么 Docker 就是在这个方向上跑得最快也最完美的运动员了。Docker 不论从实现容器技术的完整性上来说，还是从上手易用性来说，都是可圈可点的。

使用 Docker 的目的其实很简单，就是**利用它的全面性和易用性带来的提升我们的工作效率**。



## Docker 的技术实现

Docker 的实现，主要归结于三大技术：命名空间 ( Namespaces ) 、控制组 ( Control Groups ) 和联合文件系统 ( Union File System ) 。



## Docker 的理念



## 能用 Docker 做些什么

使用 Docker 后，开发者能够在本地容器中得到一套标准的应用或服务的运行环境，由此可以简化开发的生命周期 ( 减少在不同环境间进行适配、调整所造成的额外消耗 )。

对于整个应用迭代来说，**加入 Docker 的工作流程将更加适合持续集成** ( Continuous Integration ) 和**持续交付** ( Continuous Delivery )。

举个具体的例子：

- 开发者能够使用 Docker 在本地编写代码并通过容器与其他同事共享他们的工作。
- 他们能够使用 Docker 将编写好的程序推送至测试环境进行自动化测试或是人工测试。
- 当出现 Bugs 时，开发者可以在开发环境中修复它们，并很快的重新部署到测试环境中。
- 在测试完成后，部署装有应用程序的镜像就能完成生产环境的发布。



### 跨平台部署和动态伸缩

基于容器技术的 Docker 拥有很高的跨平台性，Docker 的容器能够很轻松的运行在开发者本地的电脑，数据中心的物理机或虚拟机，云服务商提供的云服务器，甚至是混合环境中。

### 让同样的硬件提供更多的产出能力

Docker 的高效和轻量等特征，为替代基于 Hypervisor 的虚拟机提供了一个经济、高效、可行的方案。在 Docker 下，你能节约出更多的资源投入到业务中去，让应用程序产生更高的效益。同时，如此低的资源消耗也说明了 Docker 非常适合在高密度的中小型部署场景中使用。