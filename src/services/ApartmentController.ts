import { Database } from "../database";
import { generateSort } from "../utils/databaseHelpers";
import { Request } from "express";
import { Result } from "./providers";

interface RequestBody {
    maxPrice: number;
}

export async function findApartments(req: Request): Promise<Result[]> {
    const { sort, sortOrder } = req.params;
    const { maxPrice } = req.body as RequestBody;
    return await Database.findMany(
        "apartments",
        {
            deleted: { $ne: true },
            price: { $le: maxPrice },
        },
        generateSort(sort ?? "price", sortOrder === "desc"),
    );
}
