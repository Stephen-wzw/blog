module.exports = {
  title: "Hello VuePress",
  description: "Just playing around",

  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
    nav: [
      { text: "HTML", link: "/html/" },
      { text: "CSS", link: "/css/" },
      { text: "JavaScript", link: "/javascript/" },
      { 
        text: "Reading",
        link: "/reading/",
        items: [
          {
            text: "JavaScript",
            items: [ { text: "红宝书", link: "/reading/红宝书.md" }]
          },
        ]
      },
      {
        text: "Library", 
        link: "/library/", 
        items: [
          { text: "Vue", link: "/library/vue" },
          { text: "React", link: "/library/React" }
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
          title: 'Server',
          collapsable: false,
          children: [
            '/server/',
            {
              title: '部署 vuepress',
              children: [
                '/server/practice/0001、设置 ssh 密钥登录.md',
                '/server/practice/0002、搭建 git 私服.md',
                '/server/practice/0003、配置宝塔面板.md',
                '/server/practice/0004、自动部署.md'
              ]
            }
          ]
        }
      ],
    },
  },
};
