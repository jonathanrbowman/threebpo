const path = require("path");

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [new VuetifyLoaderPlugin()],
    resolve: {
      alias: {
        vue$: path.resolve("./node_modules/vue/dist/vue.runtime.esm.js")
      }
    }
  }
};
