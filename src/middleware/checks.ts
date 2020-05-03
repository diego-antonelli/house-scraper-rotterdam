import { Request, Response, NextFunction } from "express";
import { HTTP400Error, HTTP401Error, HTTP403Error } from "../utils/httpErrors";
import { extractProfile, isRoleManagement } from "../services/profile/ProfileController";
import { GrantEnum } from "../models/generic";

export const checkLoginBody = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email || !req.body.password) {
        throw new HTTP400Error("Missing email or password parameter");
    } else {
        next();
    }
};

export const checkHeader = (req: Request, res: Response, next: NextFunction) => {
    if (!req.header("sprey-api-key")) {
        throw new HTTP400Error("Missing API Key");
    } else {
        next();
    }
};

export const checkRoleManagement = async (req: Request, res: Response, next: NextFunction) => {
    const profile = await extractProfile(req);
    if (!isRoleManagement(profile)) {
        throw new HTTP403Error();
    } else {
        next();
    }
};
