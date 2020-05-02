import {scrapeWebsite} from "../src/services/scrapper";
import { PROVIDERS } from "../src/services/providers";

for (let key in PROVIDERS) {
    scrapeWebsite(key, true).then(obj => {
        if(Array.isArray(obj)){
            obj.map(r =>  console.log(r.provider, r.url))
        }else {
            console.log(obj.provider, obj.url)
        }
    }).catch(e => console.error(e));
}
