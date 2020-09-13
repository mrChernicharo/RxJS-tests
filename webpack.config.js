const path = require('path');

module.exports = {
	mode: 'development',
	// entry: './src/01.js',
	// entry: './src/02.js',
	// entry: './src/03.js',
	// entry: './src/04.js',
	// entry: './src/05.js',
	// entry: './src/06.js',
	// entry: './src/07.js',
	// entry: './src/08.js',
	entry: './src/09.js',
	// entry: './src/10.js',
	// entry: './src/11.js',
	// entry: './src/12.js',
	// entry: './src/13.js',
	devServer: {
		contentBase: './dist',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
};
