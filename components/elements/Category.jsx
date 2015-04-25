
/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;


module.exports = function (data) {

  return React.createClass({
    displayName: 'Category',

    propTypes: {},



    getInitialState: function getInitialState() : Object {
      return {};
    },


    componentDidMount: function() : void {

    },


    render: function() : React.PropTypes.element {
      
      var isComing = this.props.comingsoon === true;
      
      var restaurantsCountComponent;
      var className = [ 'food-type', this.props.className ];
      
      if(isComing) {
        className.push('comingsoon');
        restaurantsCountComponent = <p></p>;
      } else {
        restaurantsCountComponent = <p><strong>7 ristoranti</strong></p>;
      }
      
      var mainComponent = (        
        <div className={className.join(' ')}>
           <div className="food-type-inner">
              <h1>{this.props.title}</h1>
              {restaurantsCountComponent}
           </div>
        </div>);
        
      if (!isComing) {
        mainComponent = (<Link to='restaurants'>{mainComponent}</Link>);
      }
      
      return mainComponent;
    }

  });

};
