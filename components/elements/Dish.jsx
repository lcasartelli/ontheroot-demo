
/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;


module.exports = function (treeData) {

  var checkout = require('../../lib/checkout')(treeData);

  return React.createClass({
    displayName: 'DishItem',

    propTypes: {
      restaurant: React.PropTypes.object.isRequired,
      dish: React.PropTypes.object.isRequired
    },


    getInitialState: function getInitialState() : Object {
      return {};
    },


    componentDidMount: function() : void {

    },


    addToCart: function addToCart() {
      checkout.addItem(this.props.dish, 1);
    },


    render: function() : React.PropTypes.element {
      var params = {restaurantSlug: this.props.restaurant.slug, dishSlug: this.props.dish.slug};

      return (
       <div className="restaurant-grid food-modal-grid">
          <div style={{ backgroundImage: "url('./assets/img/dish/" + this.props.dish.image + "')"}} className="restaurant-image"></div>
          <h4>{ this.props.dish.name }</h4>
          <p>{ this.props.dish.description }</p>
          <p><strong>€ {this.props.dish.price}</strong></p>
        </div>);
    }

  });
};
