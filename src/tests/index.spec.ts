import { scrapeWebsite } from "../services/scrapper";
import { PROVIDERS } from "../services/providers";

for (const key in PROVIDERS) {
    scrapeWebsite(key, true)
        .then((obj) => {
            if (Array.isArray(obj)) {
                obj.map((r) => console.log(r));
            } else {
                console.log(obj.provider, obj.url);
            }
        })
        .catch((e) => console.error(e));
}
//
// scrapeWebsite("pararius", true).then(obj => {
//     if(Array.isArray(obj)){
//         obj.map(r =>  console.log(r.price))
//     }else {
//         console.log(obj.provider, obj.url)
//     }
// }).catch(e => console.error(e));
