import * as express from "express";
import * as cors from "cors";
import {fourOFour} from "../core/404/404-middleware";
import * as httpStatus from "http-status";
import * as methodOverride from "method-override";
import {errorConverter} from "../core/errors/error-converter-middleware";
import axios from "axios";
import chalk from "chalk";
import debug = require('debug');
const axiosLogger = debug('ng-ts-server:requests');

const api: express.Application = express();

const env = process.env.NODE_ENV;

if (env !== 'production') {
  axios.interceptors.request.use((config) => {
    axiosLogger(chalk.green('API request to:'), chalk.cyan(config.method.toUpperCase()), chalk.blue(config.url));
    return config;
  });
}

//enable method-override for old clients
api.use(methodOverride());
// enable CORS - Cross Origin Resource Sharing
api.use(cors());
//api.use(bodyParser.json());
//api.use(bodyParser.urlencoded({extended: true}));


//try to convert all error to common interface
api.use(errorConverter);

api.use((err, req, res, next) => { //eslint-disable-line no-unused-vars
  //log the error and the request as it is.

  const error = {
    message: err.isPublic ? err.message : httpStatus[err.status] || httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
    stack: err.isPublic ? err.stack : undefined,
    code: err.code,
    response: err.response
  };

  res.status(err.status).json(error);
});

api.use(fourOFour);

api.use((req, res) => {
  if (res.statusCode === httpStatus.NOT_FOUND) {
    res.json({message: httpStatus[httpStatus.NOT_FOUND]});
  }
});


export  {api};
