[toc]

# 关于 Git

了解版本控制系统 Git 以及它如何与 GitHub 配合使用。

## 关于版本控制和 Git

**版本控制系统（VCS）**跟踪人员和团队在项目上进行协作时的更改历史记录。 当开发人员对项目进行更改时，可以随时恢复项目的任何早期版本。

开发人员可以查看项目历史记录以找出：

- 进行了哪些更改？
- 谁进行了更改？
- 何时进行了更改？
- 为什么需要更改？

VCS 为每个贡献者提供统一且一致的项目视图，显示已经在进行中的工作。 查看透明的更改历史记录、谁进行了更改，以及它们如何为项目开发做出贡献，可帮助团队成员在独立工作时保持一致。

在分布式版本控制系统 (**distributed** version control system)中，每个开发人员都有项目和项目历史记录的完整副本。 与曾经流行的集中式版本控制系统不同，DVCS 不需要与中央存储库的持续连接。 Git 是最流行的分布式版本控制系统。



## 关于仓库

存储库或 Git 项目包含与项目关联的文件和文件夹的整个集合，以及每个文件的修订历史记录。 

**文件历史记录在时间上显示为快照，称为提交**。 

提交的内容可以被组织成多条开发线，称为分支。 

由于 Git 是 DVCS，因此存储库是独立的单元，任何拥有存储库副本的人都可以访问整个代码库及其历史记录。 使用命令行或其他易用性接口，Git 存储库还允许：与历史记录交互、克隆存储库、创建分支、提交、合并、比较不同版本的代码更改等。



## 协作开发模型

人们在 GitHub 上有两种主要协作方式：

1. 共享存储库
2. Fork and pull 