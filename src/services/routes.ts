import { Request, Response } from "express";
import { findApartments } from "./ApartmentController";

export default [
    {
        path: "/api/v1/apartments",
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                const results = await findApartments(req);
                res.status(200).send(results);
            },
        ],
    },
];
