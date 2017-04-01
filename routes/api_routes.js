var api_routes = [];
var Joi = require('joi');

function routesPusher(obj, arr) {
  if(arr == 'undefined')
    console.err(`there must be an array`);
  arr.push(obj);
  return arr;
}

var todoRoute = {
    method: 'GET',
    path: '/client/{name}',
    config: {
        handler: (req, reply)=> {
          var name = req.params.name;
          return reply(name)

        }
        ,description: 'Get client name'
        ,notes: 'Returns a client name'
        ,tags: ['api', 'todo'] // ADD THIS TAG
        
    },
}

routesPusher(todoRoute, api_routes);


module.exports = api_routes;
