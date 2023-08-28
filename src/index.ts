/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "../routes/items.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
 

//config env var and port
dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
}
import { itemsURL, port, success } from "../constants";
import { run } from "../connection";

// Initialize the express engine
const app: express.Application = express();

/**
 *  App Configuration
 */

run

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(itemsURL, itemsRouter);
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(success);
});

