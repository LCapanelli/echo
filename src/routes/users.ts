// import express from 'express';
const expressUser = require('express');
const routerUser = expressUser.Router();

/* GET users listing. */
routerUser.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = routerUser;
