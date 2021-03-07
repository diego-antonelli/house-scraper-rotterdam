export const CITY = "Rotterdam";
export const MIN_PRICE = 400;
export const MIN_PRICE_SALE = 50000;
export const PROVIDERS: Provider = {
    rdamapartments: {
        url: `https://rotterdamapartments.com/en/Rental-apartments/filter/${CITY.toLowerCase()}`,
        urlSale: `https://rotterdamapartments.com/en/for-sale/${CITY.toLowerCase()}?priceMin=${MIN_PRICE_SALE}`,
        filters: {
            item: ".house-item__wrapper",
            address: ".house-item__title",
            title: ".house-item__title",
            price: ".house-item__price",
            url: "a.house-item.d-flex.flex-fill.flex-column",
            images: ".house-item__image",
        },
        config: {
            urlPrefix: "https://rotterdamapartments.com",
        },
    },
    benhousing: {
        url: `https://benhousing.nl/en/properties/filter(price-${MIN_PRICE}%7Eterm-${CITY.toLowerCase()})`,
        filters: {
            item: ".item",
            title: ".item-content > .row h3",
            address: ".item-content > .row h3",
            neighborhood: ".item-content > .row > .col-xs-12.col-sm-8.col-md-8 p:not(.text-primary):first-of-type",
            price: ".item-price",
            images: "img",
            url: ".item a",
        },
        config: {
            urlPrefix: "https://benhousing.nl",
            imageAttr: "data-lazy",
        },
    },
    huurWoningen: {
        url: `https://www.huurwoningen.nl/in/${CITY.toLowerCase()}/?min_price=${MIN_PRICE}&number_of_rooms=15&size=50&sort=datetime_created&direction=desc&page=1`,
        filters: {
            item: ".listing",
            url: ".listing__link",
            address: ".listing-address__street",
            neighborhood: ".listing__subtitle",
            title: ".listing__title",
            price: ".listing__price .price__value",
            images: "img",
        },
        config: {
            urlPrefix: "https://www.huurwoningen.nl",
            imageAttr: "data-src",
        },
    },
    verrarealestate: {
        url: `https://www.verrarealestate.com/huurwoningen/?for-sale=0&address=&min-price=${MIN_PRICE}&forsale-min-price=&forsale-max-price=&city=${CITY}&district=&interior=&bedrooms=&available_at=&surface=&house_type=&house_type=`,
        urlSale: `https://www.verrarealestate.com/en/sale/?address=&forsale-min-price=${MIN_PRICE_SALE}&forsale-max-price=&city=${CITY}&district=&surface=&bedrooms=&bathrooms=&house_type=&buildyear=#`,
        filters: {
            item: "li",
            title: ".info>span:first-of-type",
            address: ".info>span:first-of-type",
            neighborhood: ".info>span:last-of-type",
            price: ".price",
            url: "div a[href]",
            images: ".flickity-element",
        },
        config: {
            imageAttr: "style",
        },
    },
    dopdop: {
        url: `https://www.dop-dop.com/properties?city=${CITY}&bedrooms=&min_price=${MIN_PRICE}&available_at_date=`,
        filters: {
            item: ".listings .listing",
            title: ".address",
            address: ".address",
            neighborhood: "",
            price: "li.price",
            url: ".property-page-link",
            link: "data-url",
            images: ".image-slide",
        },
        config: {
            urlPrefix: "https://www.dop-dop.com",
            imageAttr: "data-src",
        },
    },
    rotterdamrent: {
        url: `https://www.rotterdamrent.com/rental-properties?city=${CITY}&min_price=${MIN_PRICE}&interior=`,
        urlSale: `https://www.rotterdamrent.com/properties-for-sale?city=${CITY}&buildyear=&surface=&bedrooms=&min_price=${MIN_PRICE_SALE}&max_price=&property_type_1=&rooms=`,
        filters: {
            item: ".listings .listing",
            title: "article h3",
            address: "article h3",
            neighborhood: "",
            price: ".price",
            url: "a[href]",
            images: ".slide",
        },
        config: {
            urlPrefix: "https://www.rotterdamrent.com",
            imageAttr: "data-image",
        },
    },
    OneTwoThreeWonen: {
        url: `https://www.123wonen.nl/huurwoningen/in/${CITY.toLowerCase()}/sort/newest`,
        filters: {
            item: ".json-objects .pandlist-container",
            title: ".pand-title",
            address: ".pand-address",
            neighborhood: "",
            price: ".pand-price",
            url: "a",
            link: "href",
            images: ".pand-image",
        },
        config: {
            imageAttr: "data-src",
        },
    },
    perfectrent: {
        url: `https://www.perfectrent.nl/nl/huren/aanbod/rentals?view=&order=added&accommodation%5B%5D=apartment&accommodation%5B%5D=room&priceMin=${MIN_PRICE}&persons=1&order=added&direction=desc&&order=added&direction=desc&`,
        filters: {
            item: ".object",
            title: ".list-object-type",
            address: ".list-object-address",
            neighborhood: "",
            price: ".list-object-price",
            url: ".list-object-address[href]",
            images: ".list-object-photo a",
        },
        config: {
            imageAttr: "style",
        },
    },
    deblooisvastgoed: {
        url: `https://www.deblooisvastgoed.nl/huuraanbod/?filter_city=${CITY}&filter_min_price=${MIN_PRICE}&filter_interior=&filter_surface=`,
        filters: {
            item: "#residences .residence",
            title: ".smallTitle",
            address: ".smallTitle",
            neighborhood: "",
            price: "ul li:nth-child(2)>span:last-of-type",
            url: ".info a",
            images: "img",
        },
    },
    houseSelect: {
        url: `https://www.hsmakelaars.nl/woningaanbod/huur/land-nederland/gemeente-${CITY.toLowerCase()}?locationofinterest=${CITY}&pricerange.minprice=${MIN_PRICE}`,
        urlSale: `https://www.hsmakelaars.nl/woningaanbod/koop/${CITY.toLowerCase()}?locationofinterest=${CITY}&pricerange.minprice=${MIN_PRICE_SALE}`,
        filters: {
            item: ".sys-page-of-properties .objectcontainer",
            title: ".object_data_container h2.obj_address",
            address: ".object_data_container h2.obj_address",
            neighborhood: "",
            price: ".object_data_container .object_price-address .obj_price",
            url: ".object_data_container",
            images: "img",
        },
        config: {
            urlPrefix: "https://www.hsmakelaars.nl",
        },
    },
    vhpn: {
        url: `http://www.vhpn.nl/index.php?action=search&p=search&street=&city=${CITY.toLowerCase()}&house_type=&bedrooms=&min-price=${MIN_PRICE}&interior=`,
        filters: {
            item: ".type-sale.status-publish",
            title: "h2 a",
            address: "h2 a",
            neighborhood: "",
            price: ".price-request",
            url: "h2 a",
            images: "img",
        },
        config: {
            urlPrefix: "http://www.vhpn.nl/",
        },
    },
    maashave: {
        url: "http://www.maashave.com/verhuur",
        filters: {
            item: "#te-huur .at-push-button",
            title: ".at-content-title",
            address: ".at-content-title",
            neighborhood: "",
            price: "ul li:nth-child(2) span span",
            url: ".at-push-title a",
            images: "img",
        },
        config: {
            urlPrefix: "http://www.maashave.com",
            urlPrefixImage: "http://www.maashave.com",
        },
    },
    indestad: {
        url: `https://www.indestad.nl/huurwoningen/?wpp_search%5Bpagination%5D=on&wpp_search%5Bper_page%5D=10&wpp_search%5Bstrict_search%5D=false&wpp_search%5Bproperty_type%5D=direct_aanbod&wpp_search%5Bprice%5D%5Bmin%5D=${MIN_PRICE}&wpp_search%5Barea%5D%5Bmin%5D=&wpp_search%5Barea%5D%5Bmax%5D=&wpp_search%5Bplaats%5D%5B0%5D=${CITY}`,
        filters: {
            item: ".aanbod-item-container",
            title: ".columns h1",
            address: ".columns h1",
            neighborhood: ".woning-beschrijving-content strong",
            price: ".price",
            url: "a",
            images: "img",
        },
    },
    ooms: {
        url: `https://ooms.com/api/properties/available.json`,
        urlSale: `https://ooms.com/api/properties/available.json`,
        type: "REST",
    },
    vbo: {
        url: `https://www.vbo.nl/huurwoningen/${CITY.toLowerCase()}/${MIN_PRICE}+.html?p=1&l=1000`,
        urlSale: `https://www.vbo.nl/koopwoningen/${CITY.toLowerCase()}/${MIN_PRICE_SALE}+.html?p=1&l=1000`,
        filters: {
            item: ".objects .object-tiles",
            title: "figcaption h3",
            address: "figcaption h3",
            neighborhood: "",
            price: ".price",
            url: "a[href]",
            images: ".object-image",
        },
        config: {
            urlPrefix: "https://www.vbo.nl",
            urlPrefixImage: "https:",
        },
    },
    immobilia: {
        url: `https://www.immobilia.nl/nl/aanbod?koophuur=huur&plaats=${CITY}&order=datum&direction=asc`,
        urlSale: `https://www.immobilia.nl/nl/aanbod?koophuur=koop&plaats=${CITY}&order=datum&direction=asc`,
        filters: {
            item: ".view-tiles a[href]",
            title: ".project_detalis h4 span:first-of-type",
            address: ".project_detalis h4 span:first-of-type",
            neighborhood: ".project_detalis h4 span:last-of-type",
            price: ".project_detalis .prijs",
            url: "",
            images: "img",
        },
        config: {
            urlPrefixImage: "https:",
        },
    },
    riva: {
        url: `https://www.rivarentals.nl/huurwoningen-${CITY.toLowerCase()}/?action=search&city=${CITY.toLowerCase()}&min-price=${MIN_PRICE}`,
        filters: {
            item: ".house-overview-filtered-houses .house-overview-single-house",
            title: ".desc h3",
            address: ".desc h3",
            neighborhood: "",
            price: ".price",
            url: "a",
            images: "img",
        },
        config: {
            urlPrefix: "https://www.rivarentals.nl",
            urlPrefixImage: "https://www.rivarentals.nl/",
        },
    },
    pararius: {
        url: `https://www.pararius.com/apartments/${CITY.toLowerCase()}/area-${CITY.toLowerCase()}-centrum/${MIN_PRICE}-5000`,
        filters: {
            item: ".listing-search-item",
            title: ".listing-search-item__link--title",
            address: ".listing-search-item__link--title",
            neighborhood: ".listing-search-item__location",
            price: ".listing-search-item__price",
            url: ".listing-search-item__title a",
            images: ".listing-search-item__link .picture img",
        },
        config: {
            urlPrefix: "https://www.pararius.com",
        },
    },
    athomevastgoed: {
        url: `https://www.athomevastgoed.nl/woningaanbod?order=published_at_desc&location=${CITY}&_labels%5Blocation%5D=&category=all&furnishing=all&number_of_bedrooms=&ray=0&min_price=${MIN_PRICE}&area=`,
    },
    rotsvast: {
        url: `https://www.rotsvast.nl/en/property-listings/?type=2&city=${CITY}&minimumPrice[2]=${MIN_PRICE}`,
        urlSale: `https://www.rotsvast.nl/en/property-listings/?type=1&city=${CITY}&minimumPrice[2]=${MIN_PRICE_SALE}`,
        filters: {
            item: "div.residence-gallery",
            title: ".residence-street",
            address: ".residence-street",
            neighborhood: ".residence-zipcode-place",
            price: ".residence-price",
            url: "a[href]",
            images: ".residence-image",
        },
        config: {
            imageAttr: "style",
        },
    },
    maxProperty: {
        url: `https://www.maxpropertyrental.com/woningaanbod/huur/land-nederland/gemeente-${CITY.toLowerCase()}?locationofinterest=${CITY}&pricerange.minprice=${MIN_PRICE}`,
        urlSale: `https://www.maxpropertyrental.com/woningaanbod/koop/land-nederland/gemeente-${CITY.toLowerCase()}?locationofinterest=${CITY}&pricerange.minprice=${MIN_PRICE_SALE}`,
        filters: {
            item: ".sys-page-of-properties .objectcontainer .imagecontainer",
            title: ".obj_address_container .obj_address",
            address: ".obj_sub_address",
            neighborhood: "",
            price: ".obj_address_container .obj_type_price",
            url: ".sys-image-container a",
            images: "img",
        },
        config: {
            urlPrefix: "https://www.maxpropertyrental.com",
            urlPrefixImage: "https:",
        },
    },
};

export interface Provider {
    [key: string]: {
        url: string;
        urlSale?: string;
        type?: string;
        filters?: {
            item?: string;
            url: string;
            link?: string;
            address?: string;
            neighborhood?: string;
            price?: string;
            title?: string;
            images?: string;
        };
        config?: {
            urlPrefix?: string;
            urlPrefixImage?: string;
            imageAttr?: string;
        };
    };
}

export interface Result {
    provider: string;
    title?: string;
    neighborhood?: string;
    address?: string;
    price: number;
    city?: string;
    images?: string[];
    url: string;
    type: "rent" | "sale";
}

export interface JSONathomevastgoed {
    street: string;
    description_trans: {
        en: string;
        nl: string;
    };
    url: string;
    fullAddress: string;
    ah_price: string;
    listingMainPhoto: string;
}
