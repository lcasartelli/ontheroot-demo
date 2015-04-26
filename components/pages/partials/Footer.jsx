/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = function (data) {

  return React.createClass({
    displayName: 'Footer',

    propTypes: {},



    getInitialState: function getInitialState() : Object {
      return {};
    },


    componentDidMount: function() : void {

    },


    render: function() : React.PropTypes.element {

      return (
        <footer>
          <div className="footer-inner">
            <div className="pull-left">
              <img src="assets/img/otr-logo-footer.png" className="logo"/>
            </div>
            <div className="pull-right">
              <p>Copyright &copy; 2015 <strong>Ontheroot </strong>- All rights reserved. <a href="">hello@ontheroot.it</a><a href="">Privacy</a></p>
            </div>
          </div>
        </footer>
      );
    }

  });

};
