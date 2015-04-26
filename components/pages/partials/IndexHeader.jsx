/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = function (data) {

  return React.createClass({
    displayName: 'IndexHeader',

    propTypes: {},



    getInitialState: function getInitialState() : Object {
      return {};
    },


    componentDidMount: function() : void {

    },


    render: function() : React.PropTypes.element {

      return (
        <div className="page header-image">
          <div className="text-center">
            <div className="spacer-150"></div>
            <div className="spacer-80"></div>
            <img src='./assets/img/ontheroot-white.png' style={{ width: "300px" }}/>
            <h3>Order your favourite food, the 1st delivery is on us!</h3>
            <div className="spacer-150"></div>
            <div className="spacer-20"></div>
          </div>
        </div>
      );
    }

  });

};
