import {JSONathomevastgoed, PROVIDERS, Provider, Result, MAX_VAL, CITY} from "./providers";
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
            title: result.street,
            address: result.fullAddress,
            neighborhood: "",
            price: result.ah_price.replace(",00", ""),
            url: result.url
        })));
    } catch (e) {
        reject(e);
    }
}

function filterResultsOoms(results: any): Result[] {
    return results.objects.filter((o: any) => o.office.name === "Rotterdam" && o.is_available && o.buy_or_rent === "rent" && o.value >= 400 && o.value <= MAX_VAL).map((r:any) => ({
        provider: "ooms",
        title: r.place,
        address: r.street_name,
        neighborhood: r.zip_code,
        price: r.value,
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
        console.log(WEBSITE_CONFIG.url);
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
                const $ = cheerio.load(result[0].text);
                if (full) {
                    const results: Set<Result> = new Set<Result>();
                    if (website === "athomevastgoed") {
                        extractResultsFromAtHomeVastgoed($.html(), resolve, reject);
                    } else {
                        $(WEBSITE_CONFIG.filters?.item).each((_, element) => {
                            const title = WEBSITE_CONFIG.filters?.title ? normalizeText($(element).find(WEBSITE_CONFIG.filters.title).text()) : "";
                            const address = WEBSITE_CONFIG.filters?.address ? normalizeText($(element).find(WEBSITE_CONFIG.filters.address).text()) : "";
                            const neighborhood = WEBSITE_CONFIG.filters?.neighborhood ? normalizeText($(element).find(WEBSITE_CONFIG.filters.neighborhood).text()) : "";
                            const price = WEBSITE_CONFIG.filters?.price ? normalizePrice($(element).find(WEBSITE_CONFIG.filters.price).text()) : "";
                            const url = WEBSITE_CONFIG.filters?.url ? $(element).find(WEBSITE_CONFIG.filters.url).attr(WEBSITE_CONFIG.filters?.link ?? 'href') : element.attribs["href"];

                            if(url) {
                                const newPrice = Number(price);
                                if (newPrice > 0 && newPrice <= MAX_VAL) {
                                    results.add({
                                        provider: website as string,
                                        title,
                                        address,
                                        city: CITY,
                                        neighborhood,
                                        price,
                                        url: normalizeUrl(url, WEBSITE_CONFIG) || ""
                                    });
                                }
                            }
                        });
                        if (results.size > 0) {
                            resolve(Array.from(results));
                        } else {
                            reject(`No results for ${website}`)
                        }
                    }
                } else {
                    const url = $(WEBSITE_CONFIG.filters?.url).first().attr(WEBSITE_CONFIG.filters?.link ?? 'href');
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

const normalizeUrl = (url?: string, config?: any): string | undefined => {
    if(url) {
        url = config.config && config.config.urlPrefix ? config.config.urlPrefix + url : url;
        if (!url.startsWith('http')) {
            return undefined;
        }
        return url;
    }
    return undefined;
};

const normalizeText = (text: string): string => {
    return text.trim().replace(/\s+/g, " ");
};

const normalizePrice = (price: string): string => {
    return price.replace(",00", "").replace(/[^0-9]+/g, "");
};