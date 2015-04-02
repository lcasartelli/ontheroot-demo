/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Header = require('./pages/partials/Header.jsx');
var Footer = require('./pages/partials/Footer.jsx');


module.exports = React.createClass({
  displayName: 'App',

  render: function () {
    return (
      <section id="app">
        <Header />
        <RouteHandler />
        <Footer />
      </section>
    );
  }
});
