const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // eslint-disable-line

const { ANALYZE } = process.env
const pro = process.env.NODE_ENV === 'production'
const test = process.env.NODE_TEST === 'test'

module.exports = {
  // useFileSystemPublicRoutes: false,
  // exportPathMap: () => ({
  //   '/': { page: '/' },
  // }),
  webpack: (config) => {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 7777,
        openAnalyzer: true,
      }))
    }
    return config
  },
}
