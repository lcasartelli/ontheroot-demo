
/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;


module.exports = function (data) {

  return React.createClass({
    displayName: 'CheckoutItem',

    mixins: [React.addons.LinkedStateMixin],

    propTypes: {
      item: React.PropTypes.object.isRequired,
      onUpdateQuantity: React.PropTypes.func.isRequired,
      onRemoveItem: React.PropTypes.func.isRequired,
    },


    getInitialState: function getInitialState() : Object {
      return {
        quantity: 0, 
      };
    },


    componentDidMount: function() : void {
      this.setState({ quantity: Number.parseInt(this.props.item.qty, 10) });
    },


    quantityPlus: function quantityPlus() {
      var qtyInput = this.state.quantity;
      if (qtyInput >= 10) { return; }
      this.setState({ quantity: (qtyInput + 1) });
      this.props.onUpdateQuantity(this.props.item, this.state.quantity);
    },


    quantityMinus: function quantityMinus() {
      var qtyInput = this.state.quantity;
      if (qtyInput <= 1) { return; }
      this.setState({ quantity: (qtyInput - 1) });
      this.props.onUpdateQuantity(this.props.item, this.state.quantity);
    },


    removeItem: function removeItem() {
      this.props.onRemoveItem(this.props.item);
    },


    render: function() : React.PropTypes.element {

      return (
        <li>
          <span className="item">{this.props.item.name}</span>
          <span className="price"><span className="price-num">{this.props.item.price}</span>&euro;</span>

          <div className='qty'>
            <input type="number" valueLink={this.linkState('quantity')} min="1" max="99" step="1" />
            <div className="qty-actions">
                <a onClick={this.quantityPlus} className="qty-plus">
                  <i className="fa fa-plus"></i>
                </a>
                <a onClick={this.quantityMinus} className="qty-minus">
                  <i className="fa fa-minus"></i>
                </a>
              </div>
              <span style={{ "padding-left": "10px" }} className="qty-remove"><i className="fa fa-times" onClick={this.removeItem}></i></span>
          </div>
        </li>);
    }

  });

};
