"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const routes_1 = __importDefault(require("./services/routes"));
const middleware_1 = __importDefault(require("./middleware"));
const errorHandlers_1 = __importDefault(require("./middleware/errorHandlers"));
const database_1 = require("./database");
const node_cron_1 = require("node-cron");
const importHouses_1 = require("./cron/importHouses");
const dotenv_1 = require("dotenv");
dotenv_1.config();
process.on("uncaughtException", (e) => {
    console.log(e);
    process.exit(1);
});
process.on("unhandledRejection", (e) => {
    console.log(e);
    process.exit(1);
});
const router = express_1.default();
utils_1.applyMiddleware(middleware_1.default, router);
utils_1.applyRoutes(routes_1.default, router);
utils_1.applyMiddleware(errorHandlers_1.default, router);
const { PORT = 3000 } = process.env;
const server = http_1.default.createServer(router);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.Database.connect();
    const task = node_cron_1.schedule("0 6,8,10,12,14,16,18,20,22 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("JOB: Running automatic hourly import");
        yield importHouses_1.importHouses();
        console.log("JOB: DONE");
    }));
    server.listen(PORT, () => {
        task.start();
        console.log(`Server is running http://localhost:${PORT}...`);
    });
    process.on("exit", () => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.Database.disconnect();
        task.stop();
        console.log("SERVER DISCONNECTED");
    }));
}))();
