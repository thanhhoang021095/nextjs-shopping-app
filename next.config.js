const path = require('path');
const configParams = require(`./config/${process.env.NODE_ENV}.json`);

module.exports = {
  devIndicators: {
    buildActivity: false
  },
  serverRuntimeConfig: {
    ...configParams,
  },
  publicRuntimeConfig: {
    ...configParams,
  },
  env: {
    ...configParams,
  },
  webpack(config, options) {
    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}