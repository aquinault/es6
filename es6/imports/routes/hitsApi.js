import restify from 'restify';
import config from '../conf/config';
import hitsController from '../controllers/hitsController';

class SitesApi{
    constructor(server){
        this.name = 'Hits API!';
        console.log("Init", this.name); //this == the object instance.
        this.init(server);
    }
    onerror(err) {
        console.error(err.stack);
    }
    init(server){
        server.get('/tracking/:site_id', (req, res, next) => {
            let fn = hitsController.updateTracking(req);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                console.log(err);
                res.send(422, err);
            });
            return next();
        });

        server.get('/hits/:site_id/traffic/:date', (req, res, next) => {
            let fn = hitsController.getTraffic(req.params.site_id, req.params.date);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                res.send(422, err);
            });
            return next();
        });
        /*
        server.post('/hits/:id2', (req, res, next) => {
            let fn = hitsController.update(req.params.id2);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                res.send(422, err);
            });
            return next();
        });
        */
        server.get('/hits/:user_id', (req, res, next) => {
            let fn = hitsController.listByUserId(req.params.user_id);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                res.send(422, err);
            });
            return next();
        });

        server.get('/hits/:id', (req, res, next) => {
            let fn = hitsController.get(req.params.id);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                res.send(422, err);
            });
            return next();
        });

        server.del('/hits/', (req, res, next) => {
            let fn = hitsController.removeAll();
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                res.send(422, err);
            });
            return next();
        });

        server.del('/hits/:id', (req, res, next) => {
            let fn = hitsController.remove(req.params.id);
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