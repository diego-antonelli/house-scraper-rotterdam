import {PROVIDERS} from "../services/providers";
import {scrapeWebsite} from "../services/scrapper";
import {Database} from "../database";

export async function importHouses() {
    for (let key in PROVIDERS) {
        try {
            const results = await scrapeWebsite(key, true);
            if (Array.isArray(results)) {
                let newAppartments = 0;
                for (const apartment of results) {
                    const data = await Database.findOne("apartments", {url: apartment.url});
                    if (!data) {
                        await Database.save("apartments", {...apartment, createdAt: new Date()});
                        newAppartments++;
                    }
                }
                console.log(`Job done for ${key}: ${results.length} apartments found and ${newAppartments} new.`);
            }
        } catch (e) {
            console.error(e);
        }
    }
}