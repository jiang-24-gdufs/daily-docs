## [Remotes and forks](https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository#remotes-and-forks)

如果要协作处理原始存储库，可将新的远程 URL（通常称为 `upstream`）添加到本地 Git 克隆：

```shell
git remote add upstream  <THEIR_REMOTE_URL> 
```

现在可以从其分支提取更新和分支：

```shell
git fetch upstream
# Grab the upstream remote's branches
```