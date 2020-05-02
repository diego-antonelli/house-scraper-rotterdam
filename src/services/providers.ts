export const MAX_VAL = 1250;
export const CITY = "Rotterdam";
export const PROVIDERS: Provider = {
    // Needs extra price filtering
    rdamapartments: {
        url: `https://rotterdamapartments.com/en/Rental-apartments/filter/${CITY}`,
        filters: {
            url: '.housecontainer .homeitem .houseimage'
        }
    },
    benhousing: {
        url: `https://benhousing.nl/en/properties/filter(pricemax-${MAX_VAL}%7Eterm-${CITY.toLowerCase()})`,
        filters: {
            url: '.item a'
        },
        config: {
            urlPrefix: "https://benhousing.nl/"
        }
    },
    huurWoningen: {
        url: `https://www.huurwoningen.nl/in/${CITY.toLowerCase()}/?max_price=${MAX_VAL}&number_of_rooms=15&size=50&sort=datetime_created&direction=desc&page=1`,
        filters: {
            url: '.listing-search__listings .listing__link'
        },
        config: {
            urlPrefix: 'https://www.huurwoningen.nl'
        }
    },
    verrarealestate: {
        url: `https://www.verrarealestate.com/huurwoningen/?for-sale=0&address=&min-price=400&max-price=${MAX_VAL}&forsale-min-price=&forsale-max-price=&city=${CITY}&district=&interior=&bedrooms=&available_at=&surface=&house_type=&house_type=`,
        filters: {
            url: '.rent a[href]'
        }
    },
    ideaalhousing: {
        url: `https://www.ideaalhousing.nl/dutch-rent-listings?city=${CITY}&house_type=&min_price=400&max_price=${MAX_VAL}&range=&surface=&bedrooms=&interior=&location=&available_at_date-datepicker=&available_at_date=`,
        filters: {
            url: '.listings .listing a'
        },
        config: {
            urlPrefix: 'https://www.ideaalhousing.nl'
        }
    },
    dopdop: {
        url: `https://www.dop-dop.com/properties?city=${CITY}&bedrooms=&min_price=500&max_price=${MAX_VAL}&available_at_date=`,
        filters: {
            url: '.listings .listing .property-page-link',
            link: 'data-url'
        },
        config: {
            urlPrefix: 'https://www.dop-dop.com'
        }
    },
    rotterdamrent: {
        url: `https://www.rotterdamrent.com/rental-properties?city=${CITY}&min_price=0&max_price=${MAX_VAL}&interior=`,
        filters: {
            url: '.listings .listing a'
        },
        config: {
            urlPrefix: 'https://www.rotterdamrent.com'
        }
    },
    // Needs extra price filtering
    OneTwoThreeWonen: {
        url: `https://www.123wonen.nl/huurwoningen/in/${CITY.toLowerCase()}/sort/newest`,
        filters: {
            url: '.json-objects .pandlist-container a',
            link: 'href'
        }
    },
    perfectrent: {
        url: `https://www.perfectrent.nl/nl/huren/aanbod/rentals?view=&order=added&accommodation%5B%5D=apartment&accommodation%5B%5D=room&priceMin=0&priceMax=${MAX_VAL}&persons=1&order=added&direction=desc&&order=added&direction=desc&`,
        filters: {
            url: '.aanbod .list-object .list-object-photo a'
        }
    },
    deblooisvastgoed: {
        url: `https://www.deblooisvastgoed.nl/huuraanbod/?filter_city=${CITY}&filter_min_price=&filter_max_price=${MAX_VAL}&filter_interior=&filter_surface=`,
        filters: {
            url: '#residences .residence .info a'
        }
    },
    valkvastgoed: {
        url: `http://www.valkvastgoed.com/aanbod/?city=${CITY}&district=&min-price=&interior=&max-price=${MAX_VAL}&bedrooms=&available_at=`,
        filters: {
            url: '.propertiesBox .rent .photo a'
        }
    },
    houseSelect: {
        url: `https://www.hsmakelaars.nl/woningaanbod/huur/land-nederland/gemeente-${CITY.toLowerCase()}?locationofinterest=${CITY}&pricerange.maxprice=${MAX_VAL}`,
        filters: {
            url: '.sys-page-of-properties .objectcontainer .object_data_container',
            price: '.sys-page-of-properties .objectcontainer .object_data_container .obj_price'
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
            url: '.type-sale.status-publish h2 a'
        },
        config: {
            urlPrefix: "http://www.vhpn.nl/"
        }
    },
    // Needs extra price filtering
    maashave: {
        url: 'http://www.maashave.com/verhuur',
        filters: {
            url: '#te-huur .at-push-button .at-push-title a'
        },
        config: {
            urlPrefix: 'http://www.maashave.com'
        }
    },
    homerent: {
        url: 'https://www.homerent.nl/nieuw-aanbod.html',
        filters: {
            url: '#search-result .house .house-content a'
        }
    },
    indestad: {
        url: `https://www.indestad.nl/huurwoningen/?wpp_search%5Bpagination%5D=on&wpp_search%5Bper_page%5D=10&wpp_search%5Bstrict_search%5D=false&wpp_search%5Bproperty_type%5D=direct_aanbod&wpp_search%5Bprice%5D%5Bmin%5D=&wpp_search%5Bprice%5D%5Bmax%5D=&wpp_search%5Barea%5D%5Bmin%5D=&wpp_search%5Barea%5D%5Bmax%5D=&wpp_search%5Bplaats%5D%5B0%5D=${CITY}`,
        filters: {
            url: '.all-properties .button-container a'
        }
    },
    ooms: {
        url: `https://ooms.com/api/properties/available.json`,
        type: "REST"
    },
    kolpa: {
        url: `http://www.kolpa.nl/nl/aanbod?plaats=${CITY}&straat=&opt1=huur&min_prijs=&max_prijs=${MAX_VAL}`,
        filters: {
            url: '.object-item[href]'
        }
    },
    vbo: {
        url: `https://www.vbo.nl/huurwoningen/${CITY.toLowerCase()}/0-${MAX_VAL}/1+kamers/50+woonopp.html?p=1`,
        filters: {
            url: '.objects .object-tiles a'
        },
        config: {
            urlPrefix: 'https://www.vbo.nl'
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
            url: '.view-tiles a'
        }
    },
    lankhuijzen: {
        url: `https://www.lankhuijzen.nl/aanbod/woningaanbod/${CITY.toUpperCase()}/-${MAX_VAL}/huur/`,
        filters: {
            url: '.vakmidden > a.aanbodEntryLink'
        },
        config: {
            urlPrefix: "https://www.lankhuijzen.nl"
        }
    },
    riva: {
        url: `https://www.rivarentals.nl/huurwoningen-${CITY.toLowerCase()}/?action=search&city=${CITY.toLowerCase()}&min-price=500&max-price=${MAX_VAL}`,
        filters: {
            url: '.house-overview-filtered-houses .house-overview-single-house a'
        },
        config: {
            urlPrefix: "https://www.rivarentals.nl"
        }
    },
    pararius: {
        url: `https://www.pararius.com/apartments/${CITY.toLowerCase()}/area-${CITY.toLowerCase()}-centrum/400-${MAX_VAL}/45m2`,
        filters: {
            url: 'section .listing-search-item__title a'
        },
        config: {
            urlPrefix: 'https://www.pararius.com'
        }
    },
    athomevastgoed: {
        url: `https://www.athomevastgoed.nl/woningaanbod?order=published_at_desc&location=&_labels%5Blocation%5D=&category=all&furnishing=all&number_of_bedrooms=&ray=0&min_price=&max_price=${MAX_VAL}&area=`,
        filters: {
            url: '.properties__item .properties__title a'
        }
    },
    // korrektwonen: {
    //     url: `http://korrektwonen.nl/properties/?filter_location=&filter_type=&filter_contract_type=54&filter_price_from=&filter_price_to=${MAX_VAL}&filter_sort_by=published&filter_order=DESC`,
    //     filters: {
    //         url: '.properties-rows .property .content a'
    //     }
    // },
    rotsvast: {
        url: `https://www.rotsvast.nl/en/property-listings/?type=2&city=${CITY}&maximumPrice[2]=${MAX_VAL}`,
        filters: {
            url: '#main .residence-gallery-wrapper .residence-gallery a'
        }
    },
    maxProperty: {
        url: `https://www.maxpropertyrental.com/woningaanbod/huur/land-nederland/gemeente-${CITY.toLowerCase()}?locationofinterest=${CITY}&pricerange.maxprice=${MAX_VAL}`,
        filters: {
            url: '.sys-page-of-properties .objectcontainer .imagecontainer .sys-image-container a'
        },
        config: {
            urlPrefix: 'https://www.maxpropertyrental.com'
        }
    }
};

export interface Provider {
    [key: string]: {
        url: string;
        type?: string;
        filters?: {
            url: string;
            link?: string;
            price?: string;
        },
        config?: {
            urlPrefix?: string;
        }
    }
}

export interface Result {
    provider: string;
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
}