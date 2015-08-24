module.exports =  function (routes) {
	
var Table = require('cli-table');
//var table = new Table({ head: ["", "Name", "Path"] });
var table = new Table({ head: ["", "Path"] });
 
console.log('\nAPI for this service \n');
for (var key in routes) {
  if (routes.hasOwnProperty(key)) {
    var val = routes[key];
    var _o = {};
    //_o[val.method]  = [val.name, val.spec.path ]; 
    _o[val.method]  = [val.spec.path ]; 
	  table.push(_o);
  }
}
console.log(table.toString());
 
return table;
};