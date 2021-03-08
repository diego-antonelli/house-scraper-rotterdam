import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import routes from "./services/routes";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import { Database } from "./database";
import { schedule } from "node-cron";
import { importHouses } from "./cron/importHouses";
import { config } from "dotenv";

config();

process.on("uncaughtException", (e) => {
    console.log(e);
    process.exit(1);
});
process.on("unhandledRejection", (e) => {
    console.log(e);
    process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000 } = process.env;
const server = http.createServer(router);

(async () => {
    await Database.connect();

    const taskRent = schedule("6 6,10,14,18,22 * * *", async () => {
        console.log("JOB: Running automatic hourly import for rents");
        await importHouses("rent");
        console.log("JOB: DONE");
    });
    const taskSale = schedule("3 6,10,14,18,22 * * *", async () => {
        console.log("JOB: Running automatic hourly import for sales");
        await importHouses("sale");
        console.log("JOB: DONE");
    });

    server.listen(PORT, () => {
        taskRent.start();
        taskSale.start();
        console.log(`Server is running http://localhost:${PORT}...`);
    });

    process.on("exit", async () => {
        await Database.disconnect();
        taskRent.stop();
        taskSale.stop();
        console.log("SERVER DISCONNECTED");
    });
})();
