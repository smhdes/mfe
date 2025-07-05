const ModuleFederationPlugin = require("@module-federation/enhanced/webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  devServer: {
    port: 3001,
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "user_card",
      filename: "remoteEntry.js",
      exposes: {
        "./UserCard": "./src/UserCard",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
        zustand: { singleton: true },
      },
    }),
  ],
};