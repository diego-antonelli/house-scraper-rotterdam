import { PROVIDERS, Result } from "../services/providers";
import { scrapeWebsite } from "../services/scrapper";
import { Database } from "../database";
import { notifyUsersByPreference } from "./notify";

export async function importHouses() {
    const apartmentsToNotify: Result[] = [];
    for (const key in PROVIDERS) {
        try {
            const results = await scrapeWebsite(key, true);
            if (Array.isArray(results)) {
                let newApartments = 0;
                for (const apartment of results) {
                    const data = await Database.findOne("apartments", { url: apartment.url });
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
    await notifyUsersByPreference(apartmentsToNotify);
}
