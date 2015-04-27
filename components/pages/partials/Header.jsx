/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

var cognitoAuth = require('../../../lib/cognito')();


module.exports = function (treeData) {

  var CartHandler = require('../../elements/CartHandler.jsx')(treeData);
  var CityHandler = require('../../elements/CityHandler.jsx')(treeData);


  return React.createClass({
    displayName: 'Header',

    mixins: [treeData.mixin],

    cursors: {
      user: ['user'],
      profile: ['profile'],
    },


    getInitialState: function getInitialState() : Object {
      return {};
    },


    componentDidMount: function() : void {
    },


    logout: function logout() {
      cognitoAuth.authUserLogout();
      this.cursors.user.set('authed', false);
      this.cursors.user.set('accessToken', null);
    },


    openCartDropdown: function openCartDropdown() {
      React.findDOMNode(this.refs.cartDropdown).classList.toggle('show');
      React.findDOMNode(this).querySelector('.cart-button').classList.toggle('active');
    },


    render: function() : React.PropTypes.element {

      var user = this.cursors.user.get();

      var userComponent;

      if (user.authed) {

        userComponent =
          <div className="profileBtnsContainer">
            <Link to='profile' activeClassName='activeNull' className="header-button">
              <img src="http://api.adorable.io/avatars/285/abott@adorable.png" />
              <span>
              <strong>{this.cursors.profile.get().nome + ' ' + this.cursors.profile.get().cognome} </strong>
              <br/>
              <span>View Profile</span>
              </span>
            </Link>
            <button className='pure-button pure-button-logout' onClick={this.logout}><i className="fa fa-power-off"></i></button>
          </div>;

      } else {
        userComponent = <Link to='login' activeClassName='activeNull' className="pure-button pure-success"><span>Login</span></Link>;
      }

      return (
        <header>
         <div className="header-inner">
            <div className="pull-left">
              <Link to="home" activeClassName='activeNull' className="header-button"><img src="assets/img/otr-logo.png" className="logo"/></Link>

              <CityHandler cities={['Milan']} />
            </div>
            <div className="pull-right">
              <CartHandler />
              {userComponent}
            </div>
          </div>
        </header>
      );
    }

  });

};