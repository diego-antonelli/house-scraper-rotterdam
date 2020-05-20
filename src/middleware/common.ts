import { Router } from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

export const handleCors = (router: Router) => router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
    router.use(parser.urlencoded({ extended: true }));
    router.use(parser.json());
};

export const handleCompression = (router: Router) => {
    router.use(compression());
};

export const handleHelmet = (router: Router) => {
    router.use(helmet());
};

export const handleReferrerPolicy = (router: Router) => {
    router.use(helmet.referrerPolicy({ policy: "no-referrer" }));
};

export const handleRateLimit = (router: Router) => {
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        message: "Too many requests from this IP, please try again after an 15 minutes",
    });
    router.use(limiter);
};
