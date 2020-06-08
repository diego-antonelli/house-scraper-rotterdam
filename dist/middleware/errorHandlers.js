"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler_1 = require("../utils/ErrorHandler");
const handle404Error = (router) => {
    router.use((req, res) => {
        ErrorHandler_1.notFoundError(req);
    });
};
const handleClientError = (router) => {
    router.use((err, req, res, next) => {
        ErrorHandler_1.clientError(err, res, next);
    });
};
const handleServerError = (router) => {
    router.use((err, req, res, next) => {
        ErrorHandler_1.serverError(err, res, next);
    });
};
exports.default = [handle404Error, handleClientError, handleServerError];
