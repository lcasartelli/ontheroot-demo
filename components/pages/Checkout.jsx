/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');

module.exports = function (treeData) {

  var checkout = require('../../lib/checkout')(treeData);
  
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
      return {};
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

      return function () {
        var _confirm = confirm('Remove item from your shopping cart?');

        if (_confirm) {
          _that.cursors.cart.edit(_.without(_that.cursors.cart.get(), item));
        }
      }

      //  recalculate total
      this.totalSum();

    },


    totalSum: function totalSum() {
      var _that = this;


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
            <form id="checkout-order-form" className="pure-form shopping-form" onSubmit={this.checkoutStep1}>
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
                        <input type="number" value={item.quantity} min="1" max="99" step="1" />
                        <span className="qty-plus"><i className="fa fa-plus" onClick={_that.addUnit}></i></span>
                        <span className="qty-minus"><i className="fa fa-minus" onClick={_that.removeUnit}></i></span>
                        <span className="qty-remove"><i className="fa fa-times" onClick={_that.removeItem(item)}></i></span>
                      </span>
                    </li>);
                })}
              </ul>
              <div className="spacer-20"></div>
              <div className="text-center">
                <span id="totalCart">0 &euro;</span>
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
            <div className="spacer-100"></div>
          </div>
        </div>);
    }

  });

};
