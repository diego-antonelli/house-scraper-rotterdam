import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleHelmet,
    handleReferrerPolicy,
    handleRateLimit,
} from "./common";

export default [
    handleHelmet,
    handleReferrerPolicy,
    handleRateLimit,
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
];
