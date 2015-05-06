
/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = function (data) {

  return React.createClass({
    displayName: 'IndexHeader',

    propTypes: {
      restaurant: React.PropTypes.object.isRequired
    },


    getInitialState: function getInitialState() : Object {
      return {};
    },


    componentDidMount: function() : void {

    },


    render: function() : React.PropTypes.element {

      var headerImage = this.props.restaurant.image;

      return (
        <div className="page header-image glutenfree" style={{ backgroundImage : "url('./assets/img/headers/" + headerImage + "')" }}>
          <div className="text-center">
            <div className="spacer-150"></div>
            <h1>{this.props.restaurant.title}</h1>
            <h3>{this.props.restaurant.description}</h3>
            <div className="spacer-100"></div>
          </div>
        </div>
      );
    }

  });

};
