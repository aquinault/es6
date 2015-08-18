import logger from '../conf/logger';
import restify from 'restify';
import config from '../conf/config';
import hitsController from '../controllers/hitsController';

class SitesApi{
    constructor(server){
        this.name = 'Hits API!';
        //console.log("Init", this.name); //this == the object instance.
        logger.info("Init", this.name)
        this.init(server);
    }
    onerror(err) {
        logger.error(err.stack);
    }
    init(server){
        server.get('/api/tracking/:site_id', (req, res, next) => {

            let ua = req.headers['user-agent']; 
            let site_id = req.params.site_id;

            let fn = hitsController.updateTracking(site_id, ua);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });
            return next();
        });

        server.get('/api/hits/:site_id/traffic/:date', (req, res, next) => {
            let fn = hitsController.getTraffic(req.params.site_id, req.params.date);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                logger.error(err.stack);
                res.send(422, config.error_msg);
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

        server.get('/api/hits/bySiteId/:site_id', (req, res, next) => {
            let fn = hitsController.listBySiteId(req.params.site_id);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });
            return next();
        });

        server.get('/api/hits/:id', (req, res, next) => {
            let fn = hitsController.get(req.params.id);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });
            return next();
        });

        server.del('/api/hits/', (req, res, next) => {
            let fn = hitsController.removeAll();
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });
            return next();
        });

        server.del('/api/hits/:id', (req, res, next) => {
            let fn = hitsController.remove(req.params.id);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });
            return next();
        });
    }
}

module.exports = SitesApi; //set what can be imported from this file