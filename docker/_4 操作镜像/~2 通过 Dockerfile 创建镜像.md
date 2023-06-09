[toc]

# 通过 Dockerfile 创建镜像

 Docker 特有的镜像构建定义文件: Dockerfile。

## 关于 Dockerfile

Dockerfile 是 Docker 中用于定义镜像自动化构建流程的配置文件，在 Dockerfile 中，包含了构建镜像过程中需要执行的命令和其他操作。

Dockerfile 可以更加清晰、明确的给定 Docker 镜像的制作过程，而由于其仅是简单、小体积的文件，在网络等其他介质中传递的速度极快，能够更快实现容器迁移和集群部署。

![img](../imgs/1662ee4fdf802776.png)

Dockerfile 的内容很简单，主要以两种形式呈现，一种是注释行，另一种是指令行。

```bash
# Comment
INSTRUCTION arguments
```

在 Dockerfile 中，拥有一套独立的指令语法，其用于给出镜像构建过程中所要执行的过程。Dockerfile 里的指令行，就是由指令与其相应的参数所组成。

![image-20221121103716010](../imgs/image-20221121103716010.png)



### 环境搭建与镜像构建

在一个完整的开发、测试、部署过程中，程序运行环境的定义通常是由开发人员来进行的，因为他们更加熟悉程序运转的各个细节，更适合搭建适合程序的运行环境。

在这样的前提下，为了方便测试和运维搭建相同的程序运行环境，常用的做法是由开发人员编写一套环境搭建手册，帮助测试人员和运维人员了解环境搭建的流程。

而 Dockerfile 就很像这样一个环境搭建手册，因为其中包含的就是一个构建容器的过程。

Dockerfile 在容器体系下能够完成自动构建，既不需要测试和运维人员深入理解环境中各个软件的具体细节，也不需要人工执行每一个搭建流程。



## 编写 Dockerfile

相对于之前我们介绍的提交容器修改，再进行镜像迁移的方式相比，使用 Dockerfile 进行这项工作有很多优势，我总结了几项尤为突出的。

- Dockerfile 的体积远小于镜像包，更容易进行快速迁移和部署。
- 环境构建流程记录了 Dockerfile 中，能够直观的看到镜像构建的顺序和逻辑。
- 使用 Dockerfile 来构建镜像能够更轻松的实现自动部署等自动化流程。
- 在修改环境搭建细节时，修改 Dockerfile 文件要比从新提交镜像来的轻松、简单。

在实际使用中，几乎都**采用 Dockerfile 来制作镜像**。

学会 Dockerfile 的编写是所有熟练使用 Docker 的开发者必须掌握的能力。



### Dockerfile 的结构

总体上来说，我们可以将 Dockerfile 理解为一个由上往下执行指令的脚本文件。

当我们调用构建命令让 Docker 通过我们给出的 Dockerfile 构建镜像时，Docker 会逐一按顺序解析 Dockerfile 中的**指令**，并根据它们不同的含义执行不同的操作。

如果进行细分，我们可以将 Dockerfile 的指令简单分为五大类。

- **基础指令**：用于定义新镜像的基础和性质。
- **控制指令**：是指导镜像构建的核心部分，用于描述镜像在构建过程中需要执行的命令。
- **引入指令**：用于将外部文件直接引入到构建镜像内部。
- **执行指令**：能够为基于镜像所创建的容器，指定在启动时需要执行的脚本或命令。
- **配置指令**：对镜像以及基于镜像所创建的容器，可以通过配置指令对其网络、用户等内容进行配置。

这五类命令并非都会出现在一个 Dockerfile 里，但却对基于这个 Dockerfile 所构建镜像形成不同的影响。



## 常见 Dockerfile 指令

### FROM

通常来说，我们不会从零开始搭建一个镜像，而是会选择一个已经存在的镜像作为我们新镜像的基础，这种方式能够大幅减少我们的时间。

**FROM 指令指定一个基础镜像**，接下来所有的指令都是基于这个镜像所展开的。

既然选择一个基础镜像是构建新镜像的根本，那么 Dockerfile 中的第一条指令必须是 FROM 指令，因为没有了基础镜像，一切构建过程都无法开展。

在镜像构建的过程中，Docker 也会先获取到这个给出的基础镜像，再从这个镜像上进行构建操作。

```
# 使用nginx-1.18.0的镜像
FROM nginx:1.18.0
MAINTAINER "SOUTHSMART<public@southzn.com>"
```

```
# FROM 指令支持三种形式 指出能够被 Docker 识别的那个镜像
FROM <image> [AS <name>]
FROM <image>[:<tag>] [AS <name>]
FROM <image>[@<digest>] [AS <name>]
```

Dockerfile 中可以多次出现 FROM 指令，当 FROM 第二次或者之后出现时，表示在此刻构建时，要将当前指出镜像的内容合并到此刻构建镜像的内容里。这对于我们直接合并两个镜像的功能很有帮助。



### RUN

RUN 指令就是用于向控制台发送命令的指令。

在 RUN 指令之后，我们直接拼接上需要执行的命令，在构建时，Docker 就会执行这些命令，并将它们对文件系统的修改记录下来，形成镜像的变化。

```bash
RUN <command>
RUN ["executable", "param1", "param2"]
```

RUN 指令是支持 \ 换行的，如果单行的长度过长，建议对内容进行切割，方便阅读。而事实上，我们会经常看到 \ 分割的命令，例如在上面我们贴出的 Redis 镜像的 Dockerfile 里。



### ENTRYPOINT 和 CMD

基于镜像启动的容器，在容器启动时会根据镜像所定义的一条命令来启动容器中进程号为 1 的进程。

而这个命令的定义，就是通过 Dockerfile 中的 ENTRYPOINT 和 CMD 实现的。

```css
ENTRYPOINT ["executable", "param1", "param2"]
ENTRYPOINT command param1 param2

CMD ["executable","param1","param2"]
CMD ["param1","param2"]
CMD command param1 param2
```

ENTRYPOINT 指令和 CMD 指令的用法近似，都是给出需要执行的命令，并且它们都可以为空，或者说是不在 Dockerfile 里指出。

当 ENTRYPOINT 与 CMD 同时给出时，CMD 中的内容会作为 ENTRYPOINT 定义命令的参数，最终执行容器启动的还是 ENTRYPOINT 中给出的命令。

关于 ENTRYPOINT 和 CMD 的更详细对比，在后一节里我们会提到。





### EXPOSE

EXPOSE 指令就可以为镜像指定要暴露的端口。



### VOLUME

在一些程序里，我们需要持久化一些数据，比如数据库中存储数据的文件夹就需要单独处理。在之前的小节里，我们提到可以通过数据卷来处理这些问题。

使用数据卷需要我们在创建容器时通过 `-v` 选项来定义，而有时候由于镜像的使用者对镜像了解程度不高，会漏掉数据卷的创建，从而引起不必要的麻烦。

制作镜像的人是最清楚镜像中程序工作的各项流程的，所以它来定义数据卷也是最合适的。所以在 Dockerfile 里，提供了 VOLUME 指令来定义基于此镜像的容器所自动建立的数据卷。

```css
VOLUME ["/data"]
```

在 VOLUME 指令中定义的目录，在基于新镜像创建容器时，会自动建立为数据卷，不需要我们再单独使用 `-v` 选项来配置了。



### COPY 和 ADD

在制作新的镜像的时候，我们可能需要将一些软件配置、程序代码、执行脚本等直接导入到镜像内的文件系统里，使用 COPY 或 ADD 指令能够帮助我们直接从宿主机的文件系统里拷贝内容到镜像里的文件系统中。

```ruby
COPY [--chown=<user>:<group>] <src>... <dest>
ADD [--chown=<user>:<group>] <src>... <dest>

COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]
ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

COPY 与 ADD 指令的定义方式完全一样，需要注意的仅是当我们的目录中存在空格时，可以使用后两种格式避免空格产生歧义。

对比 COPY 与 ADD，两者的区别主要在于 ADD 能够支持使用网络端的 URL 地址作为 src 源，并且在源文件被识别为压缩包时，自动进行解压，而 COPY 没有这两个能力。

虽然看上去 COPY 能力稍弱，但对于那些不希望源文件被解压或没有网络请求的场景，COPY 指令是个不错的选择。





## 构建镜像

在编写好 Dockerfile 之后，我们就可以构建我们所定义的镜像了，构建镜像的命令为 `docker build`。

```shell
$ sudo docker build ./webapp
```

`docker build` 可以接收一个参数，需要特别注意的是，**这个参数为一个目录路径** ( 本地路径或 URL 路径 )，而并非 Dockerfile 文件的路径。

在 `docker build` 里，这个我们给出的目录会作为构建的环境目录，我们很多的操作都是基于这个目录进行的。

在我们使用 COPY 或是 ADD 拷贝文件到构建的新镜像时，会以这个目录作为基础目录。

在默认情况下，`docker build` 也会从这个目录下寻找名为 Dockerfile 的文件，将它作为 Dockerfile 内容的来源。如果我们的 Dockerfile 文件路径不在这个目录下，或者有另外的文件名，我们可以通过 `-f` 选项单独给出 Dockerfile 文件的路径。

```shell
$ sudo docker build -t webapp:latest -f ./webapp/a.Dockerfile ./webapp
```

当然，在构建时我们最好总是携带上 `-t` 选项，用它来指定新生成镜像的名称。

```shell
$ sudo docker build -t webapp:latest ./webapp
```

![image-20221121105809981](../imgs/image-20221121105809981.png)
