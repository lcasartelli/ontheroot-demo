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
            <h1>Alternative food</h1>
            <h3>Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion.</h3>
            <div className="spacer-150"></div>
            <div className="spacer-20"></div>
          </div>
        </div>
      );
    }

  });

};
