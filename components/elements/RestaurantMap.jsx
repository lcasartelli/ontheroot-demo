
/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

var map = require('../../lib/map');

module.exports = function (treeData) {

  return React.createClass({
    displayName: 'RestaurantMap',

    propTypes: {
      restaurant: React.PropTypes.object.isRequired,
    },


    getInitialState: function getInitialState() : Object {
      return {};
    },


    componentDidMount: function() : void {
      this.initMap();
    },
    
    
    initMap: function initMap() {
      var _gmapImg = document.getElementById('map-img');
      var _addressEl = this.props.restaurant.address;
      var _uriAdd = encodeURIComponent(_addressEl);
      _gmapImg.setAttribute('src', _gmapImg.getAttribute('src') + '&center=' + _uriAdd + '&markers=color:0x87d860%7C' + _uriAdd + '&' + map.getStatic());

    },
    

    render: function() : React.PropTypes.element {
      
      var mapImageSrc = 'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyC2zI1kN7ipCVqTs3Rh_huFawuDPMRhBnA&zoom=15&size=1280x400&scale=2&language=it';

      return (
        <div className="restaurant-grid">
          <img id="map-img" src={mapImageSrc} className="pure-img" />
        </div>);
    }

  });
}; 
