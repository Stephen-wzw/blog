module.exports = {
  "/html/": [
    {
      title: "HTML",
      collapsable: false,
      children: ["HTML.md"],
    },
  ],
  "/css/": [
    {
      title: "布局",
      collapsable: false,
      children: [
        "layout/basic-layout.md",
        "layout/postcss-px-to-viewport.md"
      ],
    },
  ],
  "/javascript/": [
    {
      title: "JavaScript",
      collapsable: false,
      children: [
        "/javascript/0001、深入理解对象.md",
        "/javascript/0002、创建对象.md",
        "/javascript/0003、继承.md",
        "/javascript/0004、类.md",
        "/javascript/0005、字符串操作中slice、substring的区别.md"
      ],
    },
  ],
  "/library/Vue/": [
    {
      title: "Vue",
      collapsable: false,
      children: [
        "01、响应式原理.md",
        "02、Vuex 原理.md"
      ],
    },
  ],
  "/library/React/": [
    {
      title: "React",
      collapsable: false,
      children: [
        
      ],
    },
  ],
  "/client/": [
    {
      title: "浏览器",
      collapsable: false,
      children: [
        "0001、输入URL浏览器干了什么.md",
        "0002、浏览器是怎么渲染的.md",
        "0003、V8引擎.md",
        "0004、内存管理.md",
        "0005、HTTP概述.md"
      ]
    }
  ],
  "/server/": [
    {
      title: "Server",
      collapsable: false,
      children: [
        {
          title: "部署 vuepress",
          children: [
            "/server/practice/0001、设置 ssh 密钥登录.md",
            "/server/practice/0002、搭建 git 私服.md",
            "/server/practice/0003、配置宝塔面板.md",
            "/server/practice/0004、自动部署.md",
          ],
        },
      ],
    },
  ],
};
