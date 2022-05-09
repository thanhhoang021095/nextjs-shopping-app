const configParams = require(`./config/${process.env.NODE_ENV}.json`);
const path = require('path');

module.exports = {
  devIndicators: {
    buildActivity: false
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