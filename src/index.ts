/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as oracledb from 'oracledb';
import { itemsRouter } from "../routes/items.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
 

//config env var and port
dotenv.config();

oracledb.initOracleClient({ libDir: 'D:/instantclient_19_20' });
/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
}
import { assurancesURL, itemsURL, port, success } from "../constants";
import { assuranceRouter } from "../routes/assurances.router";

// Initialize the express engine
const app: express.Application = express();

/**
 *  App Configuration
 */


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(itemsURL, itemsRouter);
app.use(assurancesURL, assuranceRouter);
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(success);
});

