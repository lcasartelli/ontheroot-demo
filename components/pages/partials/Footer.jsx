/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = function (data) {

  return React.createClass({
    displayName: 'Footer',

    propTypes: {},



    getInitialState: function getInitialState() : Object {
      return {};
    },


    componentDidMount: function() : void {

    },


    render: function() : React.PropTypes.element {

      return (
        <footer>
          <p>Made with ♥ in Italy</p>
        </footer>
      );
    }

  });

};
