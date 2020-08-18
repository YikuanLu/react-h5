import { defineConfig } from 'umi'
import px2rem from 'postcss-plugin-px2rem'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none'
  },
  history: { type: 'hash' },
  // publicPath: '/h5/',
  // base: '/h5/',
  title: false,
  routes: [
    // { path: '/', component: '@/pages/index' },
    { path: '/demo', component: '@/pages/demo' },
    { path: '/download', component: '@/pages/download' },
    { path: '/article/:type', component: '@/pages/article' },
    { path: '/match/:type', component: '@/pages/match' },
    { path: '/404', component: '@/pages/notFound' }
  ],
  outputPath: 'build',
  devServer: {
    proxy: [
      {
        context: ['/information', '/behavior', '/search', '/sport'],
        target: 'http://dev.zhchh.com/',
        changeOrigin: true
      }
    ]
  },
  extraPostCSSPlugins: [
    px2rem({
      rootValue: 37.5
    })
  ],
  metas: [
    {
      name: 'viewport',
      content:
        'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no'
    },
    {
      name:'apple-itunes-app',
      content:"app-id=1503300381"
    }
  ],
  favicon: '/h5/images/favicon.jpg'
})
