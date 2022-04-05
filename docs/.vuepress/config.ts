import { defineConfig4CustomTheme } from 'vuepress/config'
import type { VdoingThemeConfig } from 'vuepress-theme-vdoing/types'
import plugins from './config/plugins'

export type CustomThemConfig = {
  domain: string,
}

export default defineConfig4CustomTheme<VdoingThemeConfig & CustomThemConfig>({
  theme: 'vdoing',
  locales: {
    '/': {
      lang: 'zh-TW',
      title: 'Vision\'s blog',
      // TODO: modify default description
      description: 'Web前端技術博客，積跬步以至千里，致敬每個愛學習的你。',
    }
  },
  // head 配置參考: https://vuepress.vuejs.org/config/#head
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#11a8cd' }],
    // fontAwesome icon
    ['link', { rel: 'preconnect', href: 'https://kit.fontawesome.com' }],
    ['script', { src: 'https://kit.fontawesome.com/cc99942fb1.js', crossorigin: 'anonymous' }]
  ],
  markdown: {
    lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'], // 配置： https://vuepress.vuejs.org/zh/config/#markdown-extractheaders
  },
  extraWatchFiles: [
    '.vuepress/config.ts',
    '.vuepress/config/plugins.ts',
  ],
  plugins: plugins,
  themeConfig: {
    // TODO: change domain url
    domain: 'https://vhung.com', // for seo plugin
    smoothScroll: true,
    sidebar: 'structuring', //  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto'
    categoryText: '隨筆', // 碎片化文章（_posts資料夾的文章）預設生成的分類值
    sidebarDepth: 2, // 側邊欄顯示深度，顯示到 h3
    logo: 'https://cdn.jsdelivr.net/gh/VisionYi/image-store@master/blog/logo-120.3ioo6sdv5dw0.webp', // 導航欄 logo
    repo: 'VisionYi/vision-blog', // 導航欄右側生成Github鏈接
    searchMaxSuggestions: 10, // 搜索結果顯示最大數
    lastUpdated: '上次更新', // 開啟更新時間，並配置前綴文字

    // 文章中預設的作者信息，可在md文章中單獨配置此信息 String | {name: String, link: String}
    author: {
      name: 'Vision Hung',
      link: 'https://github.com/VisionYi',
    },

    // 作者主信息，顯示在首頁側邊欄
    blogger: {
      avatar: 'https://cdn.jsdelivr.net/gh/VisionYi/image-store@master/blog/avatar.a1dn94euzkw.webp',
      name: 'Vision Hung',
      slogan: '前端界的小學生',
    },

    // 社交圖標，顯示於博主信息欄和頁腳欄。內置圖標：https://doc.xugaoyi.com/pages/a20ce8/#social
    social: {
      icons: [
        {
          iconClass: 'icon-youjian', // 內置圖標
          title: 'E-mail',
          link: 'mailto:scps950613@gmail.com',
        },
        {
          iconClass: 'icon-github', // 內置圖標
          title: 'GitHub',
          link: 'https://github.com/VisionYi',
        },
        {
          iconClass: 'fab fa-medium', // fontAwesome icon
          title: 'Medium',
          link: 'https://vision-hung.medium.com/',
        },
      ],
    },

    // 頁腳信息
    footer: {
      createYear: 2021,
      copyrightInfo:
        'Vision Hung | <a href="https://github.com/VisionYi/vision-blog/blob/master/LICENSE" target="_blank">MIT License</a>', // 博客版權信息，支持a標籤
    },

    nav: [
      { text: '首頁', link: '/' },
      { text: '關於', link: '/about/' },
      {
        text: '索引',
        link: '/archives/',
        items: [
          { text: '分類', link: '/categories/' },
          { text: '標籤', link: '/tags/' },
          { text: '歸檔', link: '/archives/' },
        ],
      },
    ],
  },
})
