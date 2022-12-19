const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common')

module.exports = ({ env }) => {
  const envConfig = require(`./webpack.${env}`)
  return webpackMerge(commonConfig, envConfig)
}
