import restify from 'restify';
import co from 'co';
import userController from '../controllers/usersController'
class UsersApi{
    constructor(server){
        this.name = 'Users API!';
        console.log("Init", this.name); //this == the object instance.
        this.init(server);
    }
    onerror(err) {
        console.error(err.stack);
    }
    init(server){

        // Get Users
        server.get('/auth/users/', (req, res, next) => {
            co(function *(){
                userController.list(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        // Get User by id
        server.get('/auth/users/byId/:id', (req, res, next) => {
            co(function *(){
                userController.getById(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        // Get User by username
        server.get('/auth/users/byUsername/:username', (req, res, next) => {
            co(function *(){
                userController.getByUsername(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        // Create admin user
        server.post('/auth/setup/', (req, res, next) => {
            co(function *(){
                req.body = {};
                req.body.username = 'admin';
                req.body.password = 'admin';
                req.body.email = 'admin@admin.fr';
                req.body.admin = true; // Admin privilege
                userController.create(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        // Create user
        server.post('/auth/user/', (req, res, next) => {
            co(function *(){
                req.body.admin = false; // User privilege
                userController.create(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        // Delete user
        server.del('/auth/user/:id', (req, res, next) => {
            co(function *(){
                userController.remove(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        // Update User
        server.put('/auth/users/:id', (req, res, next) => {
            co(function *(){
                userController.update(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

        // Login User
        server.post('/auth/login/', (req, res, next) => {
            co(function *(){
                userController.get(req, res, next);
                return next();
             }).catch(this.onerror);     
        });

    }
}

module.exports = UsersApi; //set what can be imported from this file