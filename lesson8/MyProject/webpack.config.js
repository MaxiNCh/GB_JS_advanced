const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: [ "./src/index.js"]
	},
	output: {
		path: path.join(__dirname, 'dist/public'),
		publicPath: "/",
		filename: "js/[name].js"
	},
	mode: 'development',
	target: 'web',
	module: {
		rules: [
			{
				test: /index\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|jpg|jpeg|svg|gif)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'img'
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			filename: 'index.html',
			excludeChunks: ['components']
		})
	]
}