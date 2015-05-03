/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = function (treeData) {

  var facebookCognito = require('../../lib/cognito.facebook')(treeData);

  return React.createClass({
    displayName: 'Login',

    mixins: [treeData.mixin],

    cursors: {
      user: ['user'],
    },

    contextTypes: {
      router: React.PropTypes.func.isRequired
    },


    getInitialState: function getInitialState() : Object {
      return {};
    },


    componentDidMount: function() : void {
    },


    componentWillMount: function() : void {
      this.checkUserStatus();
    },


    doLoginFB: function() {
      facebookCognito.checkLogin(this.cursors.user);
    },


    checkUserStatus: function checkUserStatus() {
      if (this.cursors.user.get().authed) {
        this.context.router.transitionTo('home');
      }
    },


    render: function() : React.PropTypes.element {

      this.checkUserStatus();

      var loginButton;

      var user = this.cursors.user.get();

      if (!user.authed) {
        loginButton = <button className='pure-button pure-facebook' onClick={this.doLoginFB}><i className='fa fa-lg fa-facebook'></i><span>Login with Facebook</span></button>;
      } else {
        loginButton = <div></div>;
      }

      return (
        <div>
          <div className="page header-image" style={{"background-image": "url('./assets/img/headers/login.jpg');"}}>
            <div className="text-center">
              <div className="spacer-150"></div>
              <h1>Login</h1>
              <div className="spacer-100"></div>
            </div>
          </div>
           <div className="page">
           <div className="spacer-100"></div>
            <div className="login-container text-center">
              <div className="spacer-50"></div>
              { loginButton }
              <div className="spacer-80"></div>
              <div className="spacer-80"></div>
              <div className="spacer-50"></div>
            </div>
          </div>
        </div>
      );
    }

  });

};
