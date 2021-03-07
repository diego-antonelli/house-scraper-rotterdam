import { Result } from "../services/providers";
import { Database } from "../database";
import { createTransport } from "nodemailer";

import { config } from "dotenv";
import { HTTP400Error } from "../utils/httpErrors";

config();

interface Recipient {
    email: string;
    maxPrice: number;
    type: "rent" | "sale";
}

const transporter = createTransport({
    host: process.env.SMTP_ADDRESS,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function sendEmail(to: string, apartments: string) {
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
            await transporter.sendMail(mailOptions);
            console.log(`Email successfully sent to ${to}`);
        } catch (e) {
            console.error(`Error sending email to ${to}`, e);
        }
    }
}

export async function notifyUsersByPreference(newApartments: Result[], type: "rent" | "sale") {
    const recipients = (await Database.findMany("recipients", {
        deleted: { $ne: true },
        type,
    })) as Recipient[];
    for (const recipient of recipients) {
        const apartments = newApartments
            .filter((ap) => ap.price <= recipient.maxPrice)
            .sort((a, b) => a.price - b.price)
            .map(
                (apartment) =>
                    `${apartment.title} - ${apartment.price.toLocaleString("nl-NL", {
                        style: "currency",
                        currency: "EUR",
                    })} - ${apartment.url}`,
            )
            .join("\n\n");
        await sendEmail(recipient.email, apartments);
    }
}

export async function notifyUser(newApartments: Result[], email: string): Promise<{ email: string; total: number }> {
    const recipient = (await Database.findOne("recipients", {
        deleted: { $ne: true },
        email,
    })) as Recipient;
    if (!recipient) {
        throw new HTTP400Error();
    }
    const apartments = newApartments
        .filter((ap) => ap.price <= recipient.maxPrice && ap.type === recipient.type)
        .sort((a, b) => a.price - b.price)
        .map(
            (apartment) =>
                `${apartment.title} - ${apartment.price.toLocaleString("nl-NL", {
                    style: "currency",
                    currency: "EUR",
                })} - ${apartment.url}`,
        )
        .join("\n\n");
    await sendEmail(recipient.email, apartments);
    return {
        email,
        total: apartments.length,
    };
}
