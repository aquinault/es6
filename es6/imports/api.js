import restify from 'restify';

class Api {
    constructor(debug = false) {
        this.name = 'Social API!';
        console.log("Loading ", this.name); //this == the object instance.
    }
    
    init() {
		let server = restify.createServer({
		  name: 'myapp',
		  version: '1.0.0'
		});
		server.use(restify.acceptParser(server.acceptable));
		server.use(restify.queryParser());
		server.use(restify.bodyParser());

		this._api1(server);

		server.listen(8080, function () {
		  console.log('%s listening at %s', server.name, server.url);
		});       
    }
    
    _api1(server) {
		server.get('/echo/:name', (req, res, next) => {
		  res.send(req.params); 
		  return next();
		});
    }
}

module.exports = Api; //set what can be imported from this file
