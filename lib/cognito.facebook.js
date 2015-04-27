
'use strict';

var ok = require('assert');
//var Promise = require('bluebird');


module.exports = function (userCursor, profileCursor) {

  var statusChangeCallback = function statusChangeCallback (response) {

    ok(response, 'response not provided');
    ok(userCursor, 'userCursor not provided');

    if (response.status === 'connected') {
      console.log('facebook login',  response.status, response);

      userCursor.set('accessToken', {
        type: 'fb',
        token: response.authResponse.accessToken,
      });

      FB.api('/me', function (userData) {
        profileCursor.set('cognome', userData.last_name);
        profileCursor.set('nome', userData.first_name);
      });

    } else {
      console.log('facebook login failed', response.status, response);
    }
  };


  var checkLoginState =  function checkLoginState() {

    ok(userCursor, 'userCursor not provided');

    FB.getLoginStatus(function (response) {
      statusChangeCallback(response, userCursor);
    });
  };


  var checkLogin = function checkLogin() {

    ok(userCursor, 'userCursor not provided');

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '274301609428595',
        xfbml      : true,
        version    : 'v2.3'
      });

      checkLoginState();
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
    checkLogin: checkLogin,
  };

};