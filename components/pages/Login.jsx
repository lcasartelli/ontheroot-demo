/* @flow */
/*jshint browser:true, devel:true */


'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = React.createClass({
  displayName: 'Login',

  propTypes: {
    user: React.PropTypes.object.isRequired,
  },


  getInitialState: function getInitialState() : Object {
    return {
      logged: false
    };
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

      this.checkLoginState();

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


  statusChangeCallback: function statusChangeCallback (response) {
    console.log('statusChangeCallback');
    console.log(response);

    this.props.user.accessToken.set({
      type: 'fb',
      token: response.authResponse.accessToken,
    });

    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      
      console.log('logged');

      this.setState({ logged: true });
    } else {
      console.log('not logged');
    }
  },


  render: function() : React.PropTypes.element {

    var loginButton;

    if (!this.state.logged) {
      loginButton = <button onClick={this.doLoginFB}>Login</button>;
    } else {
      loginButton = <div></div>;
    }

    return (
      <section id="app">
        <header></header>

        <section id="app">
          <section id="content">
          { loginButton }
          </section>
        </section>

        <footer></footer>
      </section>
    );
  }

});
