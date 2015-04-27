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
        <div className="page">
          <div className="spacer-100"></div>
          <div className="container">
            <div className="spacer-40"></div>
            <div className="text-center">
              <h1>Il tuo carrello</h1>
            </div>
            <div className="spacer-10"></div>
            <hr/>
            <form id="checkout-order-form" className="pure-form shopping-form">
              <h2>Riepilogo ordine</h2>
              <div className="spacer-20"></div>
              <ul id="shopping-cart">
                <li className="header"><span className="item">Pietanza</span><span className="price">Prezzo</span><span className="quantity">Quantità</span></li>
                {_.map(orders, function (item) {
                  return (
                    <li>
                      <span className="item">{item.name}</span>
                      <span className="price">&times;<span className="price-num">7,50</span>&euro;</span>
                      <span className="quantity">
                        <input type="number" value="1" min="1" max="99"/>
                        <span className="qty-plus"><i className="fa fa-plus"></i></span>
                        <span className="qty-minus"><i className="fa fa-minus"></i></span>
                        <span className="qty-remove"><i className="fa fa-times"></i></span>
                      </span>
                    </li>);
                })}
              </ul>
              <div className="spacer-20"></div>
              <div className="text-center"><span id="totalCart">0 &euro;</span></div>
              <div className="spacer-20"></div>
              <div className="text-center"><button type="submit" className="pure-button pure-success"><span>spedizione</span></button></div>
            </form>
            <div className="spacer-100"></div>
            <div className="spacer-100"></div>
            <form id="checkout-address-form" className="pure-form shopping-form disabled">
              <h2>Indirizzo di spedizione</h2>
              <div className="spacer-20"></div>
              <div className="text-center"><button type="submit" className="pure-button pure-success"><span>Pagamento</span></button></div>
            </form>
            <div className="spacer-100"></div>
            <div className="spacer-100"></div>
            <form id="checkout-payment-form" className="pure-form shopping-form disabled">
              <h2>Metodo di pagamento</h2>
              <div className="spacer-20"></div>
              <div className="text-center"><button type="submit" className="pure-button pure-success"><span>Conferma ordine</span></button></div>
            </form>
            <div className="spacer-100"></div>
          </div>
        </div>);
    }

  });

};
