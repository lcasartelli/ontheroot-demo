/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = function (treeData) {

  var facebookCognito = require('../../lib/cognito.facebook')(treeData.select('user'), treeData.select('profile'));

  return React.createClass({
    displayName: 'Login',

    mixins: [treeData.mixin],
    cursors: {
      user: ['user'],
    },


    getInitialState: function getInitialState() : Object {
      return {};
    },

    componentDidMount: function() : void {
    },

    doLoginFB: function() {
      facebookCognito.checkLogin(this.cursors.user);
    },


    render: function() : React.PropTypes.element {

      var loginButton;

      var user = this.cursors.user.get();

      if (!user.authed) {
        loginButton = <button className='pure-button pure-facebook' onClick={this.doLoginFB}><i className='fa fa-lg fa-facebook'></i><span>Effettua il login tramite Facebook</span></button>;
      } else {
        loginButton = <div></div>;
      }

      return (
         <div className="page">
         <div className="spacer-100"></div>
          <div className="login-container text-center">
            <div className="spacer-80"></div>
            { loginButton }
            <div className="spacer-80"></div>
          </div>
        </div>
      );
    }

  });

};