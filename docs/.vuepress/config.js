module.exports = {
  theme: 'vdoing',
  title: 'Vision\'s blog',
  // TODO: modify default description
  description: 'Web前端技術博客，積跬步以至千里，致敬每個愛學習的你。',

  // head 配置參考: https://vuepress.vuejs.org/config/#head
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    // fontAwesome icon
    ['link', { rel: 'preconnect', href: 'https://kit.fontawesome.com' }],
    ['script', { src: 'https://kit.fontawesome.com/cc99942fb1.js', crossorigin: 'anonymous' }]
  ],

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
        'Vision Hung | <a href="https://github.com/xugaoyi/vision-blog/blob/master/LICENSE" target="_blank">MIT License</a>', // 博客版權信息，支持a標籤
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

  plugins: [
    [
      // 程式碼區塊一鍵複製，配置參考： https://github.com/vxhly/vuepress-plugin-one-click-copy
      'one-click-copy', {
        copyMessage: '複製成功！', // default is 'Copied successfully!'
        toolTipMessage: '複製到剪貼簿', // default is ''Copy to clipboard'
        duration: 1000, // prompt message display time
      }
    ],
    [
      // 自動插入 head meta data，配置參考： https://github.com/lorisleiva/vuepress-plugin-seo
      'seo', {
        siteTitle: ($page, $site) => $site.title,
        title: $page => $page.title,
        description: ($page, $site) => $page.frontmatter.description || $page.excerpt?.replace(/<[^>]*>?/gm, '') || $site.description,
        author: ($page, $site) => $site.themeConfig.author.name,
        tags: $page => $page.frontmatter.tags,
        twitterCard: () => null,
        type: $page => ['@'].some(folder => $page.regularPath.startsWith('/' + folder)) || $page.frontmatter.home ? 'website' : 'article',
        url: ($page, $site, path) => ($site.themeConfig.domain || '') + path,
        image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain && !$page.frontmatter.image.startsWith('http') || '') + $page.frontmatter.image),
        publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
      }
    ],
    [
      // custom plugin
      (pluginOptions, context) => {
        return {
          extendPageData($page) {
            const $site = context.siteConfig
            $page.frontmatter.canonicalUrl = ($site.themeConfig.domain || '') + ($page.frontmatter.permalink || '')
            $page.frontmatter.description = $page.frontmatter.description || $page.excerpt?.replace(/<[^>]*>?/gm, '') || $site.description
            // TODO: add default og:image
          }
        }
      },
    ],
    [
      // 參考配置： https://github.com/ekoeryanto/vuepress-plugin-sitemap
      'sitemap', {
        // TODO: change domain url
        hostname: 'https://vhung.com'
      },
    ],
    [
      // 參考配置： https://github.com/tolking/vuepress-plugin-img-lazy
      'img-lazy',
    ],
    [
      // 放大圖片，參考配置： https://vuepress-community.netlify.app/zh/plugins/zooming/
      'zooming',
      {
        selector: '.theme-vdoing-content img:not(.no-zoom)', // 排除類別是 no-zoom 的圖片
        options: {
          bgColor: 'rgba(0,0,0,0.6)',
        },
      },
    ],
    [
      // 上次更新，參考配置： https://vuepress.vuejs.org/plugin/official/plugin-last-updated.html , https://vuepress.vuejs.org/theme/default-theme-config.html#last-updated
      '@vuepress/last-updated',
      {
        transformer: (timestamp) => {
          const dayjs = require('dayjs')
          return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
        },
      },
    ],
    [
      // TODO: 等上線再加上去 GA
      // '@vuepress/google-analytics',
      // {
      //   'ga': ''
      // }
    ],
    // TODO: Add structured data to VuePress pages, https://www.adamdehaven.com/blog/how-to-add-metadata-canonical-urls-and-structured-data-to-your-vuepress-site/#add-structured-data-to-vuepress-pages
    // TODO: Vue 範例實作互動 vuepress-plugin-demo-container, https://github.com/calebman/vuepress-plugin-demo-container
  ],
}
