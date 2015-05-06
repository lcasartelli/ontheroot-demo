
/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = function (treeData) {

  var checkout = require('../../lib/checkout')(treeData);
  var CheckoutItem = require('./CheckoutItem.jsx')(treeData);


  return React.createClass({
    displayName: 'ShippingBox',



    mixins: [treeData.mixin],

    cursors: {
      cart: ['profile']
    },

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
        <form id="checkout-address-form" className="pure-form shopping-form disabled" onSubmit={this.onComplete}>
          <h2>Shipping</h2>
          <p>Select a shipping address</p>
          <div className="spacer-20"></div>
          <div className="text-center"><button type="submit" className="pure-button pure-success"><span>Ship to this address</span></button></div>
        </form>);
    }

  });

};
