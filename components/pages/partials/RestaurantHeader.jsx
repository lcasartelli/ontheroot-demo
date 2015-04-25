
/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = function (data) {

  return React.createClass({
    displayName: 'IndexHeader',
    
    propTypes: {
      restaurant: React.PropTypes.object.isRequired,
    },


    getInitialState: function getInitialState() : Object {
      return {};
    },


    componentDidMount: function() : void {

    },


    render: function() : React.PropTypes.element {
    
      var headerImage = 'outofgluten-header.jpg';

      return (
        <div className="page header-image glutenfree" style={{"background-image": "url('./assets/img/headers/" + headerImage + "');"}}>
          <div className="text-center">
            <div className="spacer-150"></div>
            <h1>{this.props.restaurant.title}</h1>
            <h3>Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion.</h3>
            <div className="spacer-100"></div>
          </div>
        </div>
      );
    }

  });

};