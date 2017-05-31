const webpack = require('webpack');

module.exports = {
  entry: [
	  'webpack-dev-server/client?http://localhost:8080/',
	  'webpack/hot/only-dev-server',
	  './src/index.js'
  ],
  module: {
	  loaders: [
	    {
	      test: /\.jsx?$/,
	      exclude: /node_modules/,
	      loader: 'react-hot-loader!babel-loader'
	    },
	    {
	      test: /\.(graphql|gql)$/,
	      exclude: /node_modules/,
	      loader: 'graphql-tag/loader'
	    },
	    {
	      test: /\.css$/,
	      loader: 'style-loader!css-loader?modules',
	      include: /flexboxgrid/
	    }
	  ]
  },
  resolve: {
	  extensions: ['*', '.js', '.jsx']
  },
  output: {
	  path: __dirname + '/dist',
	  publicPath: '/',
	  filename: 'bundle.js'
  },
  devServer: {
	  contentBase: './dist',
	  disableHostCheck: true,
	  hot: true
  }
}
