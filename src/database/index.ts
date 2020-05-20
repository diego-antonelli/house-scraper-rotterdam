import { Db, MongoClient, MongoError, UpdateOneOptions } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export class Database {
    public static db: Db;
    public static client: MongoClient;

    public static connect = async () => {
        if (process.env.MONGO_URI && process.env.DATABASE) {
            try {
                const client = await MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true });
                Database.client = client;
                Database.db = client.db(process.env.DATABASE);
            } catch (e) {
                throw new MongoError(e.message);
            }
        } else {
            throw new MongoError("Mongo URI not found, please add to the environment variables");
        }
    };

    public static save = async (collection: string, toSaveObject: any) => {
        if (!Database.client.isConnected()) throw new MongoError("Mongo is disconnected");
        try {
            return await Database.db.collection(collection).insertOne(toSaveObject);
        } catch (e) {
            throw new MongoError("Error saving object. Technical error: " + e.message);
        }
    };

    public static update = async (collection: string, filter: any, toUpdateObject: any) => {
        if (!Database.client.isConnected()) throw new MongoError("Mongo is disconnected");
        try {
            return await Database.db.collection(collection).updateOne(filter, { $set: toUpdateObject });
        } catch (e) {
            throw new MongoError("Error saving object. Technical error: " + e.message);
        }
    };

    public static updateCustom = async (collection: string, filter: any, toUpdate: any, options?: UpdateOneOptions) => {
        if (!Database.client.isConnected()) throw new MongoError("Mongo is disconnected");
        try {
            return await Database.db.collection(collection).updateOne(filter, toUpdate, options);
        } catch (e) {
            throw new MongoError("Error saving object. Technical error: " + e.message);
        }
    };

    public static findOne = async (collection: string, filter: any) => {
        if (!Database.client.isConnected()) throw new MongoError("Mongo is disconnected");
        return await Database.db.collection(collection).findOne(filter);
    };

    public static findMany = async (collection: string, filter: any, sort?: any) => {
        if (!Database.client.isConnected()) throw new MongoError("Mongo is disconnected");
        return await Database.db.collection(collection).find(filter).sort(sort).toArray();
    };

    public static findAggregate = async (collection: string, filter: any) => {
        if (!Database.client.isConnected()) throw new MongoError("Mongo is disconnected");
        return await Database.db.collection(collection).aggregate([filter]).toArray();
    };

    public static disconnect = async () => {
        return await Database.client.close();
    };
}
