const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
	const config = { 
		splitChunks: {
			chunks: 'all'
		}
	}
	if (isProd) {
		config.minimizer = [
			new OptimizeCssWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}
	return config;
}
console.log('IS DEV:', optimization);

module.exports = {
	context: path.resolve(__dirname, 'src'),//задаем путь для проекта, относительно которого будут строится остальные пути
	mode: 'development',
	entry: {
		//точки для входа и пострения файлов
		main: './index.js',
		analytics: './analytics.js'
	},
	output: {
		//выходной файл(ы)
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.json', '.js', '.png'],
		alias: {
			'@models': path.resolve(__dirname, 'src/models'),
			'@': path.resolve(__dirname, 'src'),
		}
	},
	optimization: { 
		splitChunks: {
			chunks: 'all'
		},
	devServer: {
		port: 4300,
		hot: isDev,
		overlay: true,
		open: true
	},
	plugins: [
		new HTMLWebpackPlugin({
			//title: 'gogogo',
			template: './index.html',//шаблон страницы
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
				from: path.resolve(__dirname, 'src/favicon.ico'),
				to: path.resolve(__dirname, 'dist')
				}
			]	
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: ''
						},
					},
					'css-loader'
				]
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader']
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader']
			},
			{
				test: /\.xml$/,
				use: ['xml-loader']
			},
			{
				test: /\.csv$/,
				use: ['csv-loader']
			}						
		]
	}
};