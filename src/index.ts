import {Database} from "./database";
import {importHouses} from "./cron/importHouses";

(async () => {
    await Database.connect();
    console.log("MONGO: CONNECTED");
    await importHouses();
    console.log("JOB DONE");
    await Database.disconnect().catch(_=> {});
    console.log("MONGO: DISCONNECTED");
    return;
})();