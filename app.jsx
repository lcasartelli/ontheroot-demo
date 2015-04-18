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
  cart: {
    items: [],
    createOn: Date.now(),
    completed: false    
  }
});
var userCursor = treeData.select('user');

// React components
var App = require('./components/App.jsx')(treeData);
var Login = require('./components/pages/Login.jsx')(treeData);
var Index = require('./components/pages/Index.jsx')(treeData);
var Restaurant = require('./components/pages/Restaurant.jsx')(treeData);
var Dish = require('./components/pages/Dish.jsx')(treeData);
var Checkout = require('./components/pages/Checkout.jsx')(treeData);

var cognitoAuth = require('./lib/cognito')();
var facebookAuth = require('./lib/cognito.facebook')();
var syncClient;


cognitoAuth.unAuthUserLogin().then(function () {
  loadApp();
});

var facebookToken = window.sessionStorage.getItem('facebookToken');
console.log('facebookToken', facebookToken);
if (facebookToken) {
  userCursor.set('accessToken', {
    type: 'fb',
    token: facebookToken,
  });
} else {
  facebookAuth.checkLogin(userCursor);
}




userCursor.on('update', function _updateUser() {
  var user = userCursor.get();
  
  if (!user.authed && user.accessToken !== null) {

    cognitoAuth.authUserLogin(user.accessToken.type, user.accessToken.token)
    .then(function () {
      //userCursor.set('identityId', AWS.config.credentials.identityId);
      userCursor.set('authed', true);
    });

  }
});

var routes = (
  <Route handler={App} name='app'>
    <Route handler={Index} name='home' path='/' />
    <Route handler={Login} name='login' path='/login' />
    <Route handler={Restaurant} name='restaurant' path='/restaurant/:restaurantSlug' />
    <Route handler={Dish} name='dish' path='/dish/:restaurantSlug/:dishSlug' />
    <Route handler={Checkout} name='checkout' path='/checkout' />
  </Route>
);

// config routes
var router = Router.create({routes: routes});

var  loadApp = function loadApp() {

  router.run(function(Handler) {
    React.render(
      <Handler />,
      document.querySelector('#fullnode')
    );
  });
};