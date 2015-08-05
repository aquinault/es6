'use strict';

// Winston Logger
// ---------------------------------------------------------------
import winston from 'winston';
let logger = new (winston.Logger)({
    transports: [
    new (winston.transports.Console)({ level: 'info', 'colorize': true}),
    new (winston.transports.File)({ name: 'error-file', filename: 'error.log', level: 'error' })
    ]
  });

// Make winston aware of these colors
//
var myCustomLevels = {
	colors: {
	  foo: 'blue',
	  info: 'green',
	  warn: 'yellow',
	  error: 'red'
	}
};

winston.addColors(myCustomLevels.colors);

/*
logger.info("127.0.0.1 - there's no place like home");
logger.warn("127.0.0.1 - there's no place like home");
logger.error("127.0.0.1 - there's no place like home")
*/

export default logger;

  