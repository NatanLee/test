const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	mode: 'development',
	entry: {
		main: './assets/index.js',
		analytics: './assets/analytics.js'
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HTMLWebpackPlugin({
			title: 'gogogo',
			template: './assets/index.html'
		})
	]
};