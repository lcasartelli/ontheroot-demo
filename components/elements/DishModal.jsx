
/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;


module.exports = function (treeData) {

  var checkout = require('../../lib/checkout')(treeData);
  var DonutChart = require('./DonutChart.jsx')(treeData);

  return React.createClass({
    displayName: 'DishModal',

    mixins: [React.addons.LinkedStateMixin],

    propTypes: {
      dish: React.PropTypes.object.isRequired,
      onClose: React.PropTypes.func.isRequired,
    },



    getInitialState: function getInitialState() : Object {
      return {
        quantity: 1
      };
    },


    componentDidMount: function() : void {},




    closeModal: function closeModal() {
      React.findDOMNode(this).classList.remove('show');
      this.props.onClose();
    },


    addToCart: function addToCart() {


      if (!Number.isNaN(this.state.quantity)) {
        var qtyVal = Number.parseInt(this.state.quantity, 10);
        checkout.addItem(this.props.dish, qtyVal);
      }
      this.closeModal();
    },


    quantityPlus: function quantityPlus() {
      var qtyInput = Number.parseInt(this.state.quantity, 10);
      if (qtyInput >= 10) { return; }
      this.setState({ quantity: (qtyInput + 1) });
    },


    quantityMinus: function quantityMinus() {
      var qtyInput = Number.parseInt(this.state.quantity, 10);
      if (qtyInput <= 1) { return; }
      this.setState({ quantity: (qtyInput - 1) });
    },


    render: function() : React.PropTypes.element {


      var headerImage = this.props.dish.image;


      var descriptionComponent;

      if (this.props.dish.description && this.props.dish.description.length > 0) {
        descriptionComponent = <div><h4 id="descrizione">Description</h4><p>{this.props.dish.description}</p></div>;
      }

      return (
      <div id="food-modal-overlay" className="show">
      <div className="food-modal-inner">
        <div style={{ backgroundImage: "url('./assets/img/dish/" + headerImage + "')" }} className="food-modal-image">
          <a id="close-modal" onClick={this.closeModal}>
            <i className="fa fa-close"></i>
          </a>
        </div>
        <div className="food-modal-padding">
          <h2>{this.props.dish.name}</h2>
          <div className="food-description">
            { descriptionComponent }
            <h4 id="quantit-">Quantity</h4>
            <p>300g - portion for <strong>1 person</strong></p>
          </div>
          <div className="food-info">
            <div className="pure-g">
              <div className="pure-u-1 pure-u-sm-10-24">
                <h4>Nutritional Values</h4>
                <div className="spacer-5"></div>
                <div className="nutritional-value">{this.props.dish.kcal}<small>Calories</small></div>
                <div className="spacer-10"></div>
                <div className="nutritional-bar">
                  <label>Protein</label>
                  <div className="nutritional-progress"><span style={{"width": this.props.dish.proteine }}></span></div>
                </div>
                <div className="nutritional-bar">
                  <label>Fat</label>
                  <div className="nutritional-progress"><span style={{"width": this.props.dish.grassi }}></span></div>
                </div>
                <div className="nutritional-bar">
                  <label>Carbohydrate</label>
                  <div className="nutritional-progress"><span style={{"width": this.props.dish.carboidrati }}></span></div>
                </div>
              </div>
              <div className="pure-u-1 pure-u-sm-1-24"></div>
            </div>
          </div>
          <div className="food-actions">
            <div id="order-form" className="pure-form">
              <input type="hidden" name="foodID" value="1"/><label>{this.props.dish.price}<small>&euro;</small></label><label>&times;</label>
              <div className="qty">
                <input id="quantity" type="number" name="quantity" min="1" max="10" valueLink={this.linkState('quantity')} />
                <div className="qty-actions">
                  <a onClick={this.quantityPlus} className="qty-plus">
                    <i className="fa fa-plus"></i>
                  </a>
                  <a onClick={this.quantityMinus} className="qty-minus">
                    <i className="fa fa-minus"></i>
                  </a>
                </div>
              </div>
              <button className="pure-button pure-success" onClick={this.addToCart}>
                <i className="fa fa-cart-plus"></i>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>);
    }

  });

};



/*

  IMPRONTA AMBIENTALE

  <div className="pure-u-1 pure-u-sm-13-24">
    <h4>Impronta ambientale</h4>
    <div className="spacer-10"></div>
    <div className="pure-g text-center">
      <div className="pure-u-1 pure-u-sm-1-3">
        <DonutChart title={"ecologica"} value={this.props.dish.global} scale={"100"} color={"#87d860"} unit={"m" + String.fromCharCode(178) + " global"} />
      </div>
      <div className="pure-u-1-2 pure-u-sm-1-3">
        <DonutChart title={"CO" + String.fromCharCode(178) + " eq"} value={this.props.dish.co2} scale={"100"} color={"#f9ab30"} unit={"g"} />
      </div>
      <div className="pure-u-1-2 pure-u-sm-1-3">
        <DonutChart title={"H" + String.fromCharCode(178) + "O"} value={this.props.dish.h2o} scale={"100"} color={"#a89f84"} unit={"litri"} />
      </div>
    </div>
  </div>
*/
