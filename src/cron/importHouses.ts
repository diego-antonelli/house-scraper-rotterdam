import { PROVIDERS, Result } from "../services/providers";
import { scrapeWebsite } from "../services/scrapper";
import { Database } from "../database";
import { notifyUsersByPreference } from "./notify";

export async function importHouses(type: "sale" | "rent"): Promise<Result[]> {
    const apartmentsToNotify: Result[] = [];
    for (const key in PROVIDERS) {
        try {
            const results = await scrapeWebsite(key, true, type === "sale");
            if (Array.isArray(results)) {
                let newApartments = 0;
                for (const apartment of results) {
                    const data = await Database.findOne("apartments", { url: apartment.url, type });
                    if (!data) {
                        await Database.save("apartments", { ...apartment, createdAt: new Date() });
                        newApartments++;
                        apartmentsToNotify.push(apartment);
                    }
                }
                console.log(`Job done for ${key}: ${results.length} apartments found and ${newApartments} new.`);
            }
        } catch (e) {
            console.error(e);
        }
    }
    await notifyUsersByPreference(apartmentsToNotify, type);
    return apartmentsToNotify;
}
