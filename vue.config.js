const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      contextIsolation: false,
      builderOptions: {
        productName: "Canada Gen",
        extraResources: [{
          from: "./data/",
          to: "data",
        },],
      },
    }
  },
  configureWebpack: {
    resolve: {
      alias: {},
      fallback: {
        //其他的如果不启用可以用 keyname :false，例如：crypto:false,
        "https": require.resolve("https-browserify"),
      },
    },
    plugins: [new NodePolyfillPlugin()]
  }
})
