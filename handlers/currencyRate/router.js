// CRONTAB: run me hourly
var Router = require('koa-router');
var mustBeAdmin = require('auth').mustBeAdmin;

var router = module.exports = new Router();

var update = require('./lib/update');

router.get('/update', mustBeAdmin, function*() {
  yield* update();

  this.body = {
    status: "ok",
    time: new Date()
  };
});

