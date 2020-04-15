// See http://brunch.io for documentation.
// exports.files = {
//   javascripts: {
//     joinTo: {
//       'vendor.js': /^(?!index)/, // Files that are not in `index` dir.
//       // 'vendor.js': /^node_modules/, // Files that are not in `index` dir.
//       'index.js': /^index/
//     }
//   },
//   stylesheets: {joinTo: 'index.css'},
// };
//
// exports.modules = {
//   modules: {
//     autoRequire: {
//       "index.js": ["index"],
//     }
//   },
//   npm: {
//     enabled: true,
//     globals: {
//       chalk: 'chalk'
//     }
//   }
// };
//
// exports.plugins = {
//   // babel: {presets: ['latest']},
//   brunchTypescript: {
//     removeComments: true,
//     ignoreErrors: true
//   },
//   chalk: {
//     options: {
//       includePaths: [
//         'node_modules/chalk'
//       ]
//     }
//   }
// };

exports.config = {
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!index)/, // Files that are not in `index` dir.
        // 'vendor.js': /^node_modules/, // Files that are not in `index` dir.
        'app.js': /^index/
      }

      // To change the order of concatenation of files, explicitly mention here
      // order: {
      //   before: [
      //     "vendor/js/jquery-2.1.1.js",
      //     "vendor/js/bootstrap.min.js"
      //   ]
      // }
    },
    stylesheets: {
      joinTo: "css/index.css",
    },
    templates: {
      joinTo: "js/app.js"
    }
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    // By default, we set this to "/assets/static". Files in this directory
    // will be copied to `paths.public`, which is "priv/static" by default.
    assets: /^(static)/
  },

  paths: {
    // Dependencies and current project directories to watch
    watched: ["static", "css", "js", "vendor"],
    // Where to compile files to
    public: "../priv/static"
  },

  // Configure your plugins
  plugins: {
    brunchTypescript: {
      removeComments: true,
      ignoreErrors: true
    }
  },

  modules: {
    autoRequire: {
      "js/app.js": ["js/index"]
    }
  },

  npm: {
    enabled: true,
    globals: {
      chalk: 'chalk'
    }
  }
};