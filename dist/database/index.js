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
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Database {
}
exports.Database = Database;
Database.connect = () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.MONGO_URI && process.env.DATABASE) {
        try {
            const client = yield mongodb_1.MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true });
            Database.client = client;
            Database.db = client.db(process.env.DATABASE);
        }
        catch (e) {
            throw new mongodb_1.MongoError(e.message);
        }
    }
    else {
        throw new mongodb_1.MongoError("Mongo URI not found, please add to the environment variables");
    }
});
Database.save = (collection, toSaveObject) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Database.client.isConnected())
        throw new mongodb_1.MongoError("Mongo is disconnected");
    try {
        return yield Database.db.collection(collection).insertOne(toSaveObject);
    }
    catch (e) {
        throw new mongodb_1.MongoError("Error saving object. Technical error: " + e.message);
    }
});
Database.update = (collection, filter, toUpdateObject) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Database.client.isConnected())
        throw new mongodb_1.MongoError("Mongo is disconnected");
    try {
        return yield Database.db.collection(collection).updateOne(filter, { $set: toUpdateObject });
    }
    catch (e) {
        throw new mongodb_1.MongoError("Error saving object. Technical error: " + e.message);
    }
});
Database.updateCustom = (collection, filter, toUpdate, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Database.client.isConnected())
        throw new mongodb_1.MongoError("Mongo is disconnected");
    try {
        return yield Database.db.collection(collection).updateOne(filter, toUpdate, options);
    }
    catch (e) {
        throw new mongodb_1.MongoError("Error saving object. Technical error: " + e.message);
    }
});
Database.findOne = (collection, filter) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Database.client.isConnected())
        throw new mongodb_1.MongoError("Mongo is disconnected");
    return yield Database.db.collection(collection).findOne(filter);
});
Database.findMany = (collection, filter, sort) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Database.client.isConnected())
        throw new mongodb_1.MongoError("Mongo is disconnected");
    return yield Database.db.collection(collection).find(filter).sort(sort).toArray();
});
Database.findAggregate = (collection, filter) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Database.client.isConnected())
        throw new mongodb_1.MongoError("Mongo is disconnected");
    return yield Database.db.collection(collection).aggregate([filter]).toArray();
});
Database.disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Database.client.close();
});
