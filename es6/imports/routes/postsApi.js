import restify from 'restify';
import co from 'co';
import config from '../conf/config';
import postsController from '../controllers/postsController';

class PostsApi{
    constructor(server){
        this.name = 'Posts API!';
        console.log("Init", this.name); //this == the object instance.
        this.init(server);
    }
    onerror(err) {
        console.error(err.stack);
    }
    init(server){
        server.get('/posts/', (req, res, next) => {
            co(function *(){
                postsController.list(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        server.get('/posts/:id', (req, res, next) => {
            co(function *(){
                postsController.get(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        server.put('/posts/:id', (req, res, next) => {
            co(function *(){
                postsController.update(req, res, next);
                return next();
             }).catch(this.onerror);     
        });


        server.del('/posts/', (req, res, next) => {
            co(function *(){        
                postsController.removeAll(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        server.del('/posts/:id', (req, res, next) => {
            co(function *(){        
                postsController.remove(req, res, next);
                return next();
             }).catch(this.onerror);     
        });


        server.post('/posts/', (req, res, next) => {
            co(function *(){
                postsController.create(req, res, next);
                return next();
             }).catch(this.onerror);     
        });


    }
}

module.exports = PostsApi; //set what can be imported from this file