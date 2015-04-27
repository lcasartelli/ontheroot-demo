
/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

module.exports = function (treeData) {

  return React.createClass({
    displayName: 'CartHandler',

    mixins: [treeData.mixin],
    
    cursors: {
      user: ['user'],
      cart: ['cart'],
    },

    contextTypes: {
      router: React.PropTypes.func.isRequired
    },


    getInitialState: function getInitialState() : Object {
      return {};
    },


    componentDidMount: function() : void {},
    
    
    openCartDropdown: function openCartDropdown(tof) {
      var that = this;

      return function () {
        if (tof) {
          React.findDOMNode(that.refs.cartDropdown).classList.add('show');
          React.findDOMNode(that).classList.add('active');
        } else {
          React.findDOMNode(that).classList.remove('active');
          React.findDOMNode(that.refs.cartDropdown).classList.remove('show');
        }
        
      }
    },


    openCheckout: function openCheckout() {
      this.context.router.transitionTo('checkout');
    },


    render: function() : React.PropTypes.element {
      
      var cartItems = this.cursors.cart.get();

      var cartCounter = <span></span>;
      if (cartItems.length > 0) {
        cartCounter = <strong className="badge">{cartItems.length}</strong>;
      }
      
      return (
        <a className="header-button cart-button" onMouseEnter={this.openCartDropdown(true)} onMouseLeave={this.openCartDropdown(false)}>
          <i className="fa fa-shopping-cart">
            {cartCounter}
          </i>
          <span>Cart</span>

          <div id="cart-dropdown" ref='cartDropdown'>
            {_.map(cartItems, function (item) {
              // i don't believe in this shit
              item.price = item.price.replace(',', '.');
              var price = Number.parseInt(item.qty, 10) * Number.parseFloat(item.price, 10);

              return (
                <div className="cart-item">
                  <strong>{item.name}</strong>
                  <span>{item.qty}&nbsp;portions:&nbsp;{price}&nbsp;€</span>
                  <button className="pure-button pure-danger"><span>Remove</span></button>
                </div>)})
            }
            <div className="cart-item">
              <button onClick={this.openCheckout} id="show-cart" className="pure-button">
                <span>Go to cart</span>
              </button>
            </div>
          </div>            
        </a>
      );
    }

  });

};
