# 为什么 Git 总是询问我的密码？

如果 Git 在您每次尝试与 GitHub 交互时均提示输入用户名和密码，则您可能为仓库使用的是 **HTTPS** 克隆 URL。

与使用 SSH 相比，使用 HTTPS 远程 URL 具有一些优势。 它比 SSH 更容易设置，通常通过严格的防火墙和代理进行工作。 但是，**每次拉取或推送仓库时，它也会提示您输入 GitHub 凭据**。

当 Git 提示你输入密码时，请输入你的personal access token。 或者，可以使用 [Git Credential Manager](https://github.com/GitCredentialManager/git-credential-manager/blob/main/README.md) 等凭据帮助程序。Git 的基于密码的身份验证已被删除，以支持更安全的身份验证方法。有关详细信息，请参阅“[创建personal access token](https://docs.github.com/zh/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)”。

可以通过将 Git 配置为用于[缓存凭据](https://docs.github.com/zh/github/getting-started-with-github/caching-your-github-credentials-in-git)来避免系统提示输入密码。 在配置凭据缓存后，当您使用 HTTPS 拉取或推送仓库时，Git 会自动使用缓存的个人访问令牌。