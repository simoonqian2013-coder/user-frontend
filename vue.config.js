module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        changeOrigin: true
      },
      '/uploads': {
        target: 'http://localhost:8090',
        changeOrigin: true
      }
    }
  }
};
