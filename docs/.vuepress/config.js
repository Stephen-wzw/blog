var NavBar = require('./configs/navbar');
var SideBar = require('./configs/sidebar');

module.exports = {
  title: "Hello VuePress",
  description: "Just playing around",
  base: "/knowledge-repo/",

  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
    nav: NavBar,
    sidebar: SideBar,
  },
};
