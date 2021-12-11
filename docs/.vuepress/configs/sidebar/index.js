module.exports = {
  "/css/": [
    {
      title: "CSS",
      collapsable: false,
      children: ["layout/basic-layout.md"],
    },
  ],
  "/client/": [
    {
      title: "客户端",
      collapsable: false,
      children: [
        "0001、输入 URL 浏览器干了什么.md",
        "0002、浏览器是怎么渲染的.md"
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
