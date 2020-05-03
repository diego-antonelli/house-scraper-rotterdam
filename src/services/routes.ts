import { Request, Response } from "express";

export default [
    {
        path: "/api/v1/apartments",
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                // const result = await login(body as LoginRequest, res);
                res.status(200).send({});
            },
        ],
    },
];
