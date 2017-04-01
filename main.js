var Hapi = require('hapi');
var Vision = require('vision');
var Path = require('path');
var Inert = require('inert');
var hapiSwagger = require('hapi-swagger');

var regRoutes = require('./routes/routes');
var apiRoutes = require('./routes/api_routes');
var Pack = require('./package');
var Joi = require('joi');
var allRoutes;
var registerdArr = [];

// this is some of the hapiSwaggerOptions
const hapiSwaggerOptions = {
  info: {
    'title': 'test api documentation'
    ,'version': Pack.version
  }
}
// this is all the configuration for hapiSwagger
var hapiSwaggerConfigContainer = {
  'register': hapiSwagger
  ,'options': hapiSwaggerOptions
};


registerdArr.push(hapiSwaggerConfigContainer);

// hapi server public files
const public_files = {
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'app')
      }
    }
  }
};


const server_internals = {
    port: process.env.PORT || 8080
    ,host: process.env.IP || "0.0.0.0"
    ,labels: ['http']
};

const server = new Hapi.Server(public_files);

server.connection(server_internals);

// this will add registered plugins
registerdArr.push(Vision, Inert);

// this will add all your routes
allRoutes = regRoutes.concat(apiRoutes);


server.register(registerdArr, (err)=> {
    if(err)
      console.error(err);

    console.log(allRoutes);
    server.route(allRoutes);
});

server.start((req, res)=> {
    console.log('server has started');
    console.log('\n\t=> ' + process.env.IP + ':' + process.env.PORT);
});
