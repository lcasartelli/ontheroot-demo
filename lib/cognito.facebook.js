
'use strict';

var ok = require('assert');
//var Promise = require('bluebird');


module.exports = function () {

  var statusChangeCallback = function statusChangeCallback (response, userCursor) {

    ok(response, 'response not provided');
    ok(userCursor, 'userCursor not provided');

    if (response.status === 'connected') {
      console.log('facebook login',  response.status, response);

      userCursor.set('accessToken', {
        type: 'fb',
        token: response.authResponse.accessToken,
      });

    } else {
      console.log('facebook login failed', response.status, response);
    }
  };


  var checkLoginState =  function checkLoginState(userCursor) {

    ok(userCursor, 'userCursor not provided');

    FB.getLoginStatus(function (response) {
      statusChangeCallback(response, userCursor);
    });
  };


  var checkLogin = function checkLogin(userCursor) {

    ok(userCursor, 'userCursor not provided');

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
    checkLogin: checkLogin,
  };

};