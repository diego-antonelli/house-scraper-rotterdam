import { Database } from "../database";
import { generateSort } from "../utils/databaseHelpers";
import { Request } from "express";
import { Result } from "./providers";
import { notifyUser, notifyUsersByPreference, sendEmail } from "../cron/notify";

interface RequestBody {
    maxPrice: number;
}

export async function findApartments(req: Request): Promise<Result[]> {
    const { sort, sortOrder } = req.query;
    const { maxPrice } = req.body as RequestBody;
    return await Database.findMany(
        "apartments",
        {
            deleted: { $ne: true },
            price: { $lte: maxPrice ?? 5000 },
        },
        generateSort((sort as string) ?? "price", sortOrder === "desc"),
    );
}

export async function renotifyUser(req: Request): Promise<{ email: string; total: number }> {
    const apartments = await Database.findMany(
        "apartments",
        {
            deleted: { $ne: true },
        },
        generateSort("price"),
    );
    return notifyUser(apartments, req.params.email);
}
