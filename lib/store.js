'use strict';

var AWS = require('aws-sdk');
var ok  = require('assert');
//var Promise = require('bluebird');

var DatasetName = 'myDataset';
var dataset = null;
var SyncClient = null;


module.exports = function () {

  var init = function () {
    
    SyncClient = new AWS.CognitoSyncManager();

    return new Promise(function (fullfill, reject) {
      
      if (dataset) {
        fullfill();
      } else {
        SyncClient.openOrCreateDataset(DatasetName, function (err, datasetResponse) {
          if (err) {
            reject(err);
            return;
          }

          dataset = datasetResponse;
          fullfill(datasetResponse);
        });
      }

    });
  };


  var getItem = function (key) {
    
    ok(key, 'key not provided');

    return new Promise(function (fullfill, reject) {
      console.log('dataset', dataset);
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
  

  return {
    init: init,
    getItem: getItem
  }; 

};
