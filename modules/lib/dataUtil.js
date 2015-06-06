"use strict";

var mongoose = require('mongoose');
var log = require('log')();
var co = require('co');
var thunkify = require('thunkify');

var db;

function *createEmptyDb() {

  function *open() {

    if (mongoose.connection.readyState == 1) { // connected
      return mongoose.connection.db;
    }

    yield new Promise(function(resolve, reject) {
      mongoose.connection.on('open', resolve)
    });

    return mongoose.connection.db;
  }

  function *clearDatabase() {

    var collections = yield new Promise(function(resolve, reject) {
      db.listCollections().toArray(function(err, items) {
        if (err) return reject(err);
        resolve(items);
      });
    });

    var collectionNames = collections
      .map(function(collection) {
        //console.log(collection.name);
        //var collectionName = collection.name.slice(db.databaseName.length + 1);
        if (collection.name.indexOf('system.') === 0) {
          return null;
        }
        return collection.name;
      })
      .filter(Boolean);

    yield collectionNames.map(function(name) {
      log.debug("drop ", name);
      return thunkify(db.dropCollection)(name);
    });

  }

  // wait till indexes are complete, especially unique
  // required to throw errors
  function *ensureIndexes() {

    yield mongoose.modelNames().map(function(modelName) {
      var model = mongoose.models[modelName];
      return thunkify(model.ensureIndexes.bind(model))();
    });

  }

  // ensure that capped collections are actually capped
  function *ensureCapped() {

    yield mongoose.modelNames().map(function(modelName) {
      var model = mongoose.models[modelName];
      var schema = model.schema;
      if (!schema.options.capped) return;

      return thunkify(db.command)({convertToCapped: model.collection.name, size: schema.options.capped});
    });
  }

  log.debug("co");

  db = yield* open();
  log.debug("open");

  yield* clearDatabase();
  log.debug("clear");

  yield* ensureIndexes();
  log.debug('indexes');

  yield* ensureCapped();
  log.debug('capped');

}

// tried using pow-mongoose-fixtures,
// but it fails with capped collections, it calls remove() on them => everything dies
// so rolling my own tiny-loader
function *loadModels(objectOrFile, options) {
  options = options || {};

  var modelObjectsByType = (typeof objectOrFile == 'string') ? require(objectOrFile) : objectOrFile;
  var modelTypes = Object.keys(modelObjectsByType);

  if (options.reset) {
    for(let type of modelTypes) {
      yield mongoose.models[type].destroy({});
    }
  }

  var modelsByType = {
    /* User => { name: "Vasya" } */
  };

  for(let modelType of modelTypes) {
    let Model = mongoose.models[modelType];

    let modelObjects = modelObjectsByType[modelType];

    if (modelType == 'CourseGroup') console.log(Model.schema);
    /*
    for (var i = 0; i < modelsData[modelName].length; i++) {
      var data = modelsData[modelName][i];
      var model = new Model(data);

      if (data._ref) {
        refToModel[data._ref] = model;
      }

      log.debug("persist", data[i]);
      try {
        yield model.persist();
      } catch (e) {
        if (e.name == 'ValidationError') {
          log.error("loadModel persist validation error", e, e.errors);
        }
        throw e;
      }
    }
     */

  }
}

exports.loadModels = loadModels;
exports.createEmptyDb = createEmptyDb;
