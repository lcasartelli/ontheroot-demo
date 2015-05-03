
/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;


module.exports = function (treeData) {

  return React.createClass({
    displayName: 'CheckoutItem',

    mixins: [treeData.mixin, React.addons.LinkedStateMixin],

    cursors: {
      cart: ['cart'],
    },

    propTypes: {
      item: React.PropTypes.object.isRequired,
      onUpdateQuantity: React.PropTypes.func.isRequired,
      onRemoveItem: React.PropTypes.func.isRequired,
      itemIndex: React.PropTypes.number.isRequired
    },


    componentDidMount: function() : void {
    },


    quantityPlus: function quantityPlus() {
      var val = Number.parseInt(this.props.item.qty, 10);
      val = val + 1;
      this.props.onUpdateQuantity(this.props.item, val);
    },


    quantityMinus: function quantityMinus() {
      var val = Number.parseInt(this.props.item.qty, 10);
      if (val - 1 >= 1) {
        val = val - 1;
        this.props.onUpdateQuantity(this.props.item, val);
      }
    },


    removeItem: function removeItem() {
      this.props.onRemoveItem(this.props.item);
    },

    onChangeValue: function onChangeValue(event) {
      var val = Number.parseInt(event.target.value, 10);
      this.props.onUpdateQuantity(this.props.item, val);
    },


    render: function() : React.PropTypes.element {

      var initialValue = Number.parseInt(this.props.item.qty, 10);

      return (
        <li>
          <span className="item">{this.props.item.name}</span>
          <span className="price"><span className="price-num">{this.props.item.price}</span>&euro;</span>

          <div className='qty'>
            <input type="number" min="1" max="99" step="1" ref='quantity' onChange={this.onChangeValue} value={initialValue} />
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
