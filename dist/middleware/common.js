"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.handleCors = (router) => router.use(cors_1.default({ credentials: true, origin: true }));
exports.handleBodyRequestParsing = (router) => {
    router.use(body_parser_1.default.urlencoded({ extended: true }));
    router.use(body_parser_1.default.json());
};
exports.handleCompression = (router) => {
    router.use(compression_1.default());
};
exports.handleHelmet = (router) => {
    router.use(helmet_1.default());
};
exports.handleReferrerPolicy = (router) => {
    router.use(helmet_1.default.referrerPolicy({ policy: "no-referrer" }));
};
exports.handleRateLimit = (router) => {
    const limiter = express_rate_limit_1.default({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: "Too many requests from this IP, please try again after an 15 minutes",
    });
    router.use(limiter);
};
