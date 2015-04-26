
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
    //<h2>{ this.props.restaurant.title }</h2>

    var className = [ 'restaurant-image' ];
    if (true) {
      className.push('nowopen');
    }

    var backgroundImg = 'outofgluten.jpg';

    return (
      <Link to="restaurant" params={params} className="restaurant-item">
        <div data-filter="indian,japanese" className="restaurant-grid">
          <div className={className.join(' ')} style={{"background-image": "url('./assets/img/" + backgroundImg + "')"}}></div>
          <h4>{ this.props.restaurant.title }</h4>
        </div>
      </Link>
    );
  }

});
