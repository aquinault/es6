import restify from 'restify';
import config from '../conf/config';
import sitesController from '../controllers/sitesController';

class SitesApi{
    constructor(server){
        this.name = 'Sites API!';
        console.log("Init", this.name); //this == the object instance.
        this.init(server);
    }
    onerror(err) {
        console.error(err.stack);
    }
    init(server){
        server.get('/sites/byUserId/:user_id', (req, res, next) => {
            let fn = sitesController.list(req.params.user_id);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                res.send(422, err);
            });
            return next();            
        });

        server.get('/sites/:id', (req, res, next) => {
            let fn = sitesController.get(req.params.id);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                res.send(422, err);
            });
            return next();            
        });

        server.put('/sites/:id', (req, res, next) => {
            let fn = sitesController.update(req.params.id, req.body);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                res.send(422, err);
            });
            return next();            
        });

        server.del('/sites/', (req, res, next) => {
            let fn = sitesController.removeAll();
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                res.send(422, err);
            });
            return next();            
        });

        server.del('/sites/:id', (req, res, next) => {
            let fn = sitesController.remove(id);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                res.send(422, err);
            });
            return next();            
        });

        server.post('/sites/', (req, res, next) => {
            let fn = sitesController.create(req.body.name, req.body.user_id);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                res.send(422, err);
            });
            return next();            
        });
    }
}

module.exports = SitesApi; //set what can be imported from this file