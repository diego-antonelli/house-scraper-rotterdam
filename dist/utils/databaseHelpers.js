"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSort = (key, descending = false) => {
    return {
        [key]: descending ? -1 : 1,
    };
};
