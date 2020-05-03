import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleHelmet,
    handleReferrerPolicy,
    handleRateLimit,
} from "./common";
import { handleAPIDocs } from "./apiDocs";

export default [
    handleHelmet,
    handleReferrerPolicy,
    handleRateLimit,
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleAPIDocs,
];
