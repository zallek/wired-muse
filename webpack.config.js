import path from 'path';
import webpack from 'webpack';


const srcPath = resolve('./src');
const npmPath = resolve('./node_modules');
const distPath = resolve('./dist');

const es6Modules = [
  'vis',
];

const autoprefixerConfig = {
  browsers: ['Firefox > 27', 'Chrome > 20', 'Explorer > 9', 'Safari > 6', 'Opera > 11.5', 'iOS > 6.1'],
};
const sassConfig = {
  outputStyle: 'expanded',
};

export default {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index',
  ],
  output: {
    path: distPath,
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
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel', 'eslint'],
        include: srcPath,
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: es6Modules.map(mod => RegExp(mod)),
      },
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer?' + JSON.stringify(autoprefixerConfig) + '!sass?' + JSON.stringify(sassConfig),
      },
      {
        test: /\.css$/,
        loader: 'style!css!autoprefixer?' + JSON.stringify(autoprefixerConfig),
      },
      {
        test: /\.png$/,
        loader: 'url',
        query: { mimetype: 'image/png' },
      },
    ],
  },
};


function resolve() {
  return path.resolve(path, __dirname, ...arguments);
}
