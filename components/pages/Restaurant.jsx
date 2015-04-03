/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Dish = require('../elements/Dish.jsx');

var RESTAURANTS = require('../../config/restaurants.json');


module.exports = React.createClass({
  displayName: 'Restaurant',

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
    var restaurantSlug = this.context.router.getCurrentParams().restaurantSlug;
    this.setState({ restaurant: _.find(RESTAURANTS[1].restaurants, function (restaurant) { return restaurantSlug === restaurant.slug; }) });
  },


  render: function() : React.PropTypes.element {
    var componentScope = this;
    return (
      <section className="content">
        <h2>{ this.state.restaurant.title }</h2>
        <div>
          { _.map(this.state.restaurant.menu, function (dish) {
            console.log(name, dish);
            return (
              <div className='pure-u-1-3'>
                <Dish dish={dish} restaurant={componentScope.state.restaurant} />
              </div>
              );
            }) }
        </div>

      </section>
    );
  }

});
