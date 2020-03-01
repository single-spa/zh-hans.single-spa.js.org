# single-spa中文文档
[![CircleCI](https://circleci.com/gh/single-spa/zh-hans.single-spa.js.org.svg?style=svg)](https://circleci.com/gh/single-spa/single-spa.js.org)

此仓库包含 [single-spa中文文档](https://github.com/single-spa/zh-hans.single-spa.js.org) 的文档及源码，并由官方实时同步。

## 入门指南

### 提前准备

1. Git
1. Node: install version 8.4 or greater
1. Yarn: See [Yarn website for installation instructions](https://yarnpkg.com/lang/en/docs/install/)
1. A fork of the repo (for any contributions)
1. A clone of the [single-spa.js.org repo](https://github.com/single-spa/single-spa.js.org) on your local machine

### 如何安装

1. `cd single-spa.js.org` to go into the project root
1. `yarn` to install the website's npm dependencies

### 本地执行

1. `cd website` 然后 `yarn start` 开启本地热更新服务。 (powered by [Docusaurus](https://docusaurus.io/))
1. `open http://localhost:3000` 打开浏览器查看效果。

## 贡献翻译

如果你想帮助翻译`single-spa.js.org`? 请参考下列步骤。

### 新建分支

1. 请 fork 这个仓库
1. 在 `single-spa.js.org` 仓库的任何目录下执行 `git checkout master`
1. 执行 `git pull origin master` 确保你的代码是最新的。
1. 执行 `git checkout -b the-name-of-my-branch` 创建一个新的分支 (起一个合适的分支名字来替换 `the-name-of-my-branch`)

### 挑选章节进行翻译

1. 保存翻译的文件并在浏览器查看效果
  1. 在 `website/src` 的修改将会自动更新
  1. 修改 `docs` 下的markdown文件也会自动更新
  1. `siteConfig.js` 和 `sideBards.json` 不会自动更新

### 词汇表（[Glossary](https://github.com/single-spa/zh-hans.single-spa.js.org/wiki/Single-spa-%E4%B8%AD%E8%8B%B1%E6%96%87%E5%AF%B9%E7%85%A7%E8%A1%A8)）

文档翻译的过程中，经常出现的词会总结在词汇表中。如 mount，bootstrap，application等。

### 测试修改

1. 如果可以, 测试所有最新版本的常用浏览器的任何视觉变化，包括桌面浏览器和移动浏览器。

### 提交代码

1. `git add . && git commit -m "My message"` (在 `My message` 出填入提交信息, 比如`修改页面顶部logo`) to 暂存和提交代码
1. `git push my-fork-name the-name-of-my-branch`
1. 去自己 fork 仓库下查找新提交的 `my-fork-name` 分支，发起Pull Request。
1. 如果方便，请把改动截图一并提交。
