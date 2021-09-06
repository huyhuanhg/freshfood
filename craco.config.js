const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1DA57A',
              '@btn-primary-shadow': 'unset',
              '@btn-shadow': 'unset',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
