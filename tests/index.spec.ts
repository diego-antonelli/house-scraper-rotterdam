import { scrapeWebsite } from "../services/scrapper";
import { PROVIDERS } from "../services/providers";

for (let key in PROVIDERS) {
    scrapeWebsite(key, true);
}

// scrapeWebsite("immobilia");
