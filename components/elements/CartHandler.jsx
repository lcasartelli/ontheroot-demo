
/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = function (treeData) {

  return React.createClass({
    displayName: 'CartHandler',

    mixins: [treeData.mixin],
    cursors: {
      user: ['user'],
      cart: ['cart'],
    },


    getInitialState: function getInitialState() : Object {
      return {};
    },


    componentDidMount: function() : void {},
    
    
    openCartDropdown: function openCartDropdown() {
      React.findDOMNode(this).querySelector('#cart-dropdown').classList.toggle('show');
      React.findDOMNode(this).classList.toggle('active');
    },


    render: function() : React.PropTypes.element {
      
      var cartItems = this.cursors.cart.get();

      var cartCounter = <span></span>;
      if (cartItems.length > 0) {
        cartCounter = <strong className="badge">{cartItems.length}</strong>;
      }
      
      return (
        <a className="header-button cart-button" onClick={this.openCartDropdown}>
          <i className="fa fa-shopping-cart">
            {cartCounter}
          </i>
          <span>Carrello</span>

          <div id="cart-dropdown">
            {_.map(cartItems, function (item) {
              // i don't believe in this shit
              item.price = item.price.replace(',', '.');
              var price = Number.parseInt(item.qty, 10) * Number.parseFloat(item.price, 10);

              return (
                <div className="cart-item">
                  <strong>{item.name}</strong>
                  <span>{item.qty}&nbsp;porzioni:&nbsp;{price}&nbsp;€</span>
                  <button className="pure-button pure-danger"><span>Remove</span></button>
                </div>)})
            }
            <div className="cart-item">
              <button id="show-cart" className="pure-button">
                <span>Go to cart</span>
              </button>
            </div>
          </div>            
        </a>
      );
    }

  });

};
