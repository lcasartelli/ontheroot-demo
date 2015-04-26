/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = function (treeData) {

  return React.createClass({
    displayName: 'Login',

    mixins: [treeData.mixin],
    cursors: {
      user: ['user'],
    },


    getInitialState: function getInitialState() : Object {
      return {};
    },


    checkLoginState: function checkLoginState() {
      FB.getLoginStatus(function (response) {
        this.statusChangeCallback(response);
      }.bind(this));
    },


    componentDidMount: function() : void {

      window.fbAsyncInit = function() {
        FB.init({
          appId      : '274301609428595',
          xfbml      : true,
          version    : 'v2.3'
        });

        //this.checkLoginState();

      }.bind(this);

      (function (d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

    },

    doLoginFB: function() {
      FB.login(this.checkLoginState());
    },


    statusChangeCallback: function statusChangeCallback(response) {

      console.log('statusChangeCallback', response);

      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        console.log('logged');
        this.cursors.user.set('accessToken', {
          type: 'fb',
          token: response.authResponse.accessToken,
        });

      } else {
        console.log('not logged');
      }
    },


    render: function() : React.PropTypes.element {

      var loginButton;

      var user = this.cursors.user.get();

      if (!user.authed) {
        loginButton = <button className='pure-button' onClick={this.doLoginFB}>Login</button>;
      } else {
        loginButton = <div></div>;
      }

      return (
         <div className="page">
          <div className="spacer-80"></div>
          <div className="spacer-80"></div>
          
          { loginButton }
        </div>
      );
    }

  });

};