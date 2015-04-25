var ok = require('assert');
var _ = require('lodash');

var store = require('./store')();
var DATASET_NAME = 'userData';
var PROFILE_KEY = 'profile';

 
module.exports = function(treeData) {

  var profileDataset = null;
  var userProfile = treeData.select('userProfile');


  var _loadDataset = function _loadDataset() {

    return new Promise(function (fullfill, reject) {
      if (!profileDataset) {
        store.init(DATASET_NAME).then(function initStoreCallback(dataset) {
          profileDataset  = dataset;
          fullfill();
        });
      } else {
        console.log('dataset already loaded');
        fullfill();
      }
    }); 
  };


  var autoSyncronizeProfile = function autoSyncronizeProfile() {
    return new Promise(function (fullfill, reject) {  
      console.log('cart change, resync cognito databaset');
      _syncronizeDataset().then(function () {
        fullfill();
      }, reject);
    });
  };


  var _syncronizeDataset = function _syncronizeDataset() {
    return _loadDataset()
    .then(function () {
      return store.setItem(PROFILE_KEY, JSON.stringify(cart.get()), profileDataset);
    }).then(function () {
      return store.syncronize(profileDataset);
    });
  };


  var removeItem = function removeItem() {
    ok(profileDataset, 'First init the dataset');
    console.log('deleting item...');
  };


  var updateProfile = function updateProfile(newItem, qty) {

    ok(typeof newItem === 'object', 'Missing required, no item provided');

    userProfile.set();

  };


  var loadProfile = function () {
    return _loadDataset()
    .then(function () {
      return store.getItem(PROFILE_KEY, profileDataset);
    })
    .then(function (order) {
      if (typeof order === 'string') {
        order = JSON.parse(order);
      }
      return order;
    });
  };


  var emptyCart = function emptyCart() {
    cart.edit([]);
    console.log('Empty cart...');
  };


  return {
    updateProfile: updateProfile,
    autoSyncronizeProfile: autoSyncronizeProfile,
    loadProfile: loadProfile,
    emptyCart: emptyCart,
  };
};