import { Database } from "../database";
import { generateSort } from "../utils/databaseHelpers";
import { Request } from "express";
import { Result } from "./providers";

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
