
/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = function (treeData) {

  return React.createClass({
    displayName: 'CartDropdown',

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


    render: function() : React.PropTypes.element {
      
      var cartItems = this.cursors.cart.get();
      
      return (
        <div id="cart-dropdown">
          {_.map(cartItems, function (item) {
            var price = Number.parseInt(item.qty, 10) * Number.parseFloat(item.price, 10);
          
            return (
            <div className="cart-item">
              <strong>{item.name}</strong>
              <span>{item.qty} porzioni : € {price}</span>
              <button className="pure-button pure-danger"><span>Remove</span></button>
            </div>)})
          }
        </div>
      );
    }

  });

};
