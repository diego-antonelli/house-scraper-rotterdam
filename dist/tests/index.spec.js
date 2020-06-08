"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scrapper_1 = require("../services/scrapper");
const providers_1 = require("../services/providers");
for (const key in providers_1.PROVIDERS) {
    scrapper_1.scrapeWebsite(key, true)
        .then((obj) => {
        if (Array.isArray(obj)) {
            obj.map((r) => console.log(r));
        }
        else {
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
