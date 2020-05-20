import { JSONathomevastgoed, PROVIDERS, Provider, Result, CITY, MIN_PRICE } from "./providers";
import cheerio from "cheerio";
import scrapper from "website-scraper";
import { deleteFolderRecursive } from "./utils";
import fetch from "node-fetch";

function normalizeUrl(url?: string, config?: any): string | undefined {
    if (url) {
        url = config.config && config.config.urlPrefix ? config.config.urlPrefix + url : url;
        if (!url.startsWith("http")) {
            return undefined;
        }
        return url;
    }
    return undefined;
}

function normalizeImageUrl(url?: string, config?: any): string | undefined {
    if (url) {
        if (url.indexOf("background-image") !== -1) {
            url = url.substr(url.indexOf("http"));
            url = url.replace(");", "");
        }
        if (!url.startsWith("http")) {
            url = config.config && config.config.urlPrefixImage ? config.config.urlPrefixImage + url : url;

            if (!url.startsWith("http")) {
                return undefined;
            }
        }
        return url;
    }
    return undefined;
}

function normalizeText(text: string): string {
    return text.trim().replace(/\s+/g, " ");
}

function normalizePrice(price: string, website: string): string {
    if (website === "maashave") {
        price = price.replace(",00", "");
    }
    price = price.replace(",00 ", "").replace(/[^0-9]+/g, "");
    return price;
}

function extractResultsFromAtHomeVastgoed(html: string, resolve: (value: any) => void, reject: (error: Error) => void) {
    try {
        const matchString = "'SET_PROPERTIES_COLLECTION', ";
        const initialIndex = html.indexOf(matchString) + matchString.length;
        const initialPoint = html.substring(initialIndex);
        const finalIndex = initialIndex + initialPoint.indexOf(".data)");
        const json = html.substring(initialIndex, finalIndex) as any;
        const data = JSON.parse(json).data as JSONathomevastgoed[];
        resolve(
            data.map((result) => ({
                provider: "athomevastgoed",
                title: result.street,
                address: result.fullAddress,
                neighborhood: "",
                price: result.ah_price.replace(",00", ""),
                url: result.url,
                images: [result.listingMainPhoto],
            })),
        );
    } catch (e) {
        reject(e);
    }
}

function filterResultsOoms(results: any): Result[] {
    return results.objects
        .filter(
            (o: any) =>
                o.office.name === "Rotterdam" && o.is_available && o.buy_or_rent === "rent" && o.value >= MIN_PRICE,
        )
        .map((r: any) => ({
            provider: "ooms",
            title: r.place,
            address: r.street_name,
            neighborhood: r.zip_code,
            price: r.value,
            url: r.url,
            images: r.realworks_main_images.map(
                (img: any) => `https://ooms.com${img.sizes[Object.keys(img.sizes)[0]]}`,
            ),
        }));
}

export function scrapeWebsite(website: keyof Provider, full = false): Promise<Result | Result[]> {
    const WEBSITE_CONFIG = PROVIDERS[website];

    const options = {
        urls: [WEBSITE_CONFIG.url],
        sources: [],
        request: {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36",
                Connection: "keep-alive",
            },
        },
        directory: `./websiteSnaps/${website}`,
    };

    deleteFolderRecursive(options.directory);

    return new Promise<any>(async (resolve, reject) => {
        if (WEBSITE_CONFIG.type === "REST") {
            const r = await fetch(WEBSITE_CONFIG.url);
            const results = await r.json();
            if (website === "ooms") {
                resolve(filterResultsOoms(results));
            } else {
                resolve(results);
            }
        } else {
            scrapper(options)
                .then((result: any) => {
                    console.log(`IMPORT APARTMENTS FROM ${website}`);
                    const $ = cheerio.load(result[0].text, website === "pararius" ? { xmlMode: true } : {});
                    if (full) {
                        const results: Set<Result> = new Set<Result>();
                        if (website === "athomevastgoed") {
                            extractResultsFromAtHomeVastgoed($.html(), resolve, reject);
                        } else {
                            $(WEBSITE_CONFIG.filters?.item).each((_, element) => {
                                const title = WEBSITE_CONFIG.filters?.title
                                    ? normalizeText($(element).find(WEBSITE_CONFIG.filters.title).text())
                                    : "";
                                const address = WEBSITE_CONFIG.filters?.address
                                    ? normalizeText($(element).find(WEBSITE_CONFIG.filters.address).text())
                                    : "";
                                const neighborhood = WEBSITE_CONFIG.filters?.neighborhood
                                    ? normalizeText($(element).find(WEBSITE_CONFIG.filters.neighborhood).text())
                                    : "";
                                const price = WEBSITE_CONFIG.filters?.price
                                    ? normalizePrice(
                                          $(element).find(WEBSITE_CONFIG.filters.price).text(),
                                          website as string,
                                      )
                                    : "";
                                const url = WEBSITE_CONFIG.filters?.url
                                    ? $(element)
                                          .find(WEBSITE_CONFIG.filters.url)
                                          .attr(WEBSITE_CONFIG.filters?.link ?? "href")
                                    : element.attribs["href"];
                                const images: string[] = [];
                                if (WEBSITE_CONFIG.filters?.images) {
                                    $(element)
                                        .find(WEBSITE_CONFIG.filters.images)
                                        .each((_, imgElement) => {
                                            if (WEBSITE_CONFIG.config?.imageAttr) {
                                                const url = normalizeImageUrl(
                                                    imgElement.attribs[WEBSITE_CONFIG.config.imageAttr] ??
                                                        imgElement.attribs["src"],
                                                    WEBSITE_CONFIG,
                                                );
                                                if (url) {
                                                    images.push(url);
                                                }
                                            } else {
                                                const url = normalizeImageUrl(
                                                    imgElement.attribs["src"],
                                                    WEBSITE_CONFIG,
                                                );
                                                if (url) {
                                                    images.push(url);
                                                }
                                            }
                                        });
                                }

                                if (url) {
                                    const newPrice = Number(price);
                                    if (newPrice >= MIN_PRICE) {
                                        results.add({
                                            provider: website as string,
                                            title,
                                            address,
                                            city: CITY,
                                            neighborhood,
                                            price: newPrice,
                                            images,
                                            url: normalizeUrl(url, WEBSITE_CONFIG) || "",
                                        });
                                    }
                                }
                            });
                            if (results.size > 0) {
                                resolve(Array.from(results));
                            } else {
                                reject(`No results for ${website}`);
                            }
                        }
                    } else {
                        const url = $(WEBSITE_CONFIG.filters?.url)
                            .first()
                            .attr(WEBSITE_CONFIG.filters?.link ?? "href");
                        if (url) {
                            const finalUrl = normalizeUrl(url, WEBSITE_CONFIG);
                            if (finalUrl) {
                                resolve({
                                    provider: website,
                                    url: finalUrl,
                                });
                            }
                        } else {
                            reject(new Error(`${website}: no results`));
                        }
                    }
                })
                .catch((err: any) => {
                    reject(err);
                });
        }
    });
}
