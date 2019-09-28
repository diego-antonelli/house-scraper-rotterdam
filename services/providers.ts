export const PROVIDERS: Provider = {
    // Needs extra price filtering
    rdamapartments: {
        url: 'https://rotterdamapartments.com/en/Rental-apartments/filter/Rotterdam',
        filters: {
            url: '.housecontainer .homeitem .houseimage'
        }
    },
    benhousing: {
        url: 'https://www.benhousing.nl/ons-verhuur-aanbod/',
        filters: {
            url: '#ajcontent .result-item .proc'
        }
    },
    huurWoningen: {
        url: 'https://www.huurwoningen.nl/in/rotterdam/?max_price=1000&number_of_rooms=15&size=50&sort=datetime_created&direction=desc&page=1',
        filters: {
            url: '.listing-search__listings .listing__link'
        },
        config: {
            urlPrefix: 'https://www.huurwoningen.nl'
        }
    },
    verrarealestate: {
        url: 'https://www.verrarealestate.com/huurwoningen/?for-sale=0&address=&min-price=&max-price=1000&forsale-min-price=&forsale-max-price=&city=Rotterdam&district=&interior=&bedrooms=&available_at=&surface=&house_type=&house_type=',
        filters: {
            url: '#propertiesList a'
        }
    },
    ideaalhousing: {
        url: 'https://www.ideaalhousing.nl/dutch-rent-listings?city=Rotterdam&house_type=&min_price=400&max_price=1000&range=&surface=&bedrooms=&interior=&location=&available_at_date-datepicker=&available_at_date=',
        filters: {
            url: '.listings .listing a'
        },
        config: {
            urlPrefix: 'https://www.ideaalhousing.nl'
        }
    },
    dopdop: {
        url: 'https://www.dop-dop.com/properties?city=Rotterdam&bedrooms=&min_price=500&max_price=1000&available_at_date=',
        filters: {
            url: '.listings .listing .property-page-link',
            link: 'data-url'
        },
        config: {
            urlPrefix: 'https://www.dop-dop.com'
        }
    },
    rotterdamrent: {
        url: 'https://www.rotterdamrent.com/rental-properties?city=Rotterdam&min_price=0&max_price=1000&interior=',
        filters: {
            url: '.listings .listing a'
        },
        config: {
            urlPrefix: 'https://www.rotterdamrent.com'
        }
    },
    // Needs extra price filtering
    OneTwoThreeWonen: {
        url: 'https://www.123wonen.nl/huurwoningen/in/rotterdam/sort/newest',
        filters: {
            url: '.json-objects .pandlist-container a',
            link: 'href'
        }
    },
    perfectrent: {
        url: 'https://www.perfectrent.nl/nl/huren/aanbod/rentals?view=&order=added&accommodation%5B%5D=apartment&accommodation%5B%5D=room&priceMin=0&priceMax=1000&persons=1&order=added&direction=desc&&order=added&direction=desc&',
        filters: {
            url: '.aanbod .list-object .list-object-photo a'
        }
    },
    deblooisvastgoed: {
        url: 'https://www.deblooisvastgoed.nl/huuraanbod/?filter_city=Rotterdam&filter_min_price=&filter_max_price=900&filter_interior=&filter_surface=',
        filters: {
            url: '#residences .residence .info a'
        }
    },
    valkvastgoed: {
        url: 'http://www.valkvastgoed.com/aanbod/?city=Rotterdam&district=&min-price=&interior=&max-price=1000&bedrooms=&available_at=',
        filters: {
            url: '.propertiesBox .rent .photo a'
        }
    },
    houseSelect: {
        url: 'https://www.hsmakelaars.nl/woningaanbod/huur/land-nederland/gemeente-rotterdam?locationofinterest=Rotterdam&pricerange.maxprice=900',
        filters: {
            url: '.sys-page-of-properties .objectcontainer .object_data_container',
            price: '.sys-page-of-properties .objectcontainer .object_data_container .obj_price'
        },
        config: {
            urlPrefix: 'https://www.hsmakelaars.nl'
        }
    },
    amstelhousing: {
        url: 'https://www.amstelhousing.nl/rentlistings?city=Rotterdam&range=&bedrooms=&max_price=1000',
        filters: {
            url: '.results .listings .listing .listing-slider',
            link: 'data-url'
        }
    },
    vhpn: {
        url: 'http://www.vhpn.nl/index.php?action=search&p=search&street=&city=rotterdam&house_type=&bedrooms=&min-price=&max-price=1000&interior=',
        filters: {
            url: '.object-tiles a'
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
        url: 'https://www.indestad.nl/huurwoningen/?wpp_search%5Bpagination%5D=on&wpp_search%5Bper_page%5D=10&wpp_search%5Bstrict_search%5D=false&wpp_search%5Bproperty_type%5D=direct_aanbod&wpp_search%5Bprice%5D%5Bmin%5D=&wpp_search%5Bprice%5D%5Bmax%5D=&wpp_search%5Barea%5D%5Bmin%5D=&wpp_search%5Barea%5D%5Bmax%5D=&wpp_search%5Bplaats%5D%5B0%5D=Rotterdam',
        filters: {
            url: '.all-properties .button-container a'
        }
    },
    ooms: {
        url: 'https://ooms.com/wonen/aanbod/lijst?sort-by=&virtuele-tour=&place=Rotterdam&min_price=0&max_price=1000&huur=huur&min_number_of_rooms=&max_number_of_rooms=&min_volume=&max_volume=#',
        filters: {
            url: '.items__overview .item--object--fw a'
        }
    },
    kolpa: {
        url: 'http://www.kolpa.nl/nl/aanbod?plaats=Rotterdam&straat=&opt1=huur&min_prijs=&max_prijs=1000',
        filters: {
            url: '.aanbod .grid_block .grid_caption_detail a'
        },
        config: {
            urlPrefix: 'http://www.kolpa.nl'
        }
    },
    vbo: {
        url: 'https://www.vbo.nl/huurwoningen/rotterdam/0-1000/1+kamers/50+woonopp.html?p=1',
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
        url: 'https://www.immobilia.nl/nl/aanbod?koophuur=huur&plaats=Rotterdam&order=datum&direction=asc',
        filters: {
            url: '.view-tiles a'
        }
    },
    lankhuijzen: {
        url: 'https://www.lankhuijzen.nl/aanbod/woningaanbod/ROTTERDAM/-1000/huur/',
        filters: {
            url: '.aanbodEntryLink'
        }
    },
    riva: {
        url: 'https://www.rivarentals.nl/huurwoningen-rotterdam/?action=search&city=rotterdam&min-price=500&max-price=1000',
        filters: {
            url: '.house-overview-filtered-houses .house-overview-single-house a'
        }
    },
    pararius: {
        url: 'https://www.pararius.com/apartments/rotterdam/area-rotterdam-centrum/400-1000/45m2',
        filters: {
            url: '.search-results-list .property-list-item-container .details .cta a'
        },
        config: {
            urlPrefix: 'https://www.pararius.com'
        }
    },
    athomevastgoed: {
        url: 'https://www.athomevastgoed.nl/woningaanbod?order=published_at_desc&location=&_labels%5Blocation%5D=&category=all&furnishing=all&number_of_bedrooms=&ray=0&min_price=&max_price=900&area=',
        filters: {
            url: '.properties__item a'
        }
    },
    korrektwonen: {
        url: 'http://korrektwonen.nl/properties/?filter_location=&filter_type=&filter_contract_type=54&filter_price_from=&filter_price_to=900&filter_sort_by=published&filter_order=DESC',
        filters: {
            url: '.properties-rows .property .content a'
        }
    },
    rotsvast: {
        url: 'https://www.rotsvast.nl/en/property-listings/?type=2&city=Rotterdam&maximumPrice[2]=1000',
        filters: {
            url: '#main .residence-gallery-wrapper .residence-gallery a'
        }
    },
    maxProperty: {
        url: 'https://www.maxpropertyrental.com/woningaanbod/huur/land-nederland/gemeente-rotterdam?locationofinterest=Rotterdam&pricerange.maxprice=900',
        filters: {
            url: '.sys-page-of-properties .objectcontainer .imagecontainer .sys-image-container a'
        },
        config: {
            urlPrefix: 'https://www.maxpropertyrental.com'
        }
    }
};

interface Provider {
    [key: string]: {
        url: string;
        filters: {
            url: string;
            link?: string;
            price?: string;
        },
        config?: {
            urlPrefix?: string;
        }
    }
}
