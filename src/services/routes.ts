import { Request, Response } from "express";
import { findApartments } from "./ApartmentController";
import {importHouses} from "../cron/importHouses";

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

    {
        path: "/api/v1/imports",
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                const newApartments = await importHouses();
                res.status(200).send(newApartments);
            },
        ],
    },
];
