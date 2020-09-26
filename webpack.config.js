const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const isProd = process.env.NODE_ENV === "production";

const htmlPlugin = new HtmlWebpackPlugin({
  title: "template",
  hash: false,
  inject: false,
  showErrors: false,
  template: path.join(__dirname, "./src/index.html"),
});

const configurePlugins = () => {
  const plugins = [];
  return plugins;
};

const configureBabelLoader = (envConfig) => {
  return {
    test: /\.tsx?$/,
    use: {
      loader: "babel-loader",
      options: {
        babelrc: false,
        presets: [
          ["@babel/env", envConfig],
          "@babel/react",
          "@babel/typescript",
        ],
      },
    },
  };
};

const baseConfig = {
  mode: isProd ? "production" : "development",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

const modernConfig = {
  ...baseConfig,
  plugins: [...configurePlugins(), htmlPlugin],
  ...{
    output: {
      path: path.join(__dirname, "dist"),
      publicPath: "/",
      filename: `[name].mjs`,
    },
    entry: {
      bundle: "./src/index.tsx",
    },
    module: {
      rules: [
        configureBabelLoader({
          corejs: "3.6.5",
          useBuiltIns: "usage",
          bugfixes: true,
          //debug: true,
          targets: {
            esmodules: true,
          },
        }),
      ],
    },
  },
};

const legacyConfig = {
  ...baseConfig,
  ...{
    output: {
      path: path.join(__dirname, "dist"),
      publicPath: "/",
      filename: `[name].js`,
    },
    entry: {
      ["bundle.es5"]: "./src/index.tsx",
    },
    plugins: configurePlugins(),
    module: {
      rules: [
        configureBabelLoader({
          corejs: "3.6.5",
          useBuiltIns: "usage",
          //debug: true,
          targets: {
            browsers: [
              "> 0.25%",
              "not dead",
              "last 2 versions",
              "Android > 4.4",
              "ie >= 11",
            ],
          },
        }),
      ],
    },
  },
};

module.exports = [modernConfig, legacyConfig];
