var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'LayoutSaver',
  description: 'API server for saving layouts to FURUNO videowall',
  script: '../server.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});
 
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
 
svc.install();