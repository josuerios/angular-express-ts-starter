/**
 * Created by Josue on 31/8/17.
 */
'use strict';
import * as express from "express";
import * as httpStatus from "http-status";
import * as path from "path";
import {fourOFour} from "../core/404/404-middleware";


const app: express.Application = express();

//Mount especific app routes
app.use('/', express.static(path.join(__dirname, '../../dist')));

app.use(fourOFour);

app.use((req, res) => {
  if (res.statusCode === httpStatus.NOT_FOUND) {
    res.render('error', {code: res.statusCode});
  }
});


export {app} ;
