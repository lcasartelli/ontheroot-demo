
/* @flow */
/*jshint browser:true, devel:true */


'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = React.createClass({
  displayName: 'Restaurant',

  propTypes: {
    user: React.PropTypes.object.isRequired,
    restaurant: React.PropTypes.object.isRequired,
  },


  getInitialState: function getInitialState() : Object {
    return {
      name: '',
      description: '',
    };
  },


  componentDidMount: function() : void {

  },
  
  goToRestaurant: function () : void {

  },


  render: function() : React.PropTypes.element {
    
    console.log('restaurant', this.props.restaurant);

    return (
      <div>
        <h2>{ this.props.restaurant.title }</h2>
        <button onClick={this.gotToRestaurant}>Vai al ristorante</button>
      </div>
    );
  }

});
