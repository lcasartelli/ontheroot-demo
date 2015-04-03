
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
    user: React.PropTypes.object.isRequired,
    restaurant: React.PropTypes.object.isRequired,
  },


  getInitialState: function getInitialState() : Object {
    return {
      name: '',
      description: '',
    };
  },


  componentDidMount: function() : void {

  },
  
  goToRestaurant: function () : void {
    // go to restaurant dishes list
  },


  render: function() : React.PropTypes.element {
    
    console.log('restaurant', this.props.restaurant);
    var params = {restaurantSlug: this.props.restaurant.slug};
    return (
      <div>
        <h2>{ this.props.restaurant.title }</h2>
         <Link className='pure-button' to="restaurant" params={params}>Vai al ristorante</Link>
      </div>
    );
  }

});
