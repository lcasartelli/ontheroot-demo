



/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


var RESTAURANTS = require('../../config/restaurants.json');


module.exports = function (treeData) {
  
  return React.createClass({
    displayName: 'Checkout',

    propTypes: {},

    contextTypes: {
      router: React.PropTypes.func.isRequired
    },


    getInitialState: function getInitialState() : Object {
      return {
        restaurant: null,
      };
    },


    componentDidMount: function() : void {
    },


    componentWillMount: function() : void {
     
    },


    render: function() : React.PropTypes.element {
      return  (
        <form action="" method="POST">
          <script
            src="https://checkout.stripe.com/checkout.js" 
            className="stripe-button"
            data-key="pk_test_J5PfexKfZmdZFhhfFkAA66DG"
            data-amount="2000"
            data-name="Demo Site"
            data-description="2 widgets ($20.00)"
            >
          </script>
        </form>);
    }

  });

};
