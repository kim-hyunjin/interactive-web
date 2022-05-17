const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    createScene: {
      import: "./src/createScene.js",
    },
    drawLines: {
      import: "./src/drawLines.js",
    },
    updateThings: {
      import: "./src/updateThings.js",
    },
    loadModel: {
      import: "./src/loadModel.js",
    },
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "eval-cheap-source-map",
};
