import {PROVIDERS} from "./services/providers";
import {scrapeWebsite} from "./services/scrapper";
import {Database} from "./database";

(async () => {
    await Database.connect();
    console.log("MONGO: CONNECTED");
    for (let key in PROVIDERS) {
        try {
            const results = await scrapeWebsite(key, true);
            if (Array.isArray(results)) {
                let newAppartments = 0;
                for(const apartment of results){
                    const data = await Database.findOne("apartments", {url: apartment.url});
                    if (!data) {
                        await Database.save("apartments", {...apartment, createdAt: new Date(), read: false});
                        console.log(`New apartment found for ${apartment.provider}`);
                        newAppartments++;
                    }else{
                        console.log("Data", data);
                    }
                };
                console.log(`Job done for ${key}: ${results.length} apartments found and ${newAppartments} new.`);
            }
        }catch(e){
            console.error(e);
        }
    }
    console.log("JOB DONE");
    await Database.disconnect().catch(_=> {});
    console.log("MONGO: DISCONNECTED");
    return;
})();