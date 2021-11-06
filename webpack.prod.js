const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "groups",
      library: { type: "var", name: "groups" },
      filename: "groupsRemoteEntry.js",
      exposes: {
        // expose each component
        "./Groups": "./src/components/Groups",
      },
      remotes:{
        visualization:"visualization"
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        uuid: { singleton: true, eager: true, requiredVersion: deps.uuid },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
        "@mui/material": {
          singleton: true,
          eager: true,
          requiredVersion: deps["@mui/material"],
        },
        "@mui/x-data-grid": {
          singleton: true,
          eager: true,
          requiredVersion: deps["@mui/x-data-grid"],
        },
      },
    }),
  ],
  performance: { hints: false },
};
