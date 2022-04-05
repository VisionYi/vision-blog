import type { UserPlugins, Plugin, PluginOptions } from 'vuepress/config'
import type { VdoingThemeConfig } from 'vuepress-theme-vdoing/types'
import type { CustomThemConfig } from '../config'
import dayjs from 'dayjs'

const customPlugin: Plugin<PluginOptions, VdoingThemeConfig & CustomThemConfig> = (pluginOptions, context) => {
  return {
    // option API: https://vuepress.vuejs.org/plugin/option-api.html#option-api
    name: 'custom-plugin',
    extendPageData($page) {
      const $site = context.siteConfig
      // 自動填上每頁面的 canonicalUrl 絕對網址，使用 frontmatter.permalink 永久網址
      $page.frontmatter.canonicalUrl = ($site.themeConfig.domain || '') + ($page.frontmatter.permalink || '')
      // 自動填上每頁面的 description 文章內容
      $page.frontmatter.description = $page.frontmatter.description || $page.excerpt?.replace(/<[^>]*>?/gm, '') || $site.description

      // TODO: add default og:image
    }
  }
}

// @ts-expect-error: 由於官方指定 type UserPlugins 本身就不包含 local custom plugin，所以需要被 typescript 忽略
const plugins: UserPlugins = [
  [ customPlugin ],
  [
    // 程式碼區塊一鍵複製，配置參考： https://github.com/vxhly/vuepress-plugin-one-click-copy
    'vuepress-plugin-one-click-copy', {
      copyMessage: '複製成功！', // default is 'Copied successfully!'
      toolTipMessage: '複製到剪貼簿', // default is ''Copy to clipboard'
      duration: 1000, // prompt message display time
    }
  ],
  [
    // 自動插入 head meta data，配置參考： https://github.com/lorisleiva/vuepress-plugin-seo
    'vuepress-plugin-seo', {
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
    // 參考配置： https://github.com/ekoeryanto/vuepress-plugin-sitemap
    'vuepress-plugin-sitemap', {
      // TODO: change domain url
      hostname: 'https://vhung.com'
    },
  ],
  [
    // 參考配置： https://github.com/tolking/vuepress-plugin-img-lazy
    'vuepress-plugin-img-lazy', true
  ],
  [
    // 放大圖片，參考配置： https://vuepress-community.netlify.app/zh/plugins/zooming/
    'vuepress-plugin-zooming',
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
        return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
      },
    },
  ],
  // TODO: 等上線再加上去 GA
  // [
  //   '@vuepress/google-analytics',
  //   {
  //     'ga': ''
  //   }
  // ],
  // TODO: Add structured data to VuePress pages, https://www.adamdehaven.com/blog/how-to-add-metadata-canonical-urls-and-structured-data-to-your-vuepress-site/#add-structured-data-to-vuepress-pages
  // TODO: 評論系統 Twikoo, https://notes.youngkbt.cn/about/website/comment/#twikoo-%E6%90%AD%E5%BB%BA
  // TODO: Vue 範例實作互動 vuepress-plugin-demo-container, https://github.com/calebman/vuepress-plugin-demo-container
]

export default plugins
