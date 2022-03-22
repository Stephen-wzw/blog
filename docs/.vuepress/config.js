var NavBar = require("./configs/navbar");
var SideBar = require("./configs/sidebar");

module.exports = {
  title: "I'm on the cloud",
  description: "Just playing around",
  base: "/blog/",

  // 移动端优化
  head: [
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],

  theme: "reco",

  themeConfig: {
    // 备案
    record: "湘ICP备2021019956号-1",
    recordLink: "http://beian.miit.gov.cn/",
    // 项目开始时间，只填写年份
    startYear: "2021",

    author: "wang",
    type: "blog",

    lastUpdated: "Last Updated", // string | boolean
    nav: NavBar,
    sidebar: SideBar,
    noFoundPageByTencent: false,
    // 博客配置
    blogConfig: {
      category: {
        location: 1, // 在导航栏菜单中所占的位置，默认2
        text: "Category", // 默认文案 “分类”
      },
      tag: {
        location: 2, // 在导航栏菜单中所占的位置，默认3
        text: "Tag", // 默认文案 “标签”
      },
      socialLinks: [
        // 信息栏展示社交信息
        { icon: "reco-github", link: "https://github.com/Stephen-wzw" },
      ],
    },

    authorAvatar: '/avatar.jpg',

    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    subSidebar: "auto",
    sidebarDepth: 4,
  },
};
