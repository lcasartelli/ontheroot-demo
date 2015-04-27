/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

module.exports = function (treeData) {

  var checkout = require('../../lib/checkout')(treeData);
  
  var CheckoutItem = require('../elements/CheckoutItem.jsx')(treeData);

  return React.createClass({
    displayName: 'Checkout',

    mixins: [treeData.mixin, React.addons.LinkedStateMixin],
    cursors: {
      user: ['user'],
      cart: ['cart'],
    },


  /*



    //  -- step 3 --
    document.getElementById('checkout-payment-form').addEventListener('submit', function (evt) {
      evt.preventDefault();
      alert('Ordine inviato! Grazie!');
      return false;
    });

    */



    getInitialState: function getInitialState() : Object {
      return {
        cartTotal: 0,
      };
    },


    componentDidMount: function() : void {

      // -- check scrolling bar position --
      window.addEventListener('scroll', function () {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var paymentPxFromTop = document.getElementById('checkout-payment-form').offsetTop;
        var _totalCartEl = document.getElementById('totalCart');

        console.log(top, paymentPxFromTop);

        if (top <=  300) {
          _totalCartEl.classList.remove('fixed');
        } else {
          _totalCartEl.classList.add('fixed');
        }
      });

    },


    componentWillMount: function() : void {
     
    },


    addUnit: function addUnit() {
      var _that = this;
      var _input = React.findDOMNode(_that).parentNode.querySelector('input');
      var _currentNumber = parseInt(_input.value, 10);

      _input.value = (_currentNumber + 1);

      //  add +1 to item in order
      this.totalSum();
    },


    removeUnit: function removeUnit() {
      var _that = this;
      var _input = React.findDOMNode(_that).parentNode.querySelector('input');
      var _currentNumber = parseInt(_input.value, 10);

      if (_currentNumber <= 1) {
        return;
      }
      _input.value = (_currentNumber - 1);

      //  subtract -1 to item in order
      this.totalSum();
    },


    removeItem: function removeItem(item) {
      var _that = this;
      var _confirm = confirm('Remove item from your shopping cart?');

      if (_confirm) {
        checkout.removeItem(item);
      }
    },


    totalSum: function totalSum() {
      var _that = this;


    },


    updateItemQuantity: function updateItemQuantity(item, quantity) {
      var cart = this.cursors.cart.get();
      var itemIndex = _.findIndex(cart, function (o) { return item.slug === o.slug; });
      if (itemIndex > -1) {
        var item = cart[itemIndex];
        checkout.addItem(item, quantity);
      }

    },


    emptyCart: function emptyCart() : void {
      checkout.emptyCart();
    },


    checkoutStep1: function checkoutStep1() {
      var _that = this;

      if (React.findDOMNode(_that).querySelector('#checkout-order-form').classList.contains('disabled')) {
        return;
      }

      this.totalSum();

      React.findDOMNode(_that).querySelector('#checkout-order-form').classList.add('disabled');
      React.findDOMNode(_that).querySelector('#checkout-address-form').classList.remove('disabled');

      return false;
    },


    checkoutStep2: function checkoutStep2() {
      var _that = this;

      if (React.findDOMNode(_that).querySelector('#checkout-address-form').classList.contains('disabled')) {
        return;
      }

      React.findDOMNode(_that).querySelector('#checkout-address-form').classList.add('disabled');
      React.findDOMNode(_that).querySelector('#checkout-payment-form').classList.remove('disabled');

      return false;
    },


    checkoutStep3: function checkoutStep3() {
      var _that = this;

      if (React.findDOMNode(_that).querySelector('#checkout-payment-form').classList.contains('disabled')) {
        return;
      }

      //  -- check if payment went well --
      React.findDOMNode(_that).querySelector('#checkout-payment-form').classList.add('disabled');
      alert('Ordine inviato! Grazie!');
      return false;
    },


    render: function() : React.PropTypes.element {

      var _that = this;
      var orders = _that.cursors.cart.get();


      var orderTotal = _.sum(orders, function (order) {
        return order.qty * order.price;
      });

      var itemsTmpl;

      if (orders.length > 0) {

        itemsTmpl = (
          <div>
            <form id="checkout-order-form" className="pure-form shopping-form" onSubmit={this.checkoutStep1}>
              <h2>Riepilogo ordine</h2>
              <div className="spacer-20"></div>
              <ul id="shopping-cart">
                <li className="header"><span className="item">Pietanza</span><span className="price">Prezzo</span><span className="quantity">Quantità</span></li>
                {_.map(orders, function (item) {
                  return (<CheckoutItem item={item} onUpdateQuantity={_that.updateItemQuantity} onRemoveItem={_that.removeItem} />);
                })}
              </ul>
              <div className="spacer-20"></div>
              <div className="text-center">
                <span id="totalCart">{orderTotal} &euro;</span>
              </div>
              <div className="spacer-20"></div>
              <div className="text-center"><button type="submit" className="pure-button pure-success"><span>spedizione</span></button></div>
            </form>
            <div className="spacer-100"></div>
            <div className="spacer-100"></div>
            <form id="checkout-address-form" className="pure-form shopping-form disabled" onSubmit={this.checkoutStep2}>
              <h2>Indirizzo di spedizione</h2>
              <div className="spacer-20"></div>
              <div className="text-center"><button type="submit" className="pure-button pure-success"><span>Pagamento</span></button></div>
            </form>
            <div className="spacer-100"></div>
            <div className="spacer-100"></div>
            <form id="checkout-payment-form" className="pure-form shopping-form disabled" onSubmit={this.checkoutStep3}>
              <h2>Metodo di pagamento</h2>
              <div className="spacer-20"></div>
              <div className="text-center"><button type="submit" className="pure-button pure-success"><span>Conferma ordine</span></button></div>
            </form>
          </div>
        );

      } else {

        itemsTmpl = (
            <div className="text-center">
              <div className="spacer-20">
                Your cart is empty... Start shopping by choosing a genre on <Link to='home'>homepage</Link>.
              </div>
              <div class="spacer-20"></div>
            </div>
        );

      }

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


            {itemsTmpl}
            



            <div className="spacer-100"></div>
          </div>
        </div>);
    }

  });

};
