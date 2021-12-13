---
id: contributing-overview
title: 贡献给Single-spa
sidebar_label: 整体预览
---

[当前贡献人员列表](/contributors)

感谢你能关注single-spa! 我们非常愿意能够听到你的相关意见或者建议

我们已经将能够帮助你弄清流程的文档放在下面的指南中，希望能够对你有所帮助

## 目录

0. [我们期望的贡献类型](#types-of-contributions-were-looking-for)
0. [相关规则 & 期望](#ground-rules-expectations)
0. [如何进行贡献](#how-to-contribute)
0. [搭建你自己的本地环境](#setting-up-your-environment)
0. [社区支持](#community)

## 我们期望的贡献类型

你有多种方式来直接贡献给指南（降序排列）

* 例子
* 为缺失的框架添加示例库（像single-spa-react）
* 修复bug
* 在slack channel中回答问题
* 为框架添加帮助包

是否想做一些贡献？那就继续往下读吧！
## 相关规则 & 期望

在我们开始之前，下面的注意事项我们期望你能看一下

* 在讨论项目相关事情的时候可以有自己的想法，因为我们具有不同的背景和项目经验，所以我们有不同的视角来看待“开源应该如何来做”，你可以尝试一下多听取其他人而不是始终坚信自己的方式是对的
* 请通过阅读single-spa[代码贡献指南](/docs/code-of-conduct/)来参与到本项目中，并同意遵守它的条款
* 在你提交PR之前，请确保你贡献的代码通过了所有测试，并且需要强调相关失败的测试用例，这样便于我们合并你贡献的代码
* 在你添加内容之前请先考虑是否它是有价值的。请不要添加参考链接到你或者你同事创建的页面中
## 如何进行贡献

如果你想参与贡献，请通过[issues](https://github.com/single-spa/single-spa/issues)和[pull requests](https://github.com/single-spa/single-spa/pulls)来搜索是否有类似的问题或想法

如果你没有搜索到你的idea, 你可以考虑它适合作为本指南的一个目标，可以选择下面的一种方式来做

* **如果你贡献的PR是微小的,** 例如是一个小的字体改动或者bug修复，请开一个PR
* **如果你贡献的PR是巨大的,** 例如是一个新的feature, 请先开一个issue，这样在你开始做之前其他人能够在讨论区衡量他的重要性

## 搭建你自己的本地环境

### 前置条件

1. Git
1. Node: 下载 version 8.4 or greater
1. Yarn: 查看 [Yarn 站点安装说明](https://yarnpkg.com/lang/en/docs/install/)
1. fork [single-spa 仓库](https://github.com/single-spa/single-spa)
1. clone当前仓库到你的本地

### 安装

1. `cd single-spa` 渠道当前项目的根目录
1. `yarn` 安装single-spa的相关依赖

### 创建一个分支

1.  从你的本地 `single-spa` 仓库运行`git checkout master`
1. `git pull origin master` 确保你的本地有最新的代码
1. `git checkout -b the-name-of-my-branch` (用一个合适的名字来替换`the-name-of-my-branch`) 来创建分支

### 测试更改点

1. 从项目的根目录运行 `yarn test`

### Push it

1. `git add . && git commit -m "My message"` (用commit信息来替换 `My message`, 比如 `Fixed application lifecycles`) 来stage和提交你的更改
1. `git push my-fork-name the-name-of-my-branch`
1. 去到[single-spa 仓库](https://github.com/single-spa/single-spa) 这样能看到推送的分支.
1. 遵循GitHub的说明来提交一个新的PR.

## 社区支持

请在single-spa 仓库的[Issues](https://github.com/single-spa/single-spa/issues) 和 [Pull Requests](https://github.com/single-spa/single-spa/pulls)讨论single-spa的相关问题，任何人都是欢迎加入到讨论中的。这里也有[slack community](https://join.slack.com/t/single-spa/shared_invite/enQtODAwNTIyMzc4OTE1LWUxMTUwY2M1MTY0ZGMzOTUzMGNkMzI1NzRiYzYwOWM1MTEzZDM1NDAyNWM3ZmViOTAzZThkMDcwMWZmNTFmMWQ)来做常规更新

如果可能的话，请不要直接私聊我们的维护人员(maintainers)。保持公开沟通便于每一个人都可以从对话中受益