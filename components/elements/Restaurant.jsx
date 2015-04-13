
/* @flow */
/*jshint browser:true, devel:true */


'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

module.exports = React.createClass({
  displayName: 'RestaurantItem',

  propTypes: {
    restaurant: React.PropTypes.object.isRequired,
  },


  getInitialState: function getInitialState() : Object {
    return {};
  },


  componentDidMount: function() : void {

  },


  render: function() : React.PropTypes.element {
    var params = {restaurantSlug: this.props.restaurant.slug};
    return (
      <div>
        <h2>{ this.props.restaurant.title }</h2>
         <Link className='pure-button' to="restaurant" params={params}>Vai al ristorante</Link>
      </div>
    );
  }

});
