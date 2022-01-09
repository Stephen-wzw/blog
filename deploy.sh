#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 初始化 git 仓库，并提交修改
git init
git add -A
git commit -m 'deploy'

# 发布到 git 私服， -f 强制覆盖
git remote add origin git@119.23.65.118:/home/git/blog.git
git push -f git@119.23.65.118:/home/git/blog.git master

cd -