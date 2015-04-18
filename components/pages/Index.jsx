/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Restaurant = require('../elements/Restaurant.jsx');

var RESTAURANTS = require('../../config/restaurants.json');



module.exports = function (treeData) {

  return React.createClass({
    displayName: 'Index',

    mixins: [treeData.minxin],

    propTypes: {},


    componentDidMount: function(item) : void {

    },


    render: function() : React.PropTypes.element {
      var componentScope = this;

      return (
        <section className="content">
          <div className='pure-g'>
            { _.map(RESTAURANTS["1"].restaurants, function (restaurant) {
              return (
                <div className='pure-u-1-3' key={restaurant.slug}>
                  <Restaurant user={componentScope.user} restaurant={restaurant} />
                </div>
                );
              }) }
          </div>
        </section>
      );
    }

  });

};
