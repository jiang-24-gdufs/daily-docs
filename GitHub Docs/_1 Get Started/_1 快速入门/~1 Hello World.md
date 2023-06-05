[toc]

## [创建分支](https://docs.github.com/zh/get-started/quickstart/hello-world#create-a-branch)

可使用分支进行试验和编辑，然后再将其提交到 `main`。

从 `main` 分支创建分支时，创建的是 `main` 在当时的副本或快照。 如果其他人在你处理分支时对 `main` 分支进行了更改，你可拉取这些更新。

此图显示：

- `main` 分支
- 名为 `feature` 的新分支
- `feature` 在合并到 `main` 之前的历程

![分支图](../../imgs/branching.png)



## 创建和提交更改

您可以对存储库中的文件进行更改并保存更改。 

在 GitHub 上，**保存的更改称为提交**。 

每个提交都有一个关联的提交消息，该消息是解释为什么进行特定更改的说明。 

提交消息会捕获您更改的历史记录，以便其他参与者可以了解您执行了哪些操作及其原因。



## Opening a pull request

拉取请求是 GitHub 上协作的核心。

When you open a pull request, you're proposing your changes and requesting that someone review and pull in your contribution and merge them into their branch. 

> 当你打开一个拉动请求时，你在提出你的修改，并要求别人审查和拉入你的贡献，并将它们合并到他们的分支。



## Merging your pull request

拉取请求可能会引入与 `main` 上的现有代码冲突的代码更改。 如果存在任何冲突， GitHub 将提醒您有关冲突代码的信息，并防止合并，直到冲突解决为止。

 您可以进行解决冲突的提交，也可以使用拉取请求中的注释与团队成员讨论冲突。