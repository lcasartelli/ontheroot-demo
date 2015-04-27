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
      /*
      var _that = this;

      window.addEventListener('resize', this.footerPosition);
      setTimeout(function () { _that.footerPosition(); }, 3000);
      */
    },


    footerPosition: function footerPosition() {
      /*
      var _fullnode = document.querySelector('#fullnode');
      var _footer = React.findDOMNode(this);
      var _wh = window.innerHeight;

      if (_wh > (_fullnode.offsetHeight - _footer.offsetHeight)) {
        _footer.style.position = 'fixed';
        _footer.style.width = '100%';
        _footer.style.left = '0px';
        _footer.style.bottom = '0px';
      } else {
        _footer.style.position = 'static';
        _footer.style.width = 'auto';
        _footer.style.left = 'auto';
        _footer.style.bottom = 'auto';
      }
      */


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
