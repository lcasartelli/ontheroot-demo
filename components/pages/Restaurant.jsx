/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


var RESTAURANTS = require('../../config/restaurants.json');
var map = require('../../lib/map');


module.exports = function (treeData) {

  var Dish = require('../elements/Dish.jsx')(treeData);
  var DishModal = require('../elements/DishModal.jsx')(treeData);
  var RestaurantHeader = require('./partials/RestaurantHeader.jsx')(treeData);
  var RestaurantMap = require('../elements/RestaurantMap.jsx')(treeData);

  
  return React.createClass({
    displayName: 'Restaurant',

    mixins: [treeData.minxin],


    propTypes: {},

    contextTypes: {
      router: React.PropTypes.func.isRequired
    },


    getInitialState: function getInitialState() : Object {
      return {
        restaurant: null,
        show: null,
      };
    },


    componentDidMount: function() : void {
      this.initMap();
    },


    componentWillMount: function() : void {
      var restaurantSlug = this.context.router.getCurrentParams().restaurantSlug;
      this.setState({ restaurant: _.find(RESTAURANTS[1].restaurants, function (restaurant) { return restaurantSlug === restaurant.slug; }) });
    },


    initMap: function initMap() {
      var _gmapLink = document.getElementById('gmap-link');
      var _gmapImg = document.getElementById('map-img');
      var _addressEl = _gmapLink.parentNode.querySelector('span.address');
      if (_addressEl) {
        var _uriAdd = encodeURIComponent(_addressEl.textContent);
        _gmapLink.setAttribute('href', 'https://maps.google.com?daddr=' + _uriAdd);
        _gmapImg.setAttribute('src', _gmapImg.getAttribute('src') + '&center=' + _uriAdd + '&markers=color:0x87d860%7C' + _uriAdd + '&' + map.getStatic());
      } else {
        _gmapLink.style.display = 'none';
      }
    },


    openDishDetail: function openDishDetail(dish) {
      var componentScope = this;
      return function showDishDetailHandler() {
        componentScope.setState({ show: dish });
      };
    },


    closeDishDetail: function closeDishDetail(scope) {
      var componentScope = scope;
      return function closeDishDetailHandler(){
        componentScope.setState({ show: null });
      }

    },


    render: function() : React.PropTypes.element {

      var componentScope = this;

      var detailComponent = <div></div>;
      if (componentScope.state.show) {
        detailComponent = <DishModal dish={componentScope.state.show} onClose={componentScope.closeDishDetail(componentScope)} />
      }

      return (
        <div>
          <RestaurantHeader restaurant={this.state.restaurant} />
          <div className="page">
            <div className="container">
              <div className="spacer-40"></div>
              <div className="pure-g">
                  { _.map(this.state.restaurant.menu, function (dish) {
                  return (
                    <div className="pure-u-1 pure-u-md-1-4" onClick={componentScope.openDishDetail(dish)}>
                      <Dish dish={dish} restaurant={componentScope.state.restaurant} />
                    </div>
                    );
                  }) }
              </div>
              <div className="spacer-40"></div>
            </div>
          </div>
          <div className="page">
            <div className="container">
              <hr />
              <div className="spacer-40"></div>
              <div className="pure-g">
                <div className="pure-u-1 pure-u-md-3-4">
                  <RestaurantMap restaurant={componentScope.state.restaurant} />
                </div>
                <div className="pure-u-1 pure-u-md-1-4">
                  <div className="restaurant-grid">
                    <h2>{componentScope.state.restaurant.title}</h2>
                    <div className="spacer-20"></div>
                    <h3>
                      <span className="address">{componentScope.state.restaurant.address}</span>
                      <br/>
                      <a id="gmap-link" href="" className="link"><small>indicazioni stradali</small></a>
                      <br/>
                      <br/>
                      <a href="mailto:info@outofgluten.it" className="link">info@outofgluten.it</a>
                    </h3>
                    <div className="spacer-20"></div>
                    <p>
                      <strong>Orario d'apertura</strong>
                      <br/>
                      Lun - Domenica / 11.30 - 23.30
                      <br/>
                      <small><strong>Aperto ora!</strong>&nbsp;Vuoi ordinare qualcosa?</small>
                    </p>
                  </div>
                </div>
              </div>
              <div class="spacer-60"></div>
            </div>
          </div>
          {detailComponent}
        </div>);
    }

  });

};