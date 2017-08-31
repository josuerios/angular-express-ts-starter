/**
 * Created by Josue on 30/8/17.
 */
import * as express from "express";
import {json, urlencoded} from "body-parser";
import * as compression from "compression";
import * as path from "path";
import {fourOFour} from "./core/404/404-middleware";
import * as httpStatus from "http-status";


const app: express.Application = express();

app.disable("x-powered-by");

app.use(json());
app.use(compression());
app.use(urlencoded({extended: false}));

// api routes

if (app.get("env") === "production") {
  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, "/../client")));
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
