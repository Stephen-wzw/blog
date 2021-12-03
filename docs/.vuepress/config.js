module.exports = {
  title: "Hello VuePress",
  description: "Just playing around",

  themeConfig: {
    nav: [
      { text: "HTML", link: "/html/" },
      { text: "CSS", link: "/css/" },
      { text: "JavaScript", link: "/javascript/" },
      { 
        text: "框架", 
        link: "/framework/", 
        items: [
          { text: "Vue", link: "/framework/vue" },
          { text: "React", link: "/framework/React" }
        ] 
      },
      { text: "Client", link: "/framework/" },
      { text: "Server", link: "/server/" },
      { text: "GitHub", link: "https://google.com" },
    ],
    sidebar: {
      '/css/': [
        {
          title: 'CSS',
          collapsable: false,
          children: [
            'layout/layout.md',
          ]
        }
      ],
      '/server/': [
        {
          title: 'server',
          collapsable: false,
          children: [
            'practice/设置 ssh 密钥登录.md',
            'practice/搭建 git 私服.md'
          ]
        }
      ],
    },
  },
};
