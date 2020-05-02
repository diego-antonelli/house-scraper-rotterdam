import {JSONathomevastgoed, PROVIDERS, Provider, Result, MAX_VAL} from "./providers";
import cheerio from "cheerio";
import scrapper from 'website-scraper';
import {deleteFolderRecursive} from "./utils";
import fetch from "node-fetch";

function extractResultsFromAtHomeVastgoed(html: string, resolve: (value: any) => void, reject: (error: Error) => void) {
    try {
        const matchString = "'SET_PROPERTIES_COLLECTION', ";
        const initialIndex = html.indexOf(matchString) + matchString.length;
        const initialPoint = html.substring(initialIndex);
        const finalIndex = initialIndex + initialPoint.indexOf(".data)");
        const json = html.substring(initialIndex, finalIndex) as any;
        const data = JSON.parse(json).data as JSONathomevastgoed[];
        resolve(data.map(result => ({
            provider: "athomevastgoed",
            url: result.url
        })));
    } catch (e) {
        reject(e);
    }
}

function filterResultsOoms(results: any): Result[] {
    return results.objects.filter((o: any) => o.office.name === "Rotterdam" && o.buy_or_rent === "rent" && o.value <= MAX_VAL).map((r:any) => ({
        provider: "ooms",
        url: r.url
    }));
}

export const scrapeWebsite = (website: keyof Provider, full: boolean = false): Promise<Result | Result[]> => {
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

    return new Promise<any>(async (resolve, reject) => {
        if (WEBSITE_CONFIG.type === "REST") {
            const r = await fetch(WEBSITE_CONFIG.url);
            const results = await r.json();
            if(website === "ooms"){
                resolve(filterResultsOoms(results));
            }else{
                resolve(results);
            }
        } else {
            scrapper(options).then((result: any) => {
                const content = cheerio.load(result[0].text);
                if (full) {
                    const results: Set<Result> = new Set<Result>();
                    if (website === "athomevastgoed") {
                        extractResultsFromAtHomeVastgoed(content.html(), resolve, reject);
                    } else {
                        content(WEBSITE_CONFIG.filters?.url).each((_, element) => {
                            const url = element.attribs[WEBSITE_CONFIG.filters?.link ?? 'href'];

                            if (url) {
                                const finalUrl = normalizeUrl(url, WEBSITE_CONFIG);
                                if (finalUrl) {
                                    results.add({
                                        provider: website as string,
                                        url: finalUrl
                                    });
                                }
                            } else {
                                reject(new Error(`${website}: no results`));
                            }
                        });
                        if (results.size > 0) {
                            resolve(Array.from(results));
                        } else {
                            reject(`No results for ${website}`)
                        }
                    }
                } else {
                    const url = content(WEBSITE_CONFIG.filters?.url).first().attr(WEBSITE_CONFIG.filters?.link ?? 'href');
                    if (url) {
                        const finalUrl = normalizeUrl(url, WEBSITE_CONFIG);
                        if (finalUrl) {
                            resolve({
                                provider: website,
                                url: finalUrl
                            });
                        }
                    } else {
                        reject(new Error(`${website}: no results`));
                    }
                }
            }).catch((err: any) => {
                reject(err);
            })
        }
    });
};

const normalizeUrl = (url: string, config: any): string | undefined => {
    if(url) {
        url = config.config && config.config.urlPrefix ? config.config.urlPrefix + url : url;
        if (!url.startsWith('http')) {
            return undefined;
        }
        return url;
    }
    return undefined;
};
