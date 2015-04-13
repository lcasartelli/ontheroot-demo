'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Baobab = require('baobab');

var treeData = new Baobab({
  user: {
    authed: false,
  }
});

var App = require('./components/App.jsx')(treeData);
var Login = require('./components/pages/Login.jsx')(treeData);
var Index = require('./components/pages/Index.jsx')(treeData);
var Restaurant = require('./components/pages/Restaurant.jsx')(treeData);
var Dish = require('./components/pages/Dish.jsx')(treeData);



var routes = (
  <Route handler={App} name='app'>
    <Route handler={Index} name='home' path='/' />
    <Route handler={Login} name='login' path='/login' />
    <Route handler={Restaurant} name='restaurant' path='/restaurant/:restaurantSlug' />
    <Route handler={Dish} name='dish' path='/dish/:restaurantSlug/:dishSlug' />
  </Route>
);

module.exports = routes;