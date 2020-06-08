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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const databaseHelpers_1 = require("../utils/databaseHelpers");
function findApartments(req) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { sort, sortOrder } = req.query;
        const { maxPrice } = req.body;
        return yield database_1.Database.findMany("apartments", {
            deleted: { $ne: true },
            price: { $lte: maxPrice !== null && maxPrice !== void 0 ? maxPrice : 5000 },
        }, databaseHelpers_1.generateSort((_a = sort) !== null && _a !== void 0 ? _a : "price", sortOrder === "desc"));
    });
}
exports.findApartments = findApartments;
