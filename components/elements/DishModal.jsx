
/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;


module.exports = function (data) {

  return React.createClass({
    displayName: 'DishModal',

    propTypes: {
      dish: React.PropTypes.object.isRequired,
      onClose: React.PropTypes.func.isRequired,
    },



    getInitialState: function getInitialState() : Object {
      return {
        charts: []
      };
    },


    componentDidMount: function() : void {      

      var componentDom = React.findDOMNode(this);

      this.initCharts();


      componentDom.querySelector('.qty-plus').addEventListener('click', function () {
        var qtyInput = componentDom.getElementById('quantity');
        if (parseInt(qtyInput.value, 10) >= 10) { return; }
        qtyInput.value = parseInt(qtyInput.value, 10) + 1;
      });

      componentDom.querySelector('.qty-minus').addEventListener('click', function () {
        var qtyInput = componentDom.getElementById('quantity');
        if (parseInt(qtyInput.value, 10) <= 1) { return; }
        qtyInput.value = parseInt(qtyInput.value, 10) - 1;
      });



      componentDom.querySelector('#order-form').addEventListener('submit', function (evt) {
        evt.preventDefault();
        return false;
      });

    },
    
    
    _halfDoughnut: function _halfDoughnut(canvas) {
      var ctx = canvas.getContext('2d');
      var cd = {
        'v': parseInt(canvas.getAttribute('data-value'), 10),
        's': parseInt(canvas.getAttribute('data-scale'), 10) * 2,
        'c': canvas.getAttribute('data-color')
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
    
    
    initCharts: function initCharts() {
      var componentScope = this;
      React.findDOMNode(this).querySelectorAll('canvas.donut').forEach(function (donut) {
        componentScope.state.charts.push(componentScope._halfDoughnut(donut));
      });
    },
    
    
    closeModal: function closeModal() {
      this.state.charts.forEach(function (chart) { chart.destroy(); });
      React.findDOMNode(this).classList.remove('show');
      this.props.onClose();
    },


    render: function() : React.PropTypes.element {
      
      
      var headerImage = 'none';
      
      return (
      <div id="food-modal-overlay" className="show">
      <div className="food-modal-inner">
        <div style={{"background-image": "url('" + headerImage + "');"}} className="food-modal-image">
          <a id="close-modal" onClick={this.closeModal}>
            <i className="fa fa-close"></i>  
          </a>
        </div>
        <div className="food-modal-padding">
          <h2>{this.props.dish.name}</h2>
          <div className="food-description">
            <h4 id="descrizione">Descrizione</h4>
            <p>{this.props.dish.description}</p>
            <h4 id="quantit-">Quantità</h4>
            <p>300g - porzione per <strong>2 persone</strong></p>
          </div>
          <div className="food-info">
            <div className="pure-g">
              <div className="pure-u-1 pure-u-sm-10-24">
                <h4>Valori nutrizionali</h4>
                <div className="spacer-5"></div>
                <div className="nutritional-value">120<small>kcal</small></div>
                <div className="spacer-10"></div>
                <div className="nutritional-bar">
                  <label>Proteine</label>
                  <div className="nutritional-progress"><span style={{"width": this.props.dish.proteine }}></span></div>
                </div>
                <div className="nutritional-bar">
                  <label>Grassi</label>
                  <div className="nutritional-progress"><span style={{"width": this.props.dish.grassi }}></span></div>
                </div>
                <div className="nutritional-bar">
                  <label>Carboidrati</label>
                  <div className="nutritional-progress"><span style={{"width": this.props.dish.carboidrati }}></span></div>
                </div>
              </div>
              <div className="pure-u-1 pure-u-sm-1-24"></div>
              <div className="pure-u-1 pure-u-sm-13-24">
                <h4>Impronta ambientale</h4>
                <div className="spacer-10"></div>
                <div className="pure-g text-center">
                  <div className="pure-u-1 pure-u-sm-1-3">
                    <div className="donut-label">ecologica</div>
                    <div className="donut-container">
                      <canvas id="canvas-impronta-ecologica" width="80" height="80" data-value="10" data-scale="50" data-color="#87d860" className="donut"></canvas>
                    </div>
                    <div className="donut-value">0,6<small>m&sup2; global</small></div>
                  </div>
                  <div className="pure-u-1-2 pure-u-sm-1-3">
                    <div className="donut-label">CO&sup2; eq</div>
                    <div className="donut-container">
                      <canvas id="canvas-impronta-co2" width="80" height="80" data-value="50" data-scale="100" data-color="#f9ab30" className="donut"></canvas>
                    </div>
                    <div className="donut-value">100<small>g</small></div>
                  </div>
                  <div className="pure-u-1-2 pure-u-sm-1-3">
                    <div className="donut-label">H&sup2;O</div>
                    <div className="donut-container">
                      <canvas id="canvas-impronta-h2o" width="80" height="80" data-value="50" data-scale="50" data-color="#a89f84" className="donut"></canvas>
                    </div>
                    <div className="donut-value">190<small>litri</small></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="food-actions">
            <form id="order-form" className="pure-form">
              <input type="hidden" name="foodID" value="1"/><label>7,50<small>&euro;</small></label><label>&times;</label>
              <div className="qty">
                <input id="quantity" type="number" name="quantity" value="1" min="1" max="10" />
                <div className="qty-actions"><a onclick="" className="qty-plus"><i className="fa fa-plus"></i></a><a onclick="" className="qty-minus"><i className="fa fa-minus"></i></a></div>
              </div>
              <button type="submit" className="pure-button pure-success"><i className="fa fa-cart-plus"></i><span>Aggiungi al carrello</span></button>
            </form>
          </div>
        </div>
      </div>
      </div>);
    }

  });

};
