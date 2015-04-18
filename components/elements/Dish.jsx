
/* @flow */
/*jshint browser:true, devel:true */


'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

var checkout = require('../../lib/checkout')();


module.exports = React.createClass({
  displayName: 'DishItem',

  propTypes: {
    restaurant: React.PropTypes.object.isRequired,
    dish: React.PropTypes.object.isRequired,
  },


  getInitialState: function getInitialState() : Object {
    return {};
  },


  componentDidMount: function() : void {

  },


  addToCart: function addToCart() {
    checkout.addItem({ slug: 'hello' }, 1);
  },


  render: function() : React.PropTypes.element {
    var params = {restaurantSlug: this.props.restaurant.slug, dishSlug: this.props.dish.slug};
    return (
      <div className='dishItem'>
        <h3>{ this.props.dish.name }</h3>
        <button className='pure-button' onClick={this.addToCart}>Aggiungi al carrello</button>
        <Link className='pure-button' to="dish" params={params}>Vai al piatto</Link>
      </div>
    );
  }

});
