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
Object.defineProperty(exports, "__esModule", { value: true });
const providers_1 = require("../services/providers");
const scrapper_1 = require("../services/scrapper");
const database_1 = require("../database");
const notify_1 = require("./notify");
function importHouses() {
    return __awaiter(this, void 0, void 0, function* () {
        const apartmentsToNotify = [];
        for (const key in providers_1.PROVIDERS) {
            try {
                const results = yield scrapper_1.scrapeWebsite(key, true);
                if (Array.isArray(results)) {
                    let newApartments = 0;
                    for (const apartment of results) {
                        const data = yield database_1.Database.findOne("apartments", { url: apartment.url });
                        if (!data) {
                            yield database_1.Database.save("apartments", Object.assign(Object.assign({}, apartment), { createdAt: new Date() }));
                            newApartments++;
                            apartmentsToNotify.push(apartment);
                        }
                    }
                    console.log(`Job done for ${key}: ${results.length} apartments found and ${newApartments} new.`);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        yield notify_1.notifyUsersByPreference(apartmentsToNotify);
        return apartmentsToNotify;
    });
}
exports.importHouses = importHouses;
