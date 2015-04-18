



/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


var checkout = require('../../lib/checkout')();


var RESTAURANTS = require('../../config/restaurants.json');


module.exports = function (treeData) {
  
  return React.createClass({
    displayName: 'Checkout',

    mixins: [treeData.mixin],
    cursors: {
      user: ['user'],
      cart: ['cart'],
    },


    getInitialState: function getInitialState() : Object {
      return {};
    },


    componentDidMount: function() : void {
    },


    componentWillMount: function() : void {
     
    },

    buy: function buy() {
      checkout.addItem({ slug: 'hello' }, 2);
    },


    render: function() : React.PropTypes.element {

      return  (
        <div>
          <button onClick={this.buy}>Buy</button>
        </div>);
    }

  });

};
