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
		//вывод  одинаковых элементов в файл(чтобы не было повторений)
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
//убираем из имени хэш при продакшене
const filename = ext => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`;
//
const cssLoaders = (extra) => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				publicPath: ''
			},
		},
		'css-loader'		
	];
	if(extra){
		loaders.push(extra);
	}
	return loaders;
}

const babelOptions = preset => {
	const opts = {		
		presets: [
			'@babel/preset-env'
			],
		plugins: [
			'@babel/plugin-proposal-class-properties'
		]		
	}
	
	if(preset){
		opts.presets.push(preset);
	}
	
	return opts;
} 
//только для eslint 
const jsLoaders = () => {
	const loaders = [{
		loader: 'babel-loader',
		options: babelOptions()
	}];
	
	if (isDev){
		loaders.push('eslint-loader');
	}
	
	return loaders;
	
}

module.exports = {
	context: path.resolve(__dirname, 'src'),//задаем путь для проекта, относительно которого будут строится остальные пути
	mode: 'development',
	entry: {
		//точки для входа и пострения файлов
		main: ['@babel/polyfill', './index.jsx'],
		analytics: './analytics.ts'
	},
	output: {
		//выходной файл(ы)
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.json', '.js', '.png'],
		alias: {
			'@models': path.resolve(__dirname, 'src/models'),
			'@': path.resolve(__dirname, 'src'),
		}
	},
	optimization: optimization(),	
	devServer: {
		port: 4300,
		hot: isDev,
		overlay: true,
		open: true
	},
	//выдает ошибку в режиме build
	/* devtool: isDev ? 'source-map' : '', */
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
			filename: filename('css')
		})
	],
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				use: cssLoaders('less-loader')
			},
			{
				test: /\.(s[ac]ss)$/i,
				use: cssLoaders('sass-loader')
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
			},
			//loader без eslint
			/* {
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOptions()
				}
			}, */
			//loader с eslint
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: jsLoaders()
			},
			//typeScript
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-typescript')
				}
			},
			//react
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-react')
				}
			}			
		]
	}
};