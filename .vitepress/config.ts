// docs: https://vitepress.vuejs.org/guide/theme-nav
// vitepress docs config.ts https://github.com/vuejs/vitepress/blob/main/docs/.vitepress/config.ts
import { defineConfig } from 'vitepress'
import { sidebar } from "./_sliebar/getSidebar"

export default defineConfig({
  title: 'VitePress Starter',
  description: 'typora',
  lastUpdated: true,
  ignoreDeadLinks: true,

  // base: './', 
  // base: './' ---- dev结果：http://localhost:5173/Users/zou/Desktop/mg/vitepress-starter/typora/_Cesium/xxx.html
  // base: '/'(默认) ---- dev结果：http://localhost:5173/_Cesium/xxx.html

  // srcDir: './typora',

  // markdown
  markdown: {
    toc: {
      // For Compatibility typora toc
      pattern: /^\[toc\]$/i,
      level: [1, 2, 3, 4, 5, 6]
    }
  },

  themeConfig: {
    // 网站标题， 不设置默认为title
    siteTitle: 'Typora',
    // logo: './logo.svg',

    // 右上角导航栏
    // nav: [
    //   { text: 'Guide', link: '/guide' },
    //   { text: 'Configs', link: '/configs' },
    //   { text: 'Changelog', link: 'https://github.com/jiang-24-gdufs' },
    //   {
    //     text: 'Dropdown Menu',
    //     items: [
    //       { text: 'Item A', link: '/item-1' },
    //       { text: 'Item B', link: '/item-2' },
    //       { text: 'Item C', link: '/item-3' }
    //     ]
    //   }
    // ],

    // 边栏
    sidebar: sidebar,

    // 底部： 请注意，当侧栏可见时，页脚将不会显示。
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    }
  }
})
