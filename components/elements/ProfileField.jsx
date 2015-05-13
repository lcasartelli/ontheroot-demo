/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');


module.exports = function (treeData) {

  return React.createClass({
    displayName: 'ProfileField',

    mixins: [React.addons.LinkedStateMixin],

    propTypes: {
      type: React.PropTypes.string.isRequired,
      placeholder: React.PropTypes.string.isRequired,
      initialValue: React.PropTypes.string.isRequired,
      isEditable: React.PropTypes.bool.isRequired,
    },


    getInitialState: function getInitialState() : Object {
      return {
        value: ''
      };
    },


    componentDidMount: function() : void {
      console.log('initialValue', this.props.initialValue);
      this.setState({ value: this.props.initialValue });
    },



    render: function() : React.PropTypes.element {

      if (this.props.isEditable) {
        return (<input type={this.props.type} valueLink={this.linkState('value')} placeholder={this.props.placeholder} ref='input' required />);
      } else {
        return (<input type={this.props.type} valueLink={this.linkState('value')} placeholder={this.props.placeholder} ref='input' required readOnly/>);
      }
    }

  });

};
