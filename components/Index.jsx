/* @flow */
/*jshint browser:true, devel:true */


'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = React.createClass({
  displayName: 'Index',

  propTypes: {
    user: React.PropTypes.object.isRequired,
    siteId: React.PropTypes.string.isRequired
  },


  getInitialState: function getInitialState() : Object {
    return {};
  },

  componentDidMount: function() : void {

  },


  render: function() : React.PropTypes.element {
    

    return (
      <section id="app">
        <header></header>

        <section id="app">
          <section id="content">
            <p>Index</p>
          </section>
        </section>

        <footer></footer>
      </section>
    );
  }

});
