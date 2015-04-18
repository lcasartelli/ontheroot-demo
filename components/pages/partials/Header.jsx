/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;


module.exports = function (treeData) {

  return React.createClass({
    displayName: 'Header',

    mixins: [treeData.mixin],
    cursor: ['user'],


    getInitialState: function getInitialState() : Object {
      return {};
    },

    componentDidMount: function() : void {

    },


    render: function() : React.PropTypes.element {
    
      var user = this.cursor.get();
      var userComponent;

      if (user.authed) {
        userComponent = <p>Utente loggato</p>;
      } else  {
        userComponent = <p>Utente non loggato</p>;
      }

      return (
        <nav className='header'>
          <div className='logo'>
            <Link to="home">
              <img src='./assets/img/logo.png' />
            </Link>
            { userComponent }
            <Link to='checkout'><button className='pure-button'>Carrello</button></Link>
          </div>
        </nav>
      );
    }

  });

};