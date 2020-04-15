const expressIndex = require('express');
const routerIndex = expressIndex.Router();

/* GET home page. */
routerIndex.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = routerIndex;
