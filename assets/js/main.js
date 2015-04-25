/*global NodeList, HTMLCollection */

(function () {

  'use strict';

  NodeList.prototype.forEach = Array.prototype.forEach;
  HTMLCollection.prototype.forEach = Array.prototype.forEach;

  NodeList.prototype.map = Array.prototype.map;
  HTMLCollection.prototype.map = Array.prototype.map;  

  NodeList.prototype.on = function (event, listener) {
    this.forEach(function (el) {
      el.addEventListener(event, listener);
    });
  };
  
  document.querySelectorAll('[data-href]').on('click', function (e) {
    window.location.href = this.getAttribute('data-href');
  });

  
  /**
  *   ~ Register listeners
  **/

})();