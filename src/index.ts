import {PROVIDERS} from "./services/providers";
import {scrapeWebsite} from "./services/scrapper";
import {Database} from "./database";

(async () => {
    await Database.connect();
    console.log("MONGO: CONNECTED");
    for (let key in PROVIDERS) {
        try {
            const obj = await scrapeWebsite(key, true);
            if (Array.isArray(obj)) {
                let newAppartments = 0;
                await obj.forEach(async apartment => {
                    const data = await Database.findOne("apartments", {url: apartment.url});
                    if (!data) {
                        await Database.save("apartments", apartment);
                        console.log(`New apartment found for ${apartment.provider}`);
                        newAppartments++;
                    }
                });
                console.log(`Job done for ${key}: ${obj.length} apartments found and ${newAppartments} new.`);
            }
        }catch(e){
            console.error(e);
        }
    }
    console.log("CLOSING SESSION");
    await Database.disconnect().catch(_=> {});
    return;
})();