module.exports = {
  "transpileDependencies": [
    "vuetify"
  ], 
      devServer: {
        disableHostCheck: true,
        BACKEND_URL: process.env.BACKEND_URL
    }
}