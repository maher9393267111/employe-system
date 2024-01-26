const { i18n } = require("./next-i18next.config");

module.exports = {

  i18n,
  devIndicators: {},
  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT",
    currency: "USD",
  },

  reactStrictMode: true,
  transpilePackages: ['@mui/x-charts'],

  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },



  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
       // fixes proxy-agent dependencies
       net: false,
       dns: false,
       tls: false,
       assert: false,
       // fixes next-i18next dependencies
       path: false,
       fs: false,
       // fixes mapbox dependencies
       events: false,
       // fixes sentry dependencies
       async_hooks: false,
      //  topLevelAwait: true,
      //  layers: true,
      };
    }

    return config;
  },






  // webpack: (config, { dev }) => {
  //   config.devtool = 'eval'
  //   config.module.rules.push(
  //     {
  //          test: /\.(css|scss)/,
  //        loader: 'emit-file-loader',
  //       options: {
  //         name: 'dist/[path][name].[ext]'
  //       }
  //     },
  //     {
  //          test: /\.css$/,
  //       use: ['babel-loader',
  //        'raw-loader', 
  //         'style-loader', 
  //         'css-loader'
      
  //     ]
  //     }
  //   )



  //   return config
  // }




};
