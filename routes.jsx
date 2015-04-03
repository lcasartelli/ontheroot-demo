'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/App.jsx');
var Login = require('./components/pages/Login.jsx');
var Index = require('./components/pages/Index.jsx');
var Restaurant = require('./components/pages/Restaurant.jsx');
var Dish = require('./components/pages/Dish.jsx');

var routes = (
  <Route handler={App} name='app'>
    <Route handler={Index} name='home' path='/' />
    <Route handler={Login} name='login' path='/login' />
    <Route handler={Restaurant} name='restaurant' path='/restaurant/:restaurantSlug' />
    <Route handler={Dish} name='dish' path='/dish/:restaurantSlug/:dishSlug' />
  </Route>
);

module.exports = routes;