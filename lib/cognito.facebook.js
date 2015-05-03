
'use strict';

var ok = require('assert');
//var Promise = require('bluebird');


module.exports = function (treeData) {

  var userCursor = treeData.select('user');
  var profileCursor = treeData.select('profile');


  var statusChangeCallback = function statusChangeCallback(response) {

    ok(response, 'response not provided');
    ok(userCursor, 'userCursor not provided');

    if (response.status === 'connected') {
      console.log('facebook login',  response.status, response);

      userCursor.set('accessToken', {
        type: 'fb',
        token: response.authResponse.accessToken,
      });
    } if (response.status ===  'not_authorized'){

      // FB.login(function (resp) {
      //   statusChangeCallback(resp);
      // }, {scope: 'public_profile,email'});

    } else {
      console.log('facebook login failed', response.status, response);
    }
  };


  var loadFacebookProfile = function loadFacebookProfile() {

    return new Promise(function(fullfill, reject) {
      FB.api('/me', function (userData) {
        fullfill({
          cognome: userData.last_name,
          nome: userData.first_name,
        });
      });
    });

  };


  var checkLoginState =  function checkLoginState() {

    ok(userCursor, 'userCursor not provided');

    FB.login(function (resp) {
      statusChangeCallback(resp, userCursor);
    }, {scope: 'public_profile,email'});

    // FB.getLoginStatus(function (response) {
    //   statusChangeCallback(response, userCursor);
    // });
  };


  var checkLogin = function checkLogin() {

    ok(userCursor, 'userCursor not provided');
    checkLoginState();
  };



  return {
    checkLogin: checkLogin,
    loadFacebookProfile: loadFacebookProfile,
  };

};
