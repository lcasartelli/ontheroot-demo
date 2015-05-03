var ok = require('assert');
var _ = require('lodash');

var store = require('./store')();
var DATASET_NAME = 'userData';
var PROFILE_KEY = 'profile';


module.exports = function(treeData) {

  var profileDataset = null;
  var userProfile = treeData.select('profile');


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
      return store.setItem(PROFILE_KEY, JSON.stringify(userProfile.get()), profileDataset);
    });
    // .then(function () {
    //   return store.syncronize(profileDataset);
    // });
  };


  var updateProfile = function updateProfile(data) {

    ok(typeof data === 'object', 'Missing required, no item provided');

    userProfile.set('nome', data.nome);
    userProfile.set('cognome', data.cognome);
    userProfile.set('email', data.email);
    userProfile.set('telefono', data.telefono);

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


  return {
    updateProfile: updateProfile,
    autoSyncronizeProfile: autoSyncronizeProfile,
    loadProfile: loadProfile,
  };
};
