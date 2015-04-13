/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


var RESTAURANTS = require('../../config/restaurants.json');


module.exports = React.createClass({
  displayName: 'Profile',

  propTypes: {},

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },


  getInitialState: function getInitialState() : Object {
    return {
      restaurant: null,
    };
  },


  componentDidMount: function() : void {
  },


  componentWillMount: function() : void {
   
  },


  render: function() : React.PropTypes.element {
  }

});
