'use strict';

let ResponseFormatter = {};


// ResponseFormatter.data('0.1', {"id" : "1234", "message" : "User authenticated", "username": "aquinault", ...});
//
ResponseFormatter.data = (apiVersion, data) => {
    let json = {
        "apiVersion": "0.1",
        "data": data
    };
    return json;
};


// ResponseFormatter.error('0.1', 'Authentication failed', {"domain" : "Auth", "message" : "Username / Password not found"});
//
ResponseFormatter.error = (apiVersion, message, error) => {
    let json = {
        "apiVersion": "0.1",
        "error": {
          //"code": 401,
          "message": message,
          "error": error,
        }
    };
    return json;
};

export default ResponseFormatter;