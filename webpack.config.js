import path from 'path';
import webpack from 'webpack';


const npmPath = resolve('./node_modules');
const srcPath = resolve('./src');

export default {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  resolve: {
    extensions: ['', '.js'],
    alias: {
      'vis-network': 'vis/lib/network/Network.js',
    },
    root: [npmPath, srcPath],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel', 'eslint'],
      include: srcPath,
    }],
  },
};


function resolve() {
  return path.resolve(path, __dirname, ...arguments);
}
