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
Object.defineProperty(exports, "__esModule", { value: true });
const ApartmentController_1 = require("./ApartmentController");
const importHouses_1 = require("../cron/importHouses");
const notify_1 = require("../cron/notify");
exports.default = [
    {
        path: "/api/v1/apartments",
        method: "get",
        handler: [
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                const results = yield ApartmentController_1.findApartments(req);
                res.status(200).send(results);
            }),
        ],
    },
    {
        path: "/api/v1/import",
        method: "get",
        handler: [
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                const newApartments = yield importHouses_1.importHouses();
                res.status(200).send(newApartments);
            }),
        ],
    },
    {
        path: "/api/v1/test-email/:email",
        method: "get",
        handler: [
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                const newApartments = yield notify_1.sendEmail(req.params.email, "Test");
                res.status(200).send(newApartments);
            }),
        ],
    },
];
