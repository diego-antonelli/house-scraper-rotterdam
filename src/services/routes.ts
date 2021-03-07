import { Request, Response } from "express";
import { findApartments } from "./apartment.service";
import { importHouses } from "../cron/importHouses";
import { sendEmail } from "../cron/notify";

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
        path: "/api/v1/import-rent",
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                const newApartments = await importHouses("rent");
                res.status(200).send(newApartments);
            },
        ],
    },
    {
        path: "/api/v1/import-sale",
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                const newApartments = await importHouses("sale");
                res.status(200).send(newApartments);
            },
        ],
    },
    {
        path: "/api/v1/test-email/:email",
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                const newApartments = await sendEmail(req.params.email, "Test");
                res.status(200).send(newApartments);
            },
        ],
    },
];
