/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

var cognitoAuth = require('../../../lib/cognito')();


module.exports = function (treeData) {

  var CartDropDown = require('../../elements/CartDropDown.jsx')(treeData);

  return React.createClass({
    displayName: 'Header',

    mixins: [treeData.mixin],

    cursors: {
      user: ['user'],
    },


    getInitialState: function getInitialState() : Object {
      return {};
    },

    componentDidMount: function() : void {

      document.querySelector('.cart-button').onclick = function () {
        document.getElementById('cart-dropdown').classList.toggle('show');this.classList.toggle('active');
      };
    },


    logout: function logout() {
      console.log('logout...');
      cognitoAuth.authUserLogout();
      this.cursors.user.set('authed', false);
      this.cursors.user.set('accessToken', null);
    },


    render: function() : React.PropTypes.element {

      var user = this.cursors.user.get();

      var userComponent;

      if (user.authed) {
        userComponent =
          <a href="profilo.html" className="header-button">
            <img src="http://api.adorable.io/avatars/285/abott@adorable.png" />
            <span>
            <strong>Abott Doe</strong>
            <br/>
            <span>il tuo profilo</span>
            </span>
          </a>;
      } else {
        userComponent = <Link to='login' activeClassName='activeNull' className="pure-button pure-success"><span>Login</span></Link>;
      }

      return (
        <header>
         <div className="header-inner">
            <div className="pull-left">
              <Link to="home" activeClassName='activeNull' className="header-button"><img src="assets/img/otr-logo.png" className="logo"/></Link>
            </div>
            <div className="pull-right">
               <a className="header-button cart-button">
                  <i className="fa fa-shopping-cart">
                    <strong className="badge">5</strong>
                  </i>
                  <span>Carrello</span>
                  <CartDropDown />
               </a>
            {userComponent}
            </div>
          </div>
        </header>
      );
    }

  });

};