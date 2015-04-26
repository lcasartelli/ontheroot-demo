/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');

module.exports = function (treeData) {

  var checkout = require('../../lib/checkout')(treeData);
  
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


    emptyCart: function emptyCart() : void {
      checkout.emptyCart();
    },


    render: function() : React.PropTypes.element {

      var orders = this.cursors.cart.get();

      return (
      <div>
        <h2>Checkout</h2>
        <div className='actualOrder'>
          <button className='pure-button' onClick={this.emptyCart}>Svuota carrello</button>
          <ul>
          {_.map(orders, function (item) {
            return (<li>{item.name} - {item.qty}</li>);
          })}
          </ul>
        </div>
      </div>);
    }

  });

};
