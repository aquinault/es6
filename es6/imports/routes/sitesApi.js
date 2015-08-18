import logger from '../conf/logger';
import restify from 'restify';
import config from '../conf/config';
import sitesController from '../controllers/sitesController';

class SitesApi{
    constructor(server){
        this.name = 'Sites API!';
        logger.info("Init", this.name); //this == the object instance.
        this.init(server);
    }
    onerror(err) {
        logger.error(err.stack);
    }
    init(server){
        server.get('/api/sites/byUserId/:user_id', (req, res, next) => {
            let fn = sitesController.list(req.params.user_id);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });
            return next();            
        });

        server.get('/api/sites/:id', (req, res, next) => {
            let fn = sitesController.get(req.params.id);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });
            return next();            
        });

        server.put('/api/sites/:id', (req, res, next) => {
            let fn = sitesController.update(req.params.id, req.body);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });
            return next();            
        });

        server.del('/api/sites/', (req, res, next) => {
            let fn = sitesController.removeAll();
            fn.then((results) => {
                res.send(results);
            }, (err) => {                
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });
            return next();            
        });

        server.del('/api/sites/:id', (req, res, next) => {
            let fn = sitesController.remove(id);
            fn.then((results) => {
                res.send(results);
            }, (err) => {
                logger.error(err.stack);
                res.send(422, config.error_msg);
            });
            return next();            
        });

        server.post('/api/sites/', (req, res, next) => {
            let fn = sitesController.create(req.body.name, req.body.user_id);
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