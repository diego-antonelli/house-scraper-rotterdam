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
const database_1 = require("../database");
const nodemailer_1 = require("nodemailer");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const transporter = nodemailer_1.createTransport({
    host: process.env.SMTP_ADDRESS,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});
function sendEmail(to, apartments) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to,
            subject: "[Scraper] New apartments found in Rotterdam",
            text: `Here are the new findings:
        
${apartments}
        
Regards
The scraper`,
        };
        if (apartments) {
            try {
                yield transporter.sendMail(mailOptions);
                console.log(`Email successfully sent to ${to}`);
            }
            catch (e) {
                console.error(`Error sending email to ${to}`, e);
            }
        }
    });
}
exports.sendEmail = sendEmail;
function notifyUsersByPreference(newApartments) {
    return __awaiter(this, void 0, void 0, function* () {
        const recipients = (yield database_1.Database.findMany("recipients", { deleted: { $ne: true } }));
        for (const recipient of recipients) {
            const apartments = newApartments
                .filter((ap) => ap.price <= recipient.maxPrice)
                .sort((a, b) => a.price - b.price)
                .map((apartment) => `${apartment.title} - ${apartment.price.toLocaleString("nl-NL", {
                style: "currency",
                currency: "EUR",
            })} - ${apartment.url}`)
                .join("\n\n");
            yield sendEmail(recipient.email, apartments);
        }
    });
}
exports.notifyUsersByPreference = notifyUsersByPreference;
