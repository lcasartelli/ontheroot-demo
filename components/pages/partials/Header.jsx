/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = React.createClass({
  displayName: 'Header',

  propTypes: {},


  getInitialState: function getInitialState() : Object {
    return {};
  },


  componentDidMount: function() : void {

  },


  render: function() : React.PropTypes.element {
    
    return (
      <nav className='header'>
        <div className='logo'>
          <img src='./assets/img/logo.png' />
        </div>
      </nav>
    );
  }

});
