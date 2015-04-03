/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;


module.exports = React.createClass({
  displayName: 'Header',

  propTypes: {},


  getInitialState: function getInitialState() : Object {
    return {};
  },


  componentDidMount: function() : void {

  },


  render: function() : React.PropTypes.element {
    
    return (
      <nav className='header'>
        <div className='logo'>
          <Link to="home">
            <img src='./assets/img/logo.png' />
          </Link>
        </div>
      </nav>
    );
  }

});
