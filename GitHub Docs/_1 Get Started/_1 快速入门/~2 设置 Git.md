[toc]

# 设置 Git

GitHub 的核心是名为 Git 的开源版本控制系统 (VCS)。 

Git 负责在你计算机上本地发生的、与 GitHub 有关的所有内容。



## 使用来自 Git 的 GitHub 进行身份验证

从 Git 连接到 GitHub 存储库时，需要使用 HTTPS 或 SSH 向 GitHub 进行身份验证。

### 通过 HTTPS 连接（推荐）

如果使用 HTTPS 克隆，则可以使用凭据帮助程序在 Git 中缓存 GitHub 凭据。 

有关详细信息，请参阅“[使用 HTTPS URL 克隆](https://docs.github.com/zh/github/getting-started-with-github/about-remote-repositories/#cloning-with-https-urls)”和“[在 Git 中缓存 GitHub 凭据](https://docs.github.com/zh/github/getting-started-with-github/caching-your-github-credentials-in-git)”。

### 通过 SSH 连接

如果使用 SSH 克隆，则必须在每台计算机上生成用于从 GitHub 进行推送或拉取的 SSH 密钥。

 有关详细信息，请参阅“[使用 SSH URL 克隆](https://docs.github.com/zh/github/getting-started-with-github/about-remote-repositories/#cloning-with-ssh-urls)”和“[生成新的 SSH 密钥](https://docs.github.com/zh/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)”。