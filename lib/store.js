'use strict';

//var AWS = require('aws-sdk');
var ok  = require('assert');
//var Promise = require('bluebird');
var SyncClient = null;


module.exports = function () {

  var init = function (DatasetName) {
    
    SyncClient = new AWS.CognitoSyncManager();

    return new Promise(function (fullfill, reject) {
    
      SyncClient.openOrCreateDataset(DatasetName, function (err, datasetResponse) {
        if (err) {
          reject(err);
          return;
        }

        console.log('debug--->init dataset', arguments);
        console.log(datasetResponse);

        fullfill(datasetResponse);
      });

    });
  };


  var syncronize = function (dataset) {
    return new Promise(function (fullfill, reject) {

      dataset.synchronize({

        onSuccess: function(dataset, newRecords) {
          console.log('sync success', arguments);
          fullfill();
        },

        onFailure: function(err) {
          console.log('sync failed', err.stack, err.message);
          reject();
        },

        onConflict: function(dataset, conflicts, callback) {
          var resolved = [];
          for (var i=0; i<conflicts.length; i++) {
            resolved.push(conflicts[i].resolveWithRemoteRecord());
          }

          dataset.resolve(resolved, function() {
            return callback(true);
          });
        },

        onDatasetDeleted: function(dataset, datasetName, callback) {
          return callback(true);
        },

        onDatasetMerged: function(dataset, datasetNames, callback) {
          return callback(false);
        }

      });
    });
  };


  var getItem = function (key, dataset) {
    
    ok(key, 'key not provided');
    ok(dataset, 'dataset not provided');

    return new Promise(function (fullfill, reject) {
      
      dataset.get(key, function (err, objValue) {
        
        if (err) {
          reject(err);
          return;
        }

        console.log('value with key', objValue, key);
        fullfill(objValue);
      });
    });
  };


  var setItem = function (key, value, dataset) {
    
    ok(key, 'key not provided');
    ok(value, 'value not provided');
    ok(dataset, 'dataset not provided');

    return new Promise(function (fullfill, reject) {
      
      dataset.put(key, value, function (err, objValue) {
        
        if (err) {
          reject(err);
          return;
        }

        console.log('value with key', objValue, key);
        fullfill(objValue);
      });
    });
  };
  

   var removeItem = function (key, dataset) {
    
    ok(key, 'key not provided');

    return new Promise(function (fullfill, reject) {
      
      dataset.remove(key, function (err, objValue) {
        
        if (err) {
          reject(err);
          return;
        }

        console.log('value with key', objValue, key);
        fullfill(objValue);
      });
    });
  };

  return {
    init: init,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    syncronize: syncronize,
  }; 

};
