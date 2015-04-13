
'use strict';

var AWS = require('aws-sdk');
//var Promise = require('bluebird');
var ok = require('assert');

var AccountId = '668302708306';
var IdentityPoolId = 'eu-west-1:a59540ec-2148-479d-bfb6-6648b97f9e65';
var RoleArn_unAuth = 'arn:aws:iam::668302708306:role/Cognito_ontheroot_demoUnauth_DefaultRole';
var RoleArn_auth = 'arn:aws:iam::668302708306:role/Cognito_ontheroot_demoAuth_DefaultRole';

module.exports = function () {

  var unAuthUserLogin = function () {
    
    AWS.config.update({
      region: 'eu-west-1',
      credentials: new AWS.CognitoIdentityCredentials({
        AccountId: AccountId,
        RoleArn: RoleArn_unAuth,
        IdentityPoolId: IdentityPoolId,
      })
    });
  };


  var authUserLogin = function (type, accessToken) {

    ok(type === 'fb', 'type not supported');
    ok(accessToken, 'facebookToken not provided');

    AWS.config.credentials.RoleArn = 'arn:aws:iam::668302708306:role/Cognito_ontheroot_demoAuth_DefaultRole';
    
    if (type === 'fb') {
      console.log('login with facebook', accessToken);
      AWS.config.credentials.Logins = { 'graph.facebook.com': accessToken };
    }

    AWS.config.credentials.expired = true;

    return new Promise(function (fullfill, reject) {

      AWS.config.credentials.get(function (err) {
        if (err) {
          reject(err);
          return;
        }

        fullfill();
      });
    });
  };


  var statusChangeCallback = function statusChangeCallback (response, userCursor) {

    console.log(response);

    userCursor.set('accessToken', {
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
    } else {
      console.log('not logged');
    }
  };


  var checkLoginState =  function checkLoginState(userCursor) {
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response, userCursor);
    });
  };


  var checkFacebookLogin = function checkFacebookLogin(userCursor) {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '274301609428595',
        xfbml      : true,
        version    : 'v2.3'
      });

      checkLoginState(userCursor);
    };

    (function (d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  };



  return {
    unAuthUserLogin: unAuthUserLogin,
    authUserLogin: authUserLogin,
    checkFacebookLogin: checkFacebookLogin,
  };

};