
module.exports = {
  
  getStatic: function getStatic() {
    
    var _style = [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#b5cbe4"}]},{"featureType":"landscape","stylers":[{"color":"#efefef"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#83a5b0"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#bdcdd3"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e3eed3"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}];
    
    var result = [];
    _style.forEach(function(v, i, a) {
      var style = '';
      if (v.stylers) { // only if there is a styler object
        if (v.stylers.length > 0) { // Needs to have a style rule to be valid.
          style += (v.hasOwnProperty('featureType') ? 'feature:' + v.featureType : 'feature:all') + '|';
          style += (v.hasOwnProperty('elementType') ? 'element:' + v.elementType : 'element:all') + '|';
          v.stylers.forEach(function(val, i, a){
            var propertyname = Object.keys(val)[0];
            var propertyval = val[propertyname].toString().replace('#', '0x');
            // changed "new String()" based on: http://stackoverflow.com/a/5821991/1121532
            style += propertyname + ':' + propertyval + '|';
          });
        }
      }
      result.push('style='+encodeURIComponent(style));
    });

    return result.join('&');
  }
}