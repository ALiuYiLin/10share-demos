const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isDev = argv?.mode !== 'production';
  const styleOrExtract = isDev ? 'style-loader' : MiniCssExtractPlugin.loader;

  return {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[contenthash].js',
      clean: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: { compilerOptions: { noEmit: false } },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [styleOrExtract, 'css-loader'],
        },
        {
          test: /\.module\.less$/,
          use: [
            styleOrExtract,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]__[hash:base64:5]',
                  namedExport: false,
                },
                importLoaders: 1,
                esModule: true,
              },
            },
            {
              loader: 'less-loader',
              options: { lessOptions: { javascriptEnabled: true } },
            },
          ],
        },
        {
          test: /\.less$/,
          exclude: /\.module\.less$/,
          use: [
            styleOrExtract,
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
          generator: { filename: 'assets/images/[name].[contenthash][ext]' },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: { filename: 'assets/fonts/[name].[contenthash][ext]' },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public/index.html'), inject: 'body' }),
      ...(isDev ? [] : [new MiniCssExtractPlugin({ filename: 'assets/css/[name].[contenthash].css' })]),
    ],
    devtool: 'source-map',
    devServer: {
      static: { directory: path.resolve(__dirname, 'dist') },
      port: 8080,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
  };
};
