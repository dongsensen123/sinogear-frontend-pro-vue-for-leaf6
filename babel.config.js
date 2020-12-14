module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true },
      "ant-design-vue"
    ],
    [
      "import",
      {
        "libraryName": "sinogear-vue",
        "libraryDirectory": "lib/components",
        "camel2DashComponentName": false,
        "camel2UnderlineComponentName": false,
        "style": (name) => `${name}/style.css`
      },
      "sinogear-vue"
    ]
  ]
};
