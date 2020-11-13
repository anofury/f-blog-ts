const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Path = require('path');
const SRC_DIR = Path.resolve(__dirname, './src');
const COM_DIR = Path.resolve(__dirname, './common');
const BUILD_DIR = Path.resolve(__dirname, './build');
const ARTICLE_DIR = Path.resolve(__dirname, './articles');
const ARTICLE_BUILD_DIR = Path.resolve(__dirname, './build/articles');

const { getArticleInfo } = require('./article.analyzer');

module.exports = {
	entry: {
		blog: Path.resolve(SRC_DIR, './Blog.tsx'),
		articleIndex: Path.resolve(__dirname, './article.index.js'),
	},
	output: {
		path: BUILD_DIR,
		filename: '[name].js?[hash:8]',
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg|jpeg|gif|bmp|ttf|eot|woff|woff2)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192,
						esModule: false,
						outputPath: 'imgs',
						name: '[name].[ext]',
					},
				}],
			},
			{
				test: /\.css/,
				use: ['style-loader', 'css-loader'],
				include: [/antd\-mobile/, /normalize\.css/],
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: COM_DIR,
					to: BUILD_DIR,
					globOptions: {
						ignore: ['**/ori/**'],
					},
				}, {
					from: ARTICLE_DIR,
					to: ARTICLE_BUILD_DIR
				},
			],
		}),
		new HtmlWebpackPlugin({
			template: Path.resolve(COM_DIR, './index.html'),
			title: 'waitting...',
			inject: true,
			timestamp: new Date().getTime(),
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				minifyCSS: true,
				minifyJS: true,
			},
			chunks: 'all',
		}),
		new webpack.DefinePlugin({
			WebpackDefiner: JSON.stringify(getArticleInfo()),
		}),
	],
	resolve: {
		alias: {
			'@comp': Path.resolve(SRC_DIR, 'components')
		},
		extensions: ['.tsx', '.ts', '.jsx', '.js']
	},
};
