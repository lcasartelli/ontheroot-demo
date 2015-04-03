
/* @flow */
/*jshint browser:true, devel:true */


'use strict';

var React = require('react/addons');
var _ = require('lodash');

var RESTAURANTS = require('../../config/restaurants.json');


module.exports = React.createClass({
  displayName: 'Restaurant',

  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },


  getInitialState: function getInitialState() : Object {
    return {
      name: '',
      description: '',
    };
  },


  componentDidMount: function() : void {
  },


  componentWillMount: function() : void {
    var restaurantSlug = this.context.router.getCurrentParams().restaurantSlug;
    this.setState({ restaurant: _.find(RESTAURANTS[1].restaurants, function (restaurant) { return restaurantSlug === restaurant.slug; }) });
  },


  render: function() : React.PropTypes.element {

    return (
      <section className="content">
        <h2>{ this.state.restaurant.title }</h2>
      </section>
    );
  }

});
