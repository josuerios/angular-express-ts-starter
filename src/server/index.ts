/**
 * Created by Josue on 30/8/17.
 */
import * as express from "express";
import * as compression from "compression";
import {fourOFour} from "./core/404/404-middleware";
import * as httpStatus from "http-status";
import * as morgan from "morgan";

const env = process.env.NODE_ENV;
const app: express.Application = express();

// logs to console minimal information
// :method :url :statusCode :time :content length
if (env === 'development') {
  app.use(morgan('dev'));
}

app.disable("x-powered-by");

app.use(compression());
// api routes

if (env !== "development") {
  // in production mode use app application
  app.use('/', require('./app'));
}


app.use(fourOFour);
app.use((req: express.Request, res: express.Response) => {
  if (res.statusCode === httpStatus.NOT_FOUND) {
    res.json({message: httpStatus[httpStatus.NOT_FOUND]});
  }
});


// production error handler
// no stacktrace leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {


  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message,
  });
  console.error(err);
});

export {app};


