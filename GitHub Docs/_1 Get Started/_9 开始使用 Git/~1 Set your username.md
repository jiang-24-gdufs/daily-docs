# 在 Git 中设置用户名

Git 使用用户名将提交与身份关联。 

**Git 用户名与您的 GitHub 用户名不同**。

## 关于 Git 用户名

可使用 `git config` 命令更改与 Git 提交关联的名称。 

您设置的**新名称将在从命令行推送到 GitHub 的任何未来提交中显示**。 

如果您想要将真实姓名保密，则可以使用任意文本作为您的 Git 用户名。

使用 `git config` 更改与 Git 提交关联的名称**仅影响未来的提交**，而不会更改用于过去提交的名称。



## 为计算机上的每个存储库设置 Git 用户名

1. 打开Git Bash。

2. 设置 Git 用户名：

   ```shell
   $ git config --global user.name "Mona Lisa"
   ```

3. 确认您正确设置了 Git 用户名：

   ```shell
   $ git config --global user.name
   > Mona Lisa
   ```



## 为一个仓库设置 Git 用户名

1. 打开Git Bash。

2. 将当前工作目录更改为您想要在其中配置与 Git 提交关联的名称的本地仓库。

3. 设置 Git 用户名：

   ```shell
   $ git config user.name "Mona Lisa"
   ```

4. 确认您正确设置了 Git 用户名：

   ```shell
   $ git config user.name
   > Mona Lisa
   ```