'use strict';


function isAuthenticated(user) {
  return user && user.is_logged && user.clef_id && user.phone_number;
}

function isAdmin(user) {
  return isAuthenticated(user) && user.is_admin === true;
}


module.exports = {
  
  '*': {
    '*': [isAdmin],
    'login': [function () { return true; }]
  },
  
  'user': {
    
  },
  
};
