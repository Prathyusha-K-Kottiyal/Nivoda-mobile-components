function getAliasesFromTsConfig() {
  const tsConfig = require("./tsconfig.json");
  const { paths } = tsConfig.compilerOptions;

  const alias = {};

  Object.keys(paths).forEach((key) => {
    alias[key.replace(/\/\*$/, "")] = `./${paths[key][0].replace(/\/\*$/, "")}`;
  });

  return alias;
}

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            "@mobile-components/*": "./src/*",
          },
        },
      ],
    ],
  };
};
