const webpack = require('webpack');

module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'expense_book',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [['@nuxtjs/pwa', { icon: false }]],
  router: {
    middleware: 'authentication'
  },
  plugins: [
    // { src: "~plugins/persistedstate.js", ssr: false },
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['localstorage-ttl', 'jquery', 'materialize-css'],
    styleResources: {
      scss: './assets/scss/common.scss',
      options: {}
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        // Materialize.css用
        'window.jQuery': 'jquery'
      })
    ],
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
