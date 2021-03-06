const path = require('path');

module.exports = {
	mode: 'development',
	// entry: './src/00.fromEvent.interval.js',
	// entry: './src/01.js',
	// entry: './src/02.js',
	// entry: './src/03.js',
	// entry: './src/04.js',
	// entry: './src/05.js',
	// entry: './src/06.js',
	// entry: './src/07.js',
	// entry: './src/08.js',
	// entry: './src/09.js',
	// entry: './src/10.js',
	// entry: './src/11.js',
	// entry: './src/12.js',
	// entry: './src/13.js',
	// entry: './src/14.js',
	// entry: './src/15.js',
	// entry: './src/16.js',
	// entry: './src/17.js',
	// entry: './src/18.js',
	// entry: './src/19.js',
	// entry: './src/20.js',
	// entry: './src/21.js',
	// entry: './src/22.js',
	// entry: './src/23.js',
	// entry: './src/24.js',
	// entry: './src/25.js', // final projeto cards
	// entry: './src/26.js', // novo html - projeto typeAhead | Autocomplete
	// entry: './src/27.js',
	// entry: './src/28.js',
	entry: './src/29.js', // final projeto busca países
	// entry: './src/30.js',
	// entry: './src/31.js',
	// entry: './src/32.js',
	// entry: './src/33.js', // + um html
	// entry: './src/34.js',
	// entry: './src/35.js',
	// entry: './src/36.js',
	devServer: {
		contentBase: './dist',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
};
