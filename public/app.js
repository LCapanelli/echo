(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;require.register("fs", function(exports, require, module) {
  module.exports = {};
});
require.register("net", function(exports, require, module) {
  module.exports = {};
});
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("app.js", function(exports, require, module) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require("handlebars");
var indexRouter = require('../routes');
var usersRouter = require('../routes/users');
require("chalk");
//const dbConnect = require('./config/dbConnect');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs'
}));
app.get('/', function (req, res) {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('main', { layout: 'index' });
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;

});

require.register("app.ts", function(exports, require, module) {
"use strict";
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require("handlebars");
var indexRouter = require('../routes');
var usersRouter = require('../routes/users');
var chalk = require('chalk');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs'
}));
app.get('/', function (req, res) {
    res.render('main', { layout: 'index' });
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
//# sourceMappingURL=app.js.map
});

require.register("buildScripts/srcServer.js", function(exports, require, module) {
var port = 3000;
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});
app.listen(port, function (err) {
    if (err) {
        /* eslint-disable-next-line */
        console.log(err);
    }
    else {
        open('http://localhost:' + port);
    }
});
// const connectDB = async () => {
//     try {
//         await mongoose.connect(db);
//         console.log(chalk.blue("MongoDB is Connected..."));
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// };

});

require.register("buildScripts/srcServer.ts", function(exports, require, module) {
"use strict";
var port = 3000;
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});
app.listen(port, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        open('http://localhost:' + port);
    }
});
//# sourceMappingURL=srcServer.js.map
});

require.register("buildScripts/startMessage.js", function(exports, require, module) {
//let chalk = require('chalk');
// const chalk = require('chalk');
/* eslint-disable-next-line */
console.log(chalk.green("Starting app in DEV mode..."));

});

require.register("buildScripts/startMessage.ts", function(exports, require, module) {
"use strict";
console.log(chalk.green("Starting app in DEV mode..."));
//# sourceMappingURL=startMessage.js.map
});

require.register("buildScripts/testSetup.js", function(exports, require, module) {
require('babel-register')();

require.extensions['.css'] = function () {};
});

require.register("initialize.js", function(exports, require, module) {
var numeral = require('numeral');
var value = numeral(999).format('$0,0.00');
document.addEventListener('DOMContentLoaded', function () {
    // do your setup here
    console.log('Initialized app');
    console.log("I would pay " + value + " for this course!"); // eslint-disable-line no-console
});

});

require.register("initialize.ts", function(exports, require, module) {
"use strict";
var numeral = require('numeral');
var value = numeral(999).format('$0,0.00');
document.addEventListener('DOMContentLoaded', function () {
    console.log('Initialized app');
    console.log("I would pay " + value + " for this course!");
});
//# sourceMappingURL=initialize.js.map
});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map