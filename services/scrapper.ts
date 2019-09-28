import { PROVIDERS } from "./providers";
import cheerio from "cheerio";
import scrapper from 'website-scraper';
import { deleteFolderRecursive } from "./utils";

export const scrapeWebsite = (website: string, full: boolean = false): void => {
    const WEBSITE_CONFIG = PROVIDERS[website];

    let options = {
        urls: [WEBSITE_CONFIG.url],
        sources: [],
        request: {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
                'Connection': 'keep-alive'
            }
        },
        directory: `./websiteSnaps/${website}`,
    };

    deleteFolderRecursive(options.directory);

    scrapper(options).then((result: any) => {
        const content = cheerio.load(result[0].text);
        if(full){
            content(WEBSITE_CONFIG.filters.url).each((_, element) => {
                const url = element.attribs[WEBSITE_CONFIG.filters.link ? WEBSITE_CONFIG.filters.link : 'href'];

                if (url) {
                    const finalUrl = normalizeUrl(url, WEBSITE_CONFIG);
                    if(finalUrl) {
                        console.log(website, finalUrl);
                    }
                } else {
                    console.log(website, "no results");
                }
            });

        }else {
            const url = content(WEBSITE_CONFIG.filters.url).first().attr(WEBSITE_CONFIG.filters.link ? WEBSITE_CONFIG.filters.link : 'href');
            if (url) {
                const finalUrl = normalizeUrl(url, WEBSITE_CONFIG);
                if(finalUrl) {
                    console.log(website, finalUrl);
                }
            } else {
                console.log(website, "no results");
            }
        }
    }).catch((err: any) => {
        console.log(err);
    })
};

const normalizeUrl = (url: string, config: any):string|undefined => {
    url = config.config && config.config.urlPrefix ? config.config.urlPrefix + url : url;
    if(!url.startsWith('http')){
        return undefined;
    }
    return url;
};
