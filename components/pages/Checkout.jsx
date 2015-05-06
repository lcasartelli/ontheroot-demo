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
  var CartBox = require('../elements/CartBox.jsx')(treeData);
  var ShippingBox = require('../elements/ShippingBox.jsx')(treeData);
  var PaymentBox = require('../elements/PaymentBox.jsx')(treeData);



  return React.createClass({
    displayName: 'Checkout',

    mixins: [treeData.mixin, React.addons.LinkedStateMixin],

    cursors: {
      user: ['user'],
      cart: ['cart']
    },


    getInitialState: function getInitialState() : Object {
      return {
        cartTotal: 0,
      };
    },


    componentDidMount: function() : void {

      window.addEventListener('scroll', function () {
        var topPosition = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        /*var _totalCartEl = React.findDOMNode(this.refs.cartBox.refs.totalCart);

        if (topPosition <=  300) {
          _totalCartEl.classList.remove('fixed');
        } else {
          _totalCartEl.classList.add('fixed');
          }*/
      });

    },


    componentWillMount: function() : void {

    },


    emptyCart: function emptyCart() : void {
      checkout.emptyCart();
    },


    cartStep: function checkoutStep1() {
      var _that = this;

      if (React.findDOMNode(_that).querySelector('#checkout-order-form').classList.contains('disabled')) {
        return;
      }

      React.findDOMNode(_that).querySelector('#checkout-order-form').classList.add('disabled');
      React.findDOMNode(_that).querySelector('#checkout-address-form').classList.remove('disabled');

      return false;
    },


    shipEnd: function checkoutStep2() {
      var _that = this;

      React.findDOMNode(_that).querySelector('#checkout-address-form').classList.add('disabled');
      React.findDOMNode(_that).querySelector('#checkout-payment-form').classList.remove('disabled');

      return false;
    },


    payEnd: function checkoutStep3() {
      var _that = this;

      React.findDOMNode(_that).querySelector('#checkout-payment-form').classList.add('disabled');
      return false;
    },


    render: function() : React.PropTypes.element {

      var _that = this;
      var orders = this.cursors.cart.get();


      var totalCart = _.sum(orders, function (order) {
        return order.qty * order.price;
      });

      var itemsTmpl;

      if (orders.length > 0) {

        itemsTmpl = (
          <div>
            <CartBox ref='cartBox' onEnd={this.cartStep} />
            <div className="spacer-100"></div><div className="spacer-100"></div>
            <ShippingBox ref='shipBox' onEnd={this.shipEnd} />
            <div className="spacer-100"></div><div className="spacer-100"></div>
            <PaymentBox ref='shipBox' onEnd={this.payEnd} />
          </div>
        );

      } else {

        itemsTmpl = (
            <div className="text-center">
              <div className="spacer-20">
                Your cart is empty... Start shopping by choosing a genre on <Link to='home'>homepage</Link>.
              </div>
              <div className="spacer-20"></div>
            </div>
        );

      }

      return (
        <div className="page">
          <div className="spacer-100"></div>
          <div className="container">
            <div className="spacer-40"></div>
            <div className="text-center">
              <h1>Your Cart</h1>
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
