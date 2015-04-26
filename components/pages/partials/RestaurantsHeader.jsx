
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
        <div className="page header-image glutenfree">
          <div className="text-center">
            <div className="spacer-150"></div>
            <h1>Gluten Free</h1>
            <h3>The best of gluten free food. Delivered.</h3>
            <div className="spacer-100"></div>
          </div>
        </div>
      );
    }

  });

};