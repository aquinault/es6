import restify from 'restify';
import co from 'co';
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
        server.get('/sites/', (req, res, next) => {
            co(function *(){
                sitesController.list(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        server.get('/sites/:id', (req, res, next) => {
            co(function *(){
                sitesController.get(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        server.put('/sites/:id', (req, res, next) => {
            co(function *(){
                sitesController.update(req, res, next);
                return next();
             }).catch(this.onerror);     
        });


        server.del('/sites/', (req, res, next) => {
            co(function *(){        
                sitesController.removeAll(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        server.del('/sites/:id', (req, res, next) => {
            co(function *(){        
                sitesController.remove(req, res, next);
                return next();
             }).catch(this.onerror);     
        });


        server.post('/sites/', (req, res, next) => {
            co(function *(){
                sitesController.create(req, res, next);
                return next();
             }).catch(this.onerror);     
        });


    }
}

module.exports = SitesApi; //set what can be imported from this file