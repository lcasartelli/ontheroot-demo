
/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = function (treeData) {

  return React.createClass({
    displayName: 'CityHandler',

    mixins: [treeData.mixin],


    getInitialState: function getInitialState() : Object {
      return {};
    },


    componentDidMount: function() : void {},


    openCityDropdown: function openCityDropdown(tof) {
      var that = this;

      return function () {
        if (tof) {
          React.findDOMNode(that).querySelector('#cities-dropdown').classList.add('show');
          React.findDOMNode(that).classList.add('active');
        } else {
          React.findDOMNode(that).classList.remove('active');
          React.findDOMNode(that).querySelector('#cities-dropdown').classList.remove('show');
        }

      }
    },

    /*
    selectCity: function selectCity(clicked) {
      React.findDOMNode(this).querySelector('#cities-current').textContent = React.findDOMNode(clicked).textContent;
    },
    */


    render: function() : React.PropTypes.element {

      var citiesItem = this.props.cities;
      var _this = this;


      return (
        <a className="header-button cart-button" onMouseEnter={this.openCityDropdown(true)} onMouseLeave={this.openCityDropdown(false)}>
          <i className="fa fa-caret-down"></i>
          <span id="cities-current">{citiesItem[0]}</span>

          <div id="cities-dropdown">
            {_.map(citiesItem, function (item, index) {
              return (
                <div className="cities-item" key={index}>{item}</div>);})
            }
          </div>
        </a>
      );
    }

  });

};
