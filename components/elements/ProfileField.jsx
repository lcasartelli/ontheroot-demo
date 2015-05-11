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


    componentWillReceiveProps: function componentWillReceiveProps () {
      var isEditable = this.props.isEditable.value;

      if (!this.refs.input) {
        return;
      }

      console.log('isEditable', this.props.isEditable.value);

      if (!isEditable) {
        React.findDOMNode(this.refs.input).setAttribute('readonly', true);
      } else {
        React.findDOMNode(this.refs.input).removeAttribute('readonly');
      }
    },


    render: function() : React.PropTypes.element {

      var componentScope = this;

      return (<input type={this.props.type} valueLink={this.linkState('value')} placeholder={this.props.placeholder} ref='input' required />);
    }

  });

};
