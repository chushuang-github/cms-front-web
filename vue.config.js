// vue.config.js文件：可以在这个文件里面配置什么，去官网查看
// 官网：https://cli.vuejs.org/zh/config/
// const path = require('path')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  // 配置方式一：vue-cli提供的数
  outputDir: './build',
  // 配置方式二：和wepback属性完全一致
  // configureWebpack中配置的属性会被合并到webpack的配置当中去
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    },
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    devServer: {
      proxy: {
        '/api': {
          target: 'http://152.136.185.210:5000',
          pathRewrite: {
            '^/api': ''
          },
          secure: false,
          changeOrigin: true
        }
      }
    }
  }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // },
  // 配置方式三：链式编程配置
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
}
