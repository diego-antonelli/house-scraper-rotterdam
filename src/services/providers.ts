export const MAX_VAL = 1250;
export const CITY = "Rotterdam";
export const PROVIDERS: Provider = {
    // Needs extra price filtering
    rdamapartments: {
        url: `https://rotterdamapartments.com/en/Rental-apartments/filter/${CITY}`,
        filters: {
            item: ".housecontainer .homeitem",
            address: ".street",
            title: ".street",
            price: ".price",
            url: '.street a[href]',
            images: ".houseimage img"
        },
        config: {
            urlPrefixImage: "https://rotterdamapartments.com/"
        }
    },
    benhousing: {
        url: `https://benhousing.nl/en/properties/filter(price-400%7Epricemax-${MAX_VAL}%7Eterm-${CITY.toLowerCase()})`,
        filters: {
            item: ".item",
            title: ".item-content > .row h3",
            address: ".item-content > .row h3",
            neighborhood: ".item-content > .row > .col-xs-12.col-sm-8.col-md-8 p:not(.text-primary):first-of-type",
            price: ".item-price",
            images: "img",
            url: '.item a'
        },
        config: {
            urlPrefix: "https://benhousing.nl",
            imageAttr: "data-lazy"
        }
    },
    huurWoningen: {
        url: `https://www.huurwoningen.nl/in/${CITY.toLowerCase()}/?max_price=${MAX_VAL}&min_price=400&number_of_rooms=15&size=50&sort=datetime_created&direction=desc&page=1`,
        filters: {
            item: ".listing",
            url: '.listing__link',
            address: ".listing-address__street",
            neighborhood: ".listing__subtitle",
            title: ".listing__title",
            price: ".listing__price .price__value",
            images: "img"
        },
        config: {
            urlPrefix: 'https://www.huurwoningen.nl',
            imageAttr: "data-src"
        }
    },
    verrarealestate: {
        url: `https://www.verrarealestate.com/huurwoningen/?for-sale=0&address=&min-price=400&max-price=${MAX_VAL}&forsale-min-price=&forsale-max-price=&city=${CITY}&district=&interior=&bedrooms=&available_at=&surface=&house_type=&house_type=`,
        filters: {
            item: "li.rent",
            title: ".info>span:first-of-type",
            address: ".info>span:first-of-type",
            neighborhood: ".info>span:last-of-type",
            price: ".price",
            url: 'div a[href]',
            images: ".flickity-element"
        },
        config: {
            imageAttr: "style"
        }
    },
    ideaalhousing: {
        url: `https://www.ideaalhousing.nl/dutch-rent-listings?city=${CITY}&house_type=&min_price=400&max_price=${MAX_VAL}&range=&surface=&bedrooms=&interior=&location=&available_at_date-datepicker=&available_at_date=`,
        filters: {
            item: ".listings .listing",
            title: "article h3",
            address: "article h3",
            neighborhood: "",
            price: ".price",
            url: 'a[href]',
            images: ".slide[data-image]"
        },
        config: {
            urlPrefix: 'https://www.ideaalhousing.nl',
            imageAttr: "data-image"
        }
    },
    dopdop: {
        url: `https://www.dop-dop.com/properties?city=${CITY}&bedrooms=&min_price=400&max_price=${MAX_VAL}&available_at_date=`,
        filters: {
            item: ".listings .listing",
            title: ".address",
            address: ".address",
            neighborhood: "",
            price: "li.price",
            url: '.property-page-link',
            link: 'data-url',
            images: ".image-slide"
        },
        config: {
            urlPrefix: "https://www.dop-dop.com",
            imageAttr: "data-src"
        }
    },
    rotterdamrent: {
        url: `https://www.rotterdamrent.com/rental-properties?city=${CITY}&min_price=0&max_price=${MAX_VAL}&interior=`,
        filters: {
            item: ".listings .listing",
            title: "article h3",
            address: "article h3",
            neighborhood: "",
            price: ".price",
            url: 'a[href]',
            images: ".slide"
        },
        config: {
            urlPrefix: "https://www.rotterdamrent.com",
            imageAttr: "data-image"
        }
    },
    OneTwoThreeWonen: {
        url: `https://www.123wonen.nl/huurwoningen/in/${CITY.toLowerCase()}/sort/newest`,
        filters: {
            item: ".json-objects .pandlist-container",
            title: ".pand-title",
            address: ".pand-address",
            neighborhood: "",
            price: ".pand-price",
            url: 'a',
            link: 'href',
            images: ".pand-image"
        },
        config: {
            imageAttr: "data-src"
        }
    },
    perfectrent: {
        url: `https://www.perfectrent.nl/nl/huren/aanbod/rentals?view=&order=added&accommodation%5B%5D=apartment&accommodation%5B%5D=room&priceMin=0&priceMax=${MAX_VAL}&persons=1&order=added&direction=desc&&order=added&direction=desc&`,
        filters: {
            item: ".object",
            title: ".list-object-type",
            address: ".list-object-address",
            neighborhood: "",
            price: ".list-object-price",
            url: '.list-object-address[href]',
            images: ".list-object-photo a"
        },
        config: {
            imageAttr: "style"
        }
    },
    deblooisvastgoed: {
        url: `https://www.deblooisvastgoed.nl/huuraanbod/?filter_city=${CITY}&filter_min_price=&filter_max_price=${MAX_VAL}&filter_interior=&filter_surface=`,
        filters: {
            item: "#residences .residence",
            title: ".smallTitle",
            address: ".smallTitle",
            neighborhood: "",
            price: "ul li:nth-child(2)>span:last-of-type",
            url: '.info a',
            images: "img"
        }
    },
    valkvastgoed: {
        url: `http://www.valkvastgoed.com/aanbod/?city=${CITY}&district=&min-price=400&interior=&max-price=${MAX_VAL}&bedrooms=&available_at=`,
        filters: {
            item: "li.rent",
            title: ".info h3 a",
            address: ".info h3 a",
            neighborhood: "",
            price: ".price .value",
            url: '.photo a',
            images: "img"
        }
    },
    houseSelect: {
        url: `https://www.hsmakelaars.nl/woningaanbod/huur/land-nederland/gemeente-${CITY.toLowerCase()}?locationofinterest=${CITY}&pricerange.maxprice=${MAX_VAL}`,
        filters: {
            item: ".sys-page-of-properties .objectcontainer",
            title: ".object_data_container h2.obj_address",
            address: ".object_data_container h2.obj_address",
            neighborhood: "",
            price: ".object_data_container .object_price-address .obj_price",
            url: '.object_data_container',
            images: "img"
        },
        config: {
            urlPrefix: 'https://www.hsmakelaars.nl'
        }
    },
    // amstelhousing: {
    //     url: `https://www.amstelhousing.nl/woningaanbod?status=rent&city=Rotterdam&max_price=${MAX_VAL}`,
    //     filters: {
    //         url: '.listing-houses div a',
    //         link: 'data-url'
    //     },
    //     config: {
    //         urlPrefix: "https://www.amstelhousing.nl"
    //     }
    // },
    vhpn: {
        url: `http://www.vhpn.nl/index.php?action=search&p=search&street=&city=${CITY.toLowerCase()}&house_type=&bedrooms=&min-price=&max-price=${MAX_VAL}&interior=`,
        filters: {
            item: ".type-sale.status-publish",
            title: "h2 a",
            address: "h2 a",
            neighborhood: "",
            price: ".price-request",
            url: "h2 a",
            images: "img"
        },
        config: {
            urlPrefix: "http://www.vhpn.nl/"
        }
    },
    maashave: {
        url: 'http://www.maashave.com/verhuur',
        filters: {
            item: "#te-huur .at-push-button",
            title: ".at-content-title",
            address: ".at-content-title",
            neighborhood: "",
            price: "ul li:nth-child(2) span span",
            url: ".at-push-title a",
            images: "img"
        },
        config: {
            urlPrefix: "http://www.maashave.com",
            urlPrefixImage: "http://www.maashave.com"
        }
    },
    // homerent: {
    //     url: 'https://www.homerent.nl/nieuw-aanbod.html',
    //     filters: {
    //         item: "#search-result .house .house-content",
    //         title: "",
    //         address: "",
    //         neighborhood: "",
    //         price: "",
    //         url: 'a'
    //     }
    // },
    indestad: {
        url: `https://www.indestad.nl/huurwoningen/?wpp_search%5Bpagination%5D=on&wpp_search%5Bper_page%5D=10&wpp_search%5Bstrict_search%5D=false&wpp_search%5Bproperty_type%5D=direct_aanbod&wpp_search%5Bprice%5D%5Bmin%5D=400&wpp_search%5Bprice%5D%5Bmax%5D=${MAX_VAL}&wpp_search%5Barea%5D%5Bmin%5D=&wpp_search%5Barea%5D%5Bmax%5D=&wpp_search%5Bplaats%5D%5B0%5D=${CITY}`,
        filters: {
            item: ".aanbod-item-container",
            title: ".columns h1",
            address: ".columns h1",
            neighborhood: ".woning-beschrijving-content strong",
            price: ".price",
            url: 'a',
            images: "img"
        }
    },
    ooms: {
        url: `https://ooms.com/api/properties/available.json`,
        type: "REST"
    },
    kolpa: {
        url: `http://www.kolpa.nl/nl/aanbod?plaats=${CITY}&koophuur=huur&prijs_min=400&prijs_max=${MAX_VAL}&type=priv`,
        filters: {
            item: ".object-item",
            title: ".object-item__title",
            address: ".object-item__title",
            neighborhood: "",
            price: ".object-item__price",
            url: '',
            images: "img"
        }
    },
    vbo: {
        url: `https://www.vbo.nl/huurwoningen/${CITY.toLowerCase()}/0-${MAX_VAL}/1+kamers/50+woonopp.html?p=1`,
        filters: {
            item: ".objects .object-tiles",
            title: "figcaption h3",
            address: "figcaption h3",
            neighborhood: "",
            price: ".price",
            url: 'a[href]',
            images: ".object-image"
        },
        config: {
            urlPrefix: "https://www.vbo.nl",
            urlPrefixImage: "https:"
        }
    },
    // domica: {
    //     url: 'https://www.domica.nl/huur/prijs-max-1000/provincie-zuid-holland/rotterdam',
    //     filters: {
    //         url: ''
    //     }
    // },
    immobilia: {
        url: `https://www.immobilia.nl/nl/aanbod?koophuur=huur&plaats=${CITY}&order=datum&direction=asc`,
        filters: {
            item: ".view-tiles a[href]",
            title: ".project_detalis h4 span:first-of-type",
            address: ".project_detalis h4 span:first-of-type",
            neighborhood: ".project_detalis h4 span:last-of-type",
            price: ".project_detalis .prijs",
            url: "",
            images: "img"
        },
        config: {
            urlPrefixImage: "https:"
        }
    },
    lankhuijzen: {
        url: `https://www.lankhuijzen.nl/aanbod/woningaanbod/${CITY.toUpperCase()}/-${MAX_VAL}/huur/`,
        filters: {
            item: ".aanbodEntry",
            title: ".street-address",
            address: ".street-address",
            neighborhood: ".postal-code",
            price: ".huurprijs .kenmerkValue",
            url: '.vakmidden > a.aanbodEntryLink',
            images: "img"
        },
        config: {
            urlPrefix: "https://www.lankhuijzen.nl"
        }
    },
    riva: {
        url: `https://www.rivarentals.nl/huurwoningen-${CITY.toLowerCase()}/?action=search&city=${CITY.toLowerCase()}&min-price=500&max-price=${MAX_VAL}`,
        filters: {
            item: ".house-overview-filtered-houses .house-overview-single-house",
            title: ".desc h3",
            address: ".desc h3",
            neighborhood: "",
            price: ".price",
            url: "a",
            images: "img"
        },
        config: {
            urlPrefix: "https://www.rivarentals.nl",
            urlPrefixImage: "https://www.rivarentals.nl/",
        }
    },
    pararius: {
        url: `https://www.pararius.com/apartments/${CITY.toLowerCase()}/area-${CITY.toLowerCase()}-centrum/400-${MAX_VAL}/45m2`,
        filters: {
            item: ".listing-search-item",
            title: ".listing-search-item__link--title",
            address: ".listing-search-item__link--title",
            neighborhood: ".listing-search-item__location",
            price: ".listing-search-item__price",
            url: '.listing-search-item__title a',
            images: ".listing-search-item__link .picture img"
        },
        config: {
            urlPrefix: "https://www.pararius.com"
        }
    },
    athomevastgoed: {
        url: `https://www.athomevastgoed.nl/woningaanbod?order=published_at_desc&location=&_labels%5Blocation%5D=&category=all&furnishing=all&number_of_bedrooms=&ray=0&min_price=&max_price=${MAX_VAL}&area=`,
    },
    // korrektwonen: {
    //     url: `http://korrektwonen.nl/properties/?filter_location=&filter_type=&filter_contract_type=54&filter_price_from=&filter_price_to=${MAX_VAL}&filter_sort_by=published&filter_order=DESC`,
    //     filters: {
    //         url: '.properties-rows .property .content a'
    //     }
    // },
    rotsvast: {
        url: `https://www.rotsvast.nl/en/property-listings/?type=2&city=${CITY}&minimumPrice[2]=400&maximumPrice[2]=${MAX_VAL}`,
        filters: {
            item: "div.residence-gallery",
            title: ".residence-street",
            address: ".residence-street",
            neighborhood: ".residence-zipcode-place",
            price: ".residence-price",
            url: 'a[href]',
            images: ".residence-image"
        },
        config: {
            imageAttr: "style"
        }
    },
    maxProperty: {
        url: `https://www.maxpropertyrental.com/woningaanbod/huur/land-nederland/gemeente-${CITY.toLowerCase()}?locationofinterest=${CITY}&pricerange.maxprice=${MAX_VAL}`,
        filters: {
            item: ".sys-page-of-properties .objectcontainer .imagecontainer",
            title: ".obj_address_container .obj_address",
            address: ".obj_sub_address",
            neighborhood: "",
            price: ".obj_address_container .obj_type_price",
            url: '.sys-image-container a',
            images: "img"
        },
        config: {
            urlPrefix: 'https://www.maxpropertyrental.com',
            urlPrefixImage: "https:"
        }
    }
};

export interface Provider {
    [key: string]: {
        url: string;
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
        },
        config?: {
            urlPrefix?: string;
            urlPrefixImage?: string;
            imageAttr?: string;
        }
    }
}

export interface Result {
    provider: string;
    title?: string;
    neighborhood?: string;
    address?: string;
    price?: number;
    city?: string;
    images?: string[];
    url: string;
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