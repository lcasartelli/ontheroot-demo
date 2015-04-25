/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');

var RESTAURANTS = require('../../config/restaurants.json');



module.exports = function (treeData) {

  var IndexHeader = require('./partials/IndexHeader.jsx')(treeData);
  var Category = require('../elements/Category.jsx')(treeData);


  return React.createClass({
    displayName: 'Index',

    mixins: [treeData.minxin],

    propTypes: {},


    componentDidMount: function(item) : void {

    },


    render: function() : React.PropTypes.element {
      var componentScope = this;

      return (
      <div>
        <IndexHeader />
        <div className="page">
           <div className="container">
              <div className="spacer-40"></div>
              <div className="text-center">
                 <h1>Nori grape silver beet </h1>
                 <p>Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip. Sea lettuce lettuce water chestnut.</p>
              </div>
              <div className="spacer-10"></div>
              <hr />
              <div className="spacer-20"></div>
              <div className="pure-g">
                <div className="pure-u-1 pure-u-md-1-3">
                  <Category className={"glutenfree"} title={"Gluten Free"} restaurant={6} />
                </div>
                <div className="pure-u-1 pure-u-md-1-3">
                  <Category className={"vegan"} comingsoon={true} title={"Vegano"} />
                </div>
                <div className="pure-u-1 pure-u-md-1-3">
                  <Category className={"vegetarian"} comingsoon={true} title={"Vegetariano"} />
                </div>
              </div>
              <div className="spacer-100"></div>
           </div>
        </div>
      </div>
      );
    }

  });

};
