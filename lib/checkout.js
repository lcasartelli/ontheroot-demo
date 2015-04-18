
var ok = require('assert');
var _ = require('lodash');

var store = require('./store')();
var DatasetName = 'orders';

 
module.exports = function () {

  var ordersDataset = null;
  var cart = [];
  var key = 'actualOrder';


  var init = function () {
    return new Promise(function (fullfill, reject) {
      if (!ordersDataset) {
        store.init(DatasetName).then(function initStoreCallback(dataset) {
          ordersDataset  = dataset;
          fullfill();
        });
      } else {
        console.log('dataset already loaded');
        fullfill();
      }
    }); 
  };


  var syncDataset = function () {
    init().then(function () {
      console.log('cart dataset item', cart);
      store.setItem('actualOrder', cart, ordersDataset);
      store.sync(ordersDataset);
    });
  };


  var removeItem = function removeItem() {
    ok(ordersDataset, 'First init the dataset');
    console.log('deleting item...');
  };

  var addItem = function (newItem, qty) {

    if (typeof qty === 'undefined') {
      qty = 1;
    }

    var item =_.find(cart, function (item) { return item.slug ===  newItem.slug});
    if (!item) {
      item = newItem;
      item.qty = qty;
    }

    cart.push(item);
    syncDataset();
  };


  return {
    init: init,
    addItem: addItem,
  };
};