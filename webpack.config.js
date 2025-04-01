const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin"); // 必须添加这一行

module.exports = {
  mode: "development",
  entry: "./src/index.tsx", // 入口文件
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: '/yitong-pro/insights/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 CSS 转换为 JavaScript 字符串，并将其注入到 DOM 中
          "style-loader",
          // 解析 @import 和 url() 等语句
          "css-loader",
          // 将 SCSS 编译为 CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // 匹配图片文件
        type: "asset/resource", // 使用 Asset Modules 处理图片
        generator: {
          filename: "assets/[name][ext]", // 输出路径和文件名
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // 支持的扩展名
    alias: {
      src: path.resolve(__dirname, "src"), // 配置 src 路径别名
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // 主输出目录
    },
    compress: true,
    port: 9000,
    hot: true,
    open: true,
    historyApiFallback: {
      index: "/index.html", // 确保所有路径都重定向到 index.html
    }, 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      publicPath: '/yitong-pro/insights/', // 如果需要的话，可以在这里指定公共路径
    }),
    // 新增插件，复制 public 目录到 dist
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
          globOptions: {
            ignore: ["**/index.html"], // 排除已处理的 index.html
          },
        },
      ],
    }),
  ],
};
