import restify from 'restify';
import co from 'co';
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
            co(function *(){
                hitsController.updateTracking(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        server.post('/hits/:id2', (req, res, next) => {
            co(function *(){
                hitsController.update(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        server.get('/hits/', (req, res, next) => {
            co(function *(){
                hitsController.list(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        server.get('/hits/:id', (req, res, next) => {
            co(function *(){
                hitsController.get(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        /*server.put('/hits/:id', (req, res, next) => {
            co(function *(){
                hitsController.update(req, res, next);
                return next();
             }).catch(this.onerror);     
        });*/


        server.del('/hits/', (req, res, next) => {
            co(function *(){        
                hitsController.removeAll(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        server.del('/hits/:id', (req, res, next) => {
            co(function *(){        
                hitsController.remove(req, res, next);
                return next();
             }).catch(this.onerror);     
        });
    }
}

module.exports = SitesApi; //set what can be imported from this file