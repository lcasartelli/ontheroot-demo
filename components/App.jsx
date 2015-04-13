/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


module.exports = function (data) {

  var Header = require('./pages/partials/Header.jsx')(data);
  var Footer = require('./pages/partials/Footer.jsx')(data);

  return React.createClass({
    displayName: 'App',

    mixins: [data.minxin],
    
    

    render: function () {
      return (
        <section id="app">
          <Header />
          <RouteHandler mixin />
          <Footer />
        </section>
      );
    }
  });
};