'use strict';

import path from 'path';
import plugins from './webpack/plugins';
import rules from './webpack/rules';
import conf from './config.json';

const { library } = conf.scripts;

const { NODE_ENV } = process.env;

const config = {
	devtool: NODE_ENV === 'production' ? 'source-map' : 'eval',
	entry: './src/example/index.js',
	output: {
		filename: 'bundle.js',
		publicPath: '/',
		libraryTarget: 'umd',
		library
	},
	module: {
		rules
	},
	plugins,
	resolve: {
		extensions: ['.js']
	}
};

if(NODE_ENV === 'production'){
	config.externals = {
		'react': {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		}
	};
}else{
	config.devServer = {
		contentBase: path.join(__dirname, 'src/example'),
		port: 8080
	};
}

module.exports = config;
