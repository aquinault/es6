import restify from 'restify';
import co from 'co';
import config from '../conf/config';

let jwttoken = require('jsonwebtoken');
let jwt = require('restify-jwt');

class TokenApi{
    constructor(server){
        this.name = 'Token API!';
        console.log("Init", this.name); //this == the object instance.
        this.init(server);
    }
    onerror(err) {
        console.error(err.stack);
    }
    init(server){
        // Verify and Decode Token
        server.post('/auth/token/decode/', (req, res) => {
            let secret = config.secret;
            let decoded = jwttoken.decode(req.body.token, {complete: true});
            //console.log(decoded);
            res.send(decoded);
            
            return next();
        });

        // Decode Token
        server.post('/auth/token/verify/', (req, res) => {
            let secret = config.secret;
            let decoded = jwttoken.verify(req.body.token, secret, (err, decoded) => {
                if(err) {
                    console.log('Token invalid');
                    res.send(422, err);
                } else {
                    console.log('Token valid');
                    //console.log(decoded);
                    res.send(decoded);
                    return next();  
                }
            }); 
        });


        /*
        server.get('/token', (req, res) => {
            var secret = 'shhhhhhared-secret';
            var token = jwttoken.sign({foo: 'bar', admin: true}, secret);

            res.send(token);
            return next();
          });
        */

        server.get('/protected', jwt({secret: config.secret}), function(req, res) {
            /* req.headers.authorization = 'Bearer ' + token;*/
            console.log(req.user);
            res.send(req.user);
            /*if (!req.user.admin) return res.send(401);
            res.send(200);*/
          });



    }
}

module.exports = TokenApi; //set what can be imported from this file