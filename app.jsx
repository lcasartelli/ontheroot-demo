'use strict';

var _ = require('lodash');
//var AWS = require('aws-sdk');
var Baobab = require('baobab');
var React = require('react/addons');
var Router = require('react-router');
//var Promise = require('bluebird');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var treeData = new Baobab({
  user: {
    authed: false,
  },
  profile: {},
  cart: []
});

var userCursor = treeData.select('user');
var cartCursor = treeData.select('cart');
var profileCursor = treeData.select('profile');

// React components
var App = require('./components/App.jsx')(treeData);
var Login = require('./components/pages/Login.jsx')(treeData);
var Index = require('./components/pages/Index.jsx')(treeData);
var Restaurants = require('./components/pages/Restaurants.jsx')(treeData);
var Restaurant = require('./components/pages/Restaurant.jsx')(treeData);
var Checkout = require('./components/pages/Checkout.jsx')(treeData);
var Profile = require('./components/pages/Profile.jsx')(treeData);


var cognitoAuth = require('./lib/cognito')();
var facebookCognito = require('./lib/cognito.facebook')(treeData);
var checkout = require('./lib/checkout')(treeData);
var userHandler = require('./lib/user')(treeData);

var syncClient;


cognitoAuth.unAuthUserLogin().then(function () {

  checkout.getCurrentOrder().then(function (data) {
    if (!data) {
      data = [];
    }
    cartCursor.edit(data);
  });

  cartCursor.on('update', function _onCartItemsUpdate() {
    checkout.autoSyncronizeCart().then(function () {
      console.log('sync cart completed');
    });
  });


  loadApp();
});

var facebookToken = window.sessionStorage.getItem('facebookToken');

if (facebookToken) {
  userCursor.set('accessToken', {
    type: 'fb',
    token: facebookToken,
  });
} else {
  //facebookAuth.checkLogin(userCursor);
}


profileCursor.on('update', function () {
  userHandler.autoSyncronizeProfile().then(function () {
    console.log('sync user completed');
  });  
});

userCursor.on('update', function _updateUser() {
  var user = userCursor.get();
  
  if (!user.authed && user.accessToken !== null) {

    cognitoAuth.authUserLogin(user.accessToken.type, user.accessToken.token)
    .then(function () {

      userCursor.set('authed', true);

      userHandler.loadProfile().then(function (data) {
        if (!data) {
          return facebookCognito.loadFacebookProfile();  
        } else {
          return data;
        }
      }).then(function (data) {
        profileCursor.edit(data);
      });
    });

  }
});

var routes = (
  <Route handler={App} name='app'>
    <Route handler={Index} name='home' path='/' />
    <Route handler={Restaurants} name='restaurants' path='/restaurants' />
    <Route handler={Login} name='login' path='/login' />
    <Route handler={Restaurant} name='restaurant' path='/restaurant/:restaurantSlug' />
    <Route handler={Checkout} name='checkout' path='/checkout' />
    <Route handler={Profile} name='profile' path='/profile' />
  </Route>
);

// config routes
var router = Router.create({routes: routes });

var  loadApp = function loadApp() {

  router.run(function(Handler) {
    React.render(
      <Handler />,
      document.querySelector('#fullnode')
    );
  });
};