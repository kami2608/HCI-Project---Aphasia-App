module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', {
        "runtime": "automatic"
      }]
    ],
    plugins: ['nativewind/babel', 'module:react-native-dotenv'],
  };
};