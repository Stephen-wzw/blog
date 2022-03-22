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
      title: "CSS",
      collapsable: false,
      children: ["layout/basic-layout.md"],
    },
  ],
  "/javascript/": [
    {
      title: "JavaScript",
      collapsable: false,
      children: [
        "/javascript/",
        {
          title: "对象",
          children: [
            "/javascript/object/01、深入理解对象.md",
          ],
        },
      ],
    },
  ],
  "/library/": [
    {
      title: "Vue",
      collapsable: false,
      children: [
        "/library/",
        {
          title: "对象",
          children: [
            "/library/Vue/01、响应式原理.md",
          ],
        },
      ],
    },
  ],
  "/client/": [
    {
      title: "客户端",
      collapsable: false,
      children: [
        "0001、输入URL浏览器干了什么.md",
        "0002、浏览器是怎么渲染的.md",
        "0003、V8引擎",
        "0004、内存管理"
      ]
    }
  ],
  "/server/": [
    {
      title: "Server",
      collapsable: false,
      children: [
        "/server/",
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
