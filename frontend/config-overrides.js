const path = require('path')

module.exports = {
  webpack: function (config, _env) {
    config.resolve = {
      ...config.resolve,
      alias: { '@/': path.resolve(__dirname, './src/'), '@': path.resolve(__dirname, './src/') },
    }
    return config
  },
}
