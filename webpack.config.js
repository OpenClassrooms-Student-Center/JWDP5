const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    polyfill: 'babel-polyfill',
    app: './frontend/app.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './frontend/dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, './frontend/dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: { url: false, sourceMap: true },
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          },
        ]
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.bundle.css'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Caméras vintage',
      template: './frontend/src/index.html',
      filename: './index.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Choisir ce produit',
      template: './frontend/src/produit.html',
      filename: './produit.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Valider le panier',
      template: './frontend/src/panier.html',
      filename: './panier.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Confirmation de votre achat',
      template: './frontend/src/confirmation.html',
      filename: './confirmation.html'
    })
  ]
};
