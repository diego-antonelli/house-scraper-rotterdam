import { Result } from "../services/providers";
import { Database } from "../database";
import { createTransport } from "nodemailer";

import { config } from "dotenv";

config();

interface Recipient {
    email: string;
    maxPrice: number;
}

const transporter = createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

async function sendEmail(to: string, apartments: string) {
    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to,
        subject: "[Scraper] New apartments found in Rotterdam",
        text: `Here are the new findings:
        
${apartments}
        
Regards
The scraper`,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent to ${to}`);
    } catch (e) {
        console.error(`Error sending email to ${to}`, e);
    }
}

export async function notifyUsersByPreference(newApartments: Result[]) {
    const recipients = (await Database.findMany("recipients", { deleted: { $ne: true } })) as Recipient[];
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
