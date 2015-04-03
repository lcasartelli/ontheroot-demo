/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Header = require('./partials/Header.jsx');
var Footer = require('./partials/Footer.jsx');
var Restaurant = require('../elements/Restaurant.jsx');

var RESTAURANTS = require('../../config/restaurants.json');


module.exports = React.createClass({
  displayName: 'Index',

  propTypes: {
    user: React.PropTypes.object.isRequired,
  },


  getInitialState: function getInitialState() : Object {
    return {};
  },


  componentDidMount: function() : void {

  },


  render: function() : React.PropTypes.element {
    var componentScope = this;
    
    return (
      <section className="content">
        <div className='pure-g'>
          { _.map(RESTAURANTS["1"].restaurants, function (restaurant) {
            return (
              <div className='pure-u-1-3'>
                <Restaurant user={componentScope.user} restaurant={restaurant} />
              </div>
              );
            }) }
        </div>
      </section>
    );
  }

});
