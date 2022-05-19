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
    littlestTokyo: {
      import: "./src/littlestTokyo.js",
    },
    createText: {
      import: "./src/createText.js",
    },
    css2dRender: {
      import: "./src/css2dRender.js",
    },
    css2dLabel: {
      import: "./src/css2dLabel.js",
    },
    css3dPeriodictable: {
      import: "./src/css3dPeriodictable.js",
    },
    css3dSprites: {
      import: "./src/css3dSprites.js",
    },
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "eval-cheap-source-map",
};
