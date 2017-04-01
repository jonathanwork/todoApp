var AllRoutes = [];
var Joi = require('joi');
var path = require('path');
var apiRoutes = require('./api_routes');
function routesPusher(obj, arr) {
  if(arr == 'undefined')
    console.err(`there must be an array`);
  arr.push(obj);
  return arr;
}


var vendor_page = {
  method: 'GET'
  ,path: '/bower_components/{bower_files*}'
  ,config: {
    handler: {
      directory: {
        path: path.join(__dirname , '../app/bower_components')
        ,index: false
      }

    }
  }
}
routesPusher(vendor_page, AllRoutes);


var default_page = {
    method: 'GET'
    ,path: '/{html*}'
    ,config:{
      handler:{
        directory: {
          path: path.join(__dirname, '../app')
          ,index: false

        }
      }
    }
};
routesPusher(default_page, AllRoutes);


var default_redirect = {
  method: 'GET'
  ,path: '/'
  ,config: {
    handler:(req, reply)=> {
      reply.redirect('/index.html');
    }
  }
};

routesPusher(default_redirect, AllRoutes);


module.exports = AllRoutes;
