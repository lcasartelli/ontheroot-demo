
/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = function (treeData) {
  
  var checkout = require('../../lib/checkout')(treeData);
  var CheckoutItem = require('./CheckoutItem.jsx')(treeData);
  
  
  return React.createClass({
    displayName: 'CartBox',

    propTypes: {
      onEnd: React.PropTypes.func.isRequired,
    },
    
    mixins: [treeData.mixin],
    
    cursors: {
      cart: ['cart'],
    },


    getInitialState: function getInitialState() : Object {
      return {
        totalCart: 0,
      };
    },
    
    
    componentDidMount: function() : void {

    },
    
    
    updateItemQuantity: function updateItemQuantity(item, quantity) {
      var cart = this.cursors.cart.get();
      var itemIndex = _.findIndex(cart, function (o) { return item.slug === o.slug; });
      if (itemIndex > -1) {
        var item = cart[itemIndex];
        checkout.addItem(item, quantity);
      }
    },
    
    
    removeItem: function removeItem(item) {
      var _that = this;
      var _confirm = confirm('Remove item from your shopping cart?');

      if (_confirm) {
        checkout.removeItem(item);
      }
    },
    
    
    onComplete: function endCart() {
      this.props.onEnd();
      return false;
    },


    render: function() : React.PropTypes.element {
      
      var componentScope = this;      
      var orders = this.cursors.cart.get();

      var totalCart = _.sum(orders, function (order) {
        return order.qty * order.price;
      });
    
      return (
      <form id="checkout-order-form" className="pure-form shopping-form" onSubmit={this.onComplete}>
        <h2>Order Overview</h2>
        <div className="spacer-20"></div>
        <ul id="shopping-cart">
          <li className="header"><span className="item">Dish</span><span className="price">Price</span><span className="quantity">Quantity</span></li>
          {_.map(orders, function (item) {
            return (<CheckoutItem item={item} onUpdateQuantity={componentScope.updateItemQuantity} onRemoveItem={componentScope.removeItem} />);
          })}
        </ul>
        <div className="spacer-20"></div>
        <div className="text-center">
          <span ref='totalCart' id="totalCart">{totalCart} &euro;</span>
        </div>
        <div className="spacer-20"></div>
        <div className="text-center"><button type="submit" className="pure-button pure-success"><span>Proceed to checkout</span></button></div>
      </form>);
    }

  });

};
