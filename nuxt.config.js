module.exports = {
	mode: 'spa',
	head: {title: 'supergreendesktop'}, // Headers of the page
	loading: false, // Disable default loading bar
	build: {
		extend (config, { isDev, isClient }) {
			if (isDev && isClient) {
			}
			// Extend only webpack config for client-bundle
			if (isClient) { config.target = 'electron-renderer' }
		}
	},
  router: {
    middleware: ['welcome'],
  },
	dev: process.env.NODE_ENV === 'DEV',
	css: [
		'@/assets/css/global.css'
  ],
  modules: [
    '@nuxtjs/axios',
  ],
}
