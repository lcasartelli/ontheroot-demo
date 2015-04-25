
/* @flow */
/*jshint browser:true, devel:true */

'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;


module.exports = function (treeData) {

  var checkout = require('../../lib/checkout')(treeData);

  return React.createClass({
    displayName: 'DonutChart',

    propTypes: {
      title: React.PropTypes.string.isRequired,
      unit: React.PropTypes.string.isRequired,
      scale: React.PropTypes.string.isRequired,
      value: React.PropTypes.string.isRequired,
      color: React.PropTypes.string.isRequired,
    },


    getInitialState: function getInitialState() : Object {
      return {
        chart: null,
      };
    },


    componentDidMount: function() : void {
      var donut = React.findDOMNode(this.refs.canvas)
      this.setState({ chart: this._halfDoughnut(donut) });
    },
    
    _halfDoughnut: function _halfDoughnut(canvas) {
      var ctx = canvas.getContext('2d');
      var cd = {
        'v': parseInt(this.props.value, 10),
        's': parseInt(this.props.scale, 10) * 2,
        'c': this.props.color
      };
      var data = [
        {value: cd.v, color: cd.c, highlight: cd.c, label: ''},
        {value: (cd.s - cd.v), color: '#ece7d7', highlight: '#ece7d7', label: ''}
      ];
      var options = {
        animation: true,
        animationEasing: 'easeOutQuart',
        percentageInnerCutout: 70,
        showTooltips: false
      };

      return new Chart(ctx).Doughnut(data,options);
    },
    
    componentWillUnmount: function () {
      if (this.state.chart) { 
        this.state.chart.destroy();
      }
    },
    

    render: function() : React.PropTypes.element {
    
      return (
       <div>
        <div className="donut-label">{this.props.title}</div>
        <div className="donut-container">
          <canvas ref='canvas' id="canvas-impronta-ecologica" width="80" height="80" className="donut"></canvas>
        </div>
        <div className="donut-value">{this.props.value}<small>{this.props.unit}</small></div>
       </div> 
       );
    }

  });
}; 
