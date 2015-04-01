'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Login = require('./components/pages/Login.jsx');
var Index = require('./components/pages/Index.jsx');
var Cortex = require('cortexjs');
var AWS = require('aws-sdk');
//var Promise = require('bluebird');


var syncClient;
var store = require('./lib/store')();
var auth = require('./lib/cognito')();

// Initialize the Amazon Cognito credentials provider
auth.unAuthUserLogin();

var cortexUserData = new Cortex({
  authed: false,
  identityId: null,
  accessToken: null,
  siteContent: null
});


cortexUserData.on('update', function userDataUpdated() {

  if (!cortexUserData.authed.getValue() && cortexUserData.accessToken.getValue() !== null) {

    auth.authUserLogin(cortexUserData.accessToken.type.getValue(), cortexUserData.accessToken.token.getValue())
    .then(function () {

      cortexUserData.identityId.set(AWS.config.credentials.identityIddentityId);
      cortexUserData.authed.set(true);

      render();
    });
  
  } else {
    render();  
  }
});


function render() {
  // if (cortexUserData.authed.getValue()) {
  //   React.render(<Index user={cortexUserData} siteId={null} />, document.querySelector('#fullnode'));  
  // } else {
  //   React.render(<Login user={cortexUserData} siteId={null} />, document.querySelector('#fullnode'));  
  // }
  React.render(<Index user={cortexUserData} siteId={null} />, document.querySelector('#fullnode'));  
}

// first render
render();
