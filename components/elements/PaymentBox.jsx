

/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = function (treeData) {

  var checkout = require('../../lib/checkout')(treeData);
  var CheckoutItem = require('./CheckoutItem.jsx')(treeData);


  return React.createClass({
    displayName: 'PaymentBox',

    mixins: [treeData.mixin],

    propTypes: {
      onEnd: React.PropTypes.func.isRequired
    },

    getInitialState: function getInitialState() : Object {
      return {
      };
    },


    componentDidMount: function() : void {

    },


    onComplete: function endCart() {
      this.props.onEnd();
      return false;
    },


    render: function() : React.PropTypes.element {

      var componentScope = this;

      return (
      <form id="checkout-payment-form" className="pure-form shopping-form disabled" onSubmit={this.checkoutStep3}>
        <h2>Payments methods</h2>
        <div className="spacer-20"></div>
        <div className="text-center"><button type="submit" className="pure-button pure-success"><span>Confirm order</span></button></div>
      </form>);
    }

  });

};
