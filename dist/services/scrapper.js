"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const providers_1 = require("./providers");
const cheerio_1 = __importDefault(require("cheerio"));
const website_scraper_1 = __importDefault(require("website-scraper"));
const utils_1 = require("./utils");
const node_fetch_1 = __importDefault(require("node-fetch"));
function normalizeUrl(url, config) {
    if (url) {
        url = config.config && config.config.urlPrefix ? config.config.urlPrefix + url : url;
        if (!url.startsWith("http")) {
            return undefined;
        }
        return url;
    }
    return undefined;
}
function normalizeImageUrl(url, config) {
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
function normalizeText(text) {
    return text.trim().replace(/\s+/g, " ");
}
function normalizePrice(price, website) {
    if (website === "maashave") {
        price = price.replace(",00", "");
    }
    price = price.replace(",00 ", "").replace(/[^0-9]+/g, "");
    return price;
}
function extractResultsFromAtHomeVastgoed(html, resolve, reject) {
    try {
        const matchString = "'SET_PROPERTIES_COLLECTION', ";
        const initialIndex = html.indexOf(matchString) + matchString.length;
        const initialPoint = html.substring(initialIndex);
        const finalIndex = initialIndex + initialPoint.indexOf(".data)");
        const json = html.substring(initialIndex, finalIndex);
        const data = JSON.parse(json).data;
        resolve(data.map((result) => ({
            provider: "athomevastgoed",
            title: result.street,
            address: result.fullAddress,
            neighborhood: "",
            price: result.ah_price.replace(",00", ""),
            url: result.url,
            images: [result.listingMainPhoto],
        })));
    }
    catch (e) {
        reject(e);
    }
}
function filterResultsOoms(results) {
    return results.objects
        .filter((o) => o.office.name === "Rotterdam" && o.is_available && o.buy_or_rent === "rent" && o.value >= providers_1.MIN_PRICE)
        .map((r) => ({
        provider: "ooms",
        title: r.place,
        address: r.street_name,
        neighborhood: r.zip_code,
        price: r.value,
        url: r.url,
        images: r.realworks_main_images.map((img) => `https://ooms.com${img.sizes[Object.keys(img.sizes)[0]]}`),
    }));
}
function scrapeWebsite(website, full = false) {
    const WEBSITE_CONFIG = providers_1.PROVIDERS[website];
    const options = {
        urls: [WEBSITE_CONFIG.url],
        sources: [],
        request: {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36",
                Connection: "keep-alive",
            },
        },
        directory: `./websiteSnaps/${website}`,
    };
    utils_1.deleteFolderRecursive(options.directory);
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        if (WEBSITE_CONFIG.type === "REST") {
            const r = yield node_fetch_1.default(WEBSITE_CONFIG.url);
            const results = yield r.json();
            if (website === "ooms") {
                resolve(filterResultsOoms(results));
            }
            else {
                resolve(results);
            }
        }
        else {
            website_scraper_1.default(options)
                .then((result) => {
                var _a, _b, _c, _d;
                console.log(`IMPORT APARTMENTS FROM ${website}`);
                const $ = cheerio_1.default.load(result[0].text, website === "pararius" ? { xmlMode: true } : {});
                if (full) {
                    const results = new Set();
                    if (website === "athomevastgoed") {
                        extractResultsFromAtHomeVastgoed($.html(), resolve, reject);
                    }
                    else {
                        $((_a = WEBSITE_CONFIG.filters) === null || _a === void 0 ? void 0 : _a.item).each((_, element) => {
                            var _a, _b, _c, _d, _e, _f, _g, _h;
                            const title = ((_a = WEBSITE_CONFIG.filters) === null || _a === void 0 ? void 0 : _a.title) ? normalizeText($(element).find(WEBSITE_CONFIG.filters.title).text())
                                : "";
                            const address = ((_b = WEBSITE_CONFIG.filters) === null || _b === void 0 ? void 0 : _b.address) ? normalizeText($(element).find(WEBSITE_CONFIG.filters.address).text())
                                : "";
                            const neighborhood = ((_c = WEBSITE_CONFIG.filters) === null || _c === void 0 ? void 0 : _c.neighborhood) ? normalizeText($(element).find(WEBSITE_CONFIG.filters.neighborhood).text())
                                : "";
                            const price = ((_d = WEBSITE_CONFIG.filters) === null || _d === void 0 ? void 0 : _d.price) ? normalizePrice($(element).find(WEBSITE_CONFIG.filters.price).text(), website)
                                : "";
                            const url = ((_e = WEBSITE_CONFIG.filters) === null || _e === void 0 ? void 0 : _e.url) ? $(element)
                                .find(WEBSITE_CONFIG.filters.url)
                                .attr((_g = (_f = WEBSITE_CONFIG.filters) === null || _f === void 0 ? void 0 : _f.link) !== null && _g !== void 0 ? _g : "href")
                                : element.attribs["href"];
                            const images = [];
                            if ((_h = WEBSITE_CONFIG.filters) === null || _h === void 0 ? void 0 : _h.images) {
                                $(element)
                                    .find(WEBSITE_CONFIG.filters.images)
                                    .each((_, imgElement) => {
                                    var _a, _b;
                                    if ((_a = WEBSITE_CONFIG.config) === null || _a === void 0 ? void 0 : _a.imageAttr) {
                                        const url = normalizeImageUrl((_b = imgElement.attribs[WEBSITE_CONFIG.config.imageAttr]) !== null && _b !== void 0 ? _b : imgElement.attribs["src"], WEBSITE_CONFIG);
                                        if (url) {
                                            images.push(url);
                                        }
                                    }
                                    else {
                                        const url = normalizeImageUrl(imgElement.attribs["src"], WEBSITE_CONFIG);
                                        if (url) {
                                            images.push(url);
                                        }
                                    }
                                });
                            }
                            if (url) {
                                const newPrice = Number(price);
                                if (newPrice >= providers_1.MIN_PRICE) {
                                    results.add({
                                        provider: website,
                                        title,
                                        address,
                                        city: providers_1.CITY,
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
                        }
                        else {
                            reject(`No results for ${website}`);
                        }
                    }
                }
                else {
                    const url = $((_b = WEBSITE_CONFIG.filters) === null || _b === void 0 ? void 0 : _b.url)
                        .first()
                        .attr((_d = (_c = WEBSITE_CONFIG.filters) === null || _c === void 0 ? void 0 : _c.link) !== null && _d !== void 0 ? _d : "href");
                    if (url) {
                        const finalUrl = normalizeUrl(url, WEBSITE_CONFIG);
                        if (finalUrl) {
                            resolve({
                                provider: website,
                                url: finalUrl,
                            });
                        }
                    }
                    else {
                        reject(new Error(`${website}: no results`));
                    }
                }
            })
                .catch((err) => {
                reject(err);
            });
        }
    }));
}
exports.scrapeWebsite = scrapeWebsite;
