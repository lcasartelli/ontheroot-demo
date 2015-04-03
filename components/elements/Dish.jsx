
/* @flow */
/*jshint browser:true, devel:true */


'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

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


  render: function() : React.PropTypes.element {
    var params = {restaurantSlug: this.props.restaurant.slug, dishSlug: this.props.dish.slug};
    return (
      <div className='dishItem'>
        <h3>{ this.props.dish.name }</h3>
        <Link className='pure-button' to="dish" params={params}>Vai al piatto</Link>
      </div>
    );
  }

});
