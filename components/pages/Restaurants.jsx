/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Restaurant = require('../elements/Restaurant.jsx');

var RESTAURANTS = require('../../config/restaurants.json');



module.exports = function (treeData) {

  var RestaurantsHeader = require('./partials/RestaurantsHeader.jsx')(treeData);
  var Restaurant = require('../elements/Restaurant.jsx');
  var Category = require('../elements/Category.jsx')(treeData);


  return React.createClass({
    displayName: 'Restaurants',

    mixins: [treeData.minxin],

    propTypes: {},


    componentDidMount: function(item) : void {

    },


    render: function() : React.PropTypes.element {
      var componentScope = this;
      
      var restaurants = RESTAURANTS["1"].restaurants;

      restaurants = _.chain(restaurants).sortBy(function (restaurant) {
        return restaurant.open;
      }).reverse().value();

      return (
        <div>
          <RestaurantsHeader />
          <div className="page">
            <div className="container">
              <div className="spacer-40"></div>
              <div className="text-center">
                <h1>Feel free, go gluten free</h1>
                <p>You can find all the restaurants with gluten free options.</p>
                <div className="spacer-20"></div>
                <form className="pure-form">
                  <input id="restaurants-filter" type="text" name="filter" placeholder="Find what you want... " />
                </form>
              </div>
              <div className="spacer-10"></div>
              <hr />
              <div className="spacer-20"></div>
              <div className="pure-g">
                {_.map(restaurants, function (restaurant) {
                  return (
                  <div className="pure-u-1 pure-u-md-1-4" key={restaurant.slug}>
                    <Restaurant restaurant={restaurant} />
                  </div>);
                })}
              </div>
              <div className="spacer-100"></div>
            </div>
          </div>
        </div>
      );
    }

  });

};


/*
  SEARCH
  <form className="pure-form">
    <input id="restaurants-filter" type="text" name="filter" placeholder="Find restaurant " />
  </form>
*/
