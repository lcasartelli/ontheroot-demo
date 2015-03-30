'use strict';

function* responseSplash() {/*jshint noyield:true, validthis:true */
  this.status = 200;
  yield this.render('splash', {});
}

function* responseAllgood() {/*jshint noyield:true, validthis:true */
  this.status = 200;
  this.body = 'All good :-)';
}


module.exports = [

  { name: 'root',           url: '/',                 method: 'get',  controller: responseSplash },
  { name: '--system-check', url: '/--system-check',    method: 'get',  controller: responseAllgood },
 ];
