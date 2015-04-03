/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');

var RESTAURANTS = require('../../config/restaurants.json');


module.exports = React.createClass({
  displayName: 'Dish',

  propTypes: {},

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },


  getInitialState: function getInitialState() : Object {
    return {
      restaurant: null,
      dish: null,
    };
  },


  componentDidMount: function() : void {
  },


  componentWillMount: function() : void {
    var restaurantSlug = this.context.router.getCurrentParams().restaurantSlug;
    var dishSlug = this.context.router.getCurrentParams().dishSlug;
    
    var restaurant = _.find(RESTAURANTS[1].restaurants, function (restaurant) { return restaurantSlug === restaurant.slug; });
    var dish = _.find(restaurant.menu, function (dish) { return dishSlug === dish.slug; })
    
    this.setState({ 
      restaurant: restaurant,
      dish: dish,
    });
  },


  render: function() : React.PropTypes.element {
    var componentScope = this;
    return (
      <section className="content">
        <h2>{ this.state.dish.name }</h2>
      </section>
    );
  }

});
