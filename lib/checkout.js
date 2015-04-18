
var ok = require('assert');
var _ = require('lodash');

var store = require('./store')();
var DATASET_NAME = 'orders';
var ACTUAL_ORDER_KEY = 'actualOrder';

 
module.exports = function(cartCursor) {

  var ordersDataset = null;
  var cart = cartCursor;


  var _loadDataset = function () {

    return new Promise(function (fullfill, reject) {
      if (!ordersDataset) {
        store.init(DATASET_NAME).then(function initStoreCallback(dataset) {
          ordersDataset  = dataset;
          fullfill();
        });
      } else {
        console.log('dataset already loaded');
        fullfill();
      }
    }); 
  };


  var autoSyncronizeCart = function () {
    return new Promise(function (fullfill, reject) {
      console.log('here', 2);
      cart.on('update', function _updateCart() {
        console.log('cart change, resync cognito databaset');
        _syncronizeDataset().then(function () {
          fullfill();
        }, reject);
      });
    });
  };


  var _syncronizeDataset = function _syncronizeDataset() {
    return _loadDataset()
    .then(function () {
      return store.setItem(ACTUAL_ORDER_KEY, JSON.stringify(cart.get()), ordersDataset);
    }).then(function () {
      return store.syncronize(ordersDataset);
    });
  };


  var removeItem = function removeItem() {
    ok(ordersDataset, 'First init the dataset');
    console.log('deleting item...');
  };


  var addItem = function (newItem, qty) {

    ok(typeof newItem === 'object', 'Missing required, no item provided');
    ok(!Number.isNaN(qty), 'Missing required, no quantity provided');

    var itemIndex = _.findIndex(cart.get(), function (o) { return o.slug ===  newItem.slug});

    if (itemIndex > -1) {
      var oldItem = cart.get()[itemIndex];
      oldItem.qty = oldItem.qty + qty;
    } else {
      var item = newItem;
      item.qty = qty;
      cart.get().push(item);
    }

  };


  return {
    addItem: addItem,
    autoSyncronizeCart: autoSyncronizeCart,
  };
};