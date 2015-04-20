/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

var cognitoAuth = require('../../../lib/cognito')();


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


    logout: function logout() {
      console.log('logout...');
      cognitoAuth.authUserLogout();
      this.cursor.set('authed', false);
      this.cursor.set('accessToken', null);
    },


    render: function() : React.PropTypes.element {
    
      var user = this.cursor.get();
      var userComponent;


      if (user.authed) {
        userComponent = <div><button className='pure-button' onClick={this.logout}>Logout</button></div>;
      } else  {
        userComponent = <div><Link to='login'><button className='pure-button'>Login</button></Link></div>;
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