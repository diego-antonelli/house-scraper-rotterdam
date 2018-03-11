var deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

var houselinks = {
  rdamapartments: 'https://rotterdamapartments.com/en/Rental-apartments',
  benhousing: 'https://www.benhousing.nl/ons-verhuur-aanbod/',
  huurWoningen: 'https://www.huurwoningen.nl/in/rotterdam/?max_price=1000&number_of_rooms=15&size=50&sort=datetime_created&direction=desc&page=1',
  verrarealestate: 'https://www.verrarealestate.com/huurwoningen/?for-sale=0&address=&min-price=&max-price=1000&forsale-min-price=&forsale-max-price=&city=Rotterdam&district=&interior=&bedrooms=&available_at=&surface=&house_type=&house_type=',
  ideaalhousing: 'https://www.ideaalhousing.nl/dutch-rent-listings?city=Rotterdam&house_type=&min_price=400&max_price=1000&range=&surface=&bedrooms=&interior=&location=&available_at_date-datepicker=&available_at_date=',
  dopdop: 'https://www.dop-dop.com/properties?city=Rotterdam&bedrooms=&min_price=500&max_price=1000&available_at_date=',
  rotterdamrent: 'https://www.rotterdamrent.com/rental-properties?city=Rotterdam&min_price=0&max_price=1000&interior=',
  OneTwoThreeWonen: 'https://www.123wonen.nl/huurwoningen/in/rotterdam/sort/newest',
  perfectrent: 'http://www.perfectrent.nl/nl/huren/aanbod/rentals?view=&order=added&accommodation%5B%5D=apartment&accommodation%5B%5D=room&priceMin=0&priceMax=1000&persons=1&order=added&direction=desc&',
  deblooisvastgoed: 'https://www.deblooisvastgoed.nl/huuraanbod/',
  valkvastgoed: 'http://www.valkvastgoed.com/aanbod/?city=Rotterdam&district=&min-price=&interior=&max-price=1000&bedrooms=&available_at=',
  houseSelect: 'https://www.house-select.nl/rent-listings?min_price=&max_price=1000&city=Rotterdam&district=&interior=&bedrooms=',
  amstelhousing: 'https://www.amstelhousing.nl/rentlistings?city=Rotterdam&range=&bedrooms=&max_price=1000',
  vhpn: 'http://www.vhpn.nl/index.php?action=search&p=search&street=&city=rotterdam&house_type=&bedrooms=&min-price=&max-price=1000&interior=',
  maashave: 'http://www.maashave.com/verhuur',
  homerent: 'https://www.homerent.nl/zoek-direct-uw-woning.html',
  indestad: 'https://www.indestad.nl/huurwoningen/',
  ooms: 'https://ooms.com/wonen/aanbod/lijst?sort-by=&virtuele-tour=&place=Rotterdam&min_price=0&max_price=1000&huur=huur&min_number_of_rooms=&max_number_of_rooms=&min_volume=&max_volume=#'
}
var getPathName = function(websiteName){
  var defaultPathName = './websiteSnaps/'
  return defaultPathName + websiteName + '/'
}

var rdamapartments = function (){
  var websiteName = 'rdamapartments'
  var websitePathName = getPathName(websiteName)
  var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''

  if (fs.existsSync(websitePathName+'index.html')) {
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));
    oldFirstHouseLink = oldWebsiteHtml('.housecontainer .houseblockcontainer .houseimage').first().attr('href')
    deleteFolderRecursive(websitePathName);
  }


  var options = {
    urls: [houselinks.rdamapartments],
    sources: [],
    directory: websitePathName,
  };

  // with promise
  return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)
    newFirstHouseLink = newWebsiteHtml('.housecontainer .houseblockcontainer .houseimage').first().attr('href')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      text = "There is a new link: "+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
  }).catch((err) => {
    // console.log(err);
  })
}

var benhousing = function (callback){
  var websiteName = 'benhousing'
  var websitePathName = getPathName(websiteName)
	var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
	if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('#ajcontent .result-item .proc').first().attr('href')
    // remove the folder since new data should be written
		deleteFolderRecursive(websitePathName);
	}


	var options = {
		urls: [houselinks.benhousing],
    sources: [],
		directory: websitePathName,
	};

	// with promise
	return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('#ajcontent .result-item .proc').first().attr('href')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      text = "There is a new link: "+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
	}).catch((err) => {
		console.log(err);
	});
}

var huurWoningen = function(callback){
  var websiteName = 'huurWoningen'
  var websitePathName = getPathName(websiteName)
  var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
  if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('.listing-search__listings .listing__link').first().attr('href')
    // remove the folder since new data should be written
    deleteFolderRecursive(websitePathName);
  }


  options = {
    urls: [houselinks.huurWoningen],
    sources: [],
    request: {
      headers: {
        'User-Agent': 'ser-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36'
      }
    },
    directory: websitePathName,
  };

  // with promise
  return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('.listing-search__listings .listing__link').first().attr('href')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: https://www.huurwoningen.nl"+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
    // console.log(result)
  }).catch((err) => {
    console.log(err);
  });
  //  ############## Section for a huurWoningen ends #############
}

var verrarealestate = function (callback) {
  var websiteName = 'verrarealestate'
  var websitePathName = getPathName(websiteName)
	var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
	if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('#propertiesList .flickity-element').first().attr('onclick')
    // remove the folder since new data should be written
		deleteFolderRecursive(websitePathName);
	}


	options = {
		urls: [houselinks.verrarealestate],
    sources: [],
    request: {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
      }
    },
		directory: websitePathName,
	};

	// with promise
	return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('#propertiesList .flickity-element').first().attr('onclick')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: "+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
		// console.log(result)
	}).catch((err) => {
		console.log(err);
	});
}

var ideaalhousing = function(callback){
  var websiteName = 'ideaalhousing'
  var websitePathName = getPathName(websiteName)
  var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
  if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('.listings .listing a').first().attr('href')
    // remove the folder since new data should be written
    deleteFolderRecursive(websitePathName);
  }


  options = {
    urls: [houselinks.ideaalhousing],
    sources: [],
    request: {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
      }
    },
    directory: websitePathName,
  };

  // with promise
  return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('.listings .listing a').first().attr('href')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: https://www.ideaalhousing.nl"+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
    // console.log(result)
  }).catch((err) => {
    console.log(err);
  });
}

var dopdop = function(callback){
  var websiteName = 'dopdop'
  var websitePathName = getPathName(websiteName)
  var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
  if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('.listings .listing .property-page-link').first().attr('data-url')
    // remove the folder since new data should be written
    deleteFolderRecursive(websitePathName);
  }


  options = {
    urls: [houselinks.dopdop],
    sources: [],
    request: {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
      }
    },
    directory: websitePathName,
  };

  // with promise
  return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('.listings .listing .property-page-link').first().attr('data-url')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: https://www.dop-dop.com"+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
    // console.log(result)
  }).catch((err) => {
    console.log(err);
  });
}

var rotterdamrent = function(callback){
  var websiteName = 'rotterdamrent'
  var websitePathName = getPathName(websiteName)
  var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
  if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('.listings .listing a').first().attr('href')
    // remove the folder since new data should be written
    deleteFolderRecursive(websitePathName);
  }


  options = {
    urls: [houselinks.rotterdamrent],
    sources: [],
    request: {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
      }
    },
    directory: websitePathName,
  };

  // with promise
  return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('.listings .listing a').first().attr('href')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: https://www.rotterdamrent.com"+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
    // console.log(result)
  }).catch((err) => {
    console.log(err);
  });
}

var OneTwoThreeWonen = function(callback){
  var websiteName = '123wonen'
  var websitePathName = getPathName(websiteName)
  var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
  if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('.json-objects .pandlist-container').first().attr('onclick')
    // remove the folder since new data should be written
    deleteFolderRecursive(websitePathName);
  }


  options = {
    urls: [houselinks.OneTwoThreeWonen],
    sources: [],
    request: {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
      }
    },
    directory: websitePathName,
  };

  // with promise
  return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('.json-objects .pandlist-container').first().attr('onclick')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: "+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
    // console.log(result)
  }).catch((err) => {
    console.log(err);
  });
}

var perfectrent = function(callback){
  var websiteName = 'perfectrent'
  var websitePathName = getPathName(websiteName)
  var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
  if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('.aanbod .list-object .list-object-photo a').first().attr('href')
    // remove the folder since new data should be written
    deleteFolderRecursive(websitePathName);
  }


  options = {
    urls: [houselinks.perfectrent],
    sources: [],
    request: {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
      }
    },
    directory: websitePathName,
  };

  // with promise
  return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('.aanbod .list-object .list-object-photo a').first().attr('href')
    if (newFirstHouseLink !== oldFirstHouseLink) {
      var indexOfPlus = newFirstHouseLink.indexOf('+')
      newFirstHouseLink = newFirstHouseLink.slice(0,indexOfPlus) + newFirstHouseLink.slice((indexOfPlus+1),newFirstHouseLink.length)
      let text = "There is a new link: "+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
    // console.log(result)
  }).catch((err) => {
    console.log(err);
  });
}

var deblooisvastgoed = function(callback){
  var websiteName = 'deblooisvastgoed'
  var websitePathName = getPathName(websiteName)
  var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
  if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('#residences .residence .info a').first().attr('href')
    // remove the folder since new data should be written
    deleteFolderRecursive(websitePathName);
  }


  options = {
    urls: [houselinks.deblooisvastgoed],
    sources: [],
    request: {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
      }
    },
    directory: websitePathName,
  };

  // with promise
  return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('#residences .residence .info a').first().attr('href')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: "+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
    // console.log(result)
  }).catch((err) => {
    console.log(err);
  });
}

var valkvastgoed = function(callback){
  var websiteName = 'valkvastgoed'
  var websitePathName = getPathName(websiteName)
  var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
  if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('.propertiesBox .rent .photo a').first().attr('href')
    // remove the folder since new data should be written
    deleteFolderRecursive(websitePathName);
  }


  options = {
    urls: [houselinks.valkvastgoed],
    sources: [],
    request: {
      headers: {

      }
    },
    directory: websitePathName,
  };

  // with promise
  return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('.propertiesBox .rent .photo a').first().attr('href')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: "+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
    // console.log(result)
  }).catch((err) => {
    console.log(err);
  });
}

var houseSelect = function(callback){
  var websiteName = 'house-select'
  var websitePathName = getPathName(websiteName)
  var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
  if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('.results .listings .listing a').first().attr('href')
    // remove the folder since new data should be written
    deleteFolderRecursive(websitePathName);
  }


  options = {
    urls: [houselinks.houseSelect],
    sources: [],
    request: {
      headers: {

      }
    },
    directory: websitePathName,
  };

  // with promise
  return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('.results .listings .listing a').first().attr('href')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: https://www.house-select.nl"+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
    // console.log(result)
  }).catch((err) => {
    console.log(err);
  });
}

var amstelhousing = function(callback){
  var websiteName = 'amstelhousing'
  var websitePathName = getPathName(websiteName)
  var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
  if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('.results .listings .listing .listing-slider').first().attr('data-url')
    // remove the folder since new data should be written
    deleteFolderRecursive(websitePathName);
  }


  options = {
    urls: [houselinks.amstelhousing],
    sources: [],
    request: {
      headers: {

      }
    },
    directory: websitePathName,
  };

  // with promise
  return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('.results .listings .listing .listing-slider').first().attr('data-url')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: https://www.amstelhousing.nl"+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
    // console.log(result)
  }).catch((err) => {
    console.log(err);
  })
}

var vhpn = function(callback){
  var websiteName = 'vhpn'
  var websitePathName = getPathName(websiteName)
  var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
  if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('.box-wrap .status-publish .btn').first().attr('href')
    // remove the folder since new data should be written
    deleteFolderRecursive(websitePathName);
  }


  options = {
    urls: [houselinks.vhpn],
    sources: [],
    request: {
      headers: {

      }
    },
    directory: websitePathName,
  };

  // with promise
  return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('.box-wrap .status-publish .btn').first().attr('href')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: http://www.vhpn.nl/"+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
    // console.log(result)
  }).catch((err) => {
    console.log(err);
  })
}

var maashave = function(){
  var websiteName = 'maashave'
  var websitePathName = getPathName(websiteName)
  var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
  if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('.at-push-button .at-push-title a').first().attr('href')
    // remove the folder since new data should be written
    deleteFolderRecursive(websitePathName);
  }


  options = {
    urls: [houselinks.maashave],
    sources: [],
    request: {
      headers: {

      }
    },
    directory: websitePathName,
  };

  // with promise
  return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('.at-push-button .at-push-title a').first().attr('href')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: http://www.maashave.com"+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
    // console.log(result)
  }).catch((err) => {
    console.log(err);
  })
}

var homerent = function(){
  var websiteName = 'homerent'
  var websitePathName = getPathName(websiteName)
  var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
  if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('#search-result .house .house-content a').first().attr('href')
    // remove the folder since new data should be written
    deleteFolderRecursive(websitePathName);
  }


  options = {
    urls: [houselinks.homerent],
    sources: [],
    request: {
      headers: {

      }
    },
    directory: websitePathName,
  };

  // with promise
  return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('#search-result .house .house-content a').first().attr('href')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: https://www.homerent.nl"+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
    // console.log(result)
  }).catch((err) => {
    console.log(err);
  })
}

var indestad = function(){
  var websiteName = 'indestad'
  var websitePathName = getPathName(websiteName)
  var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
  if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('.all-properties .button-container a').first().attr('href')
    // remove the folder since new data should be written
    deleteFolderRecursive(websitePathName);
  }


  options = {
    urls: [houselinks.indestad],
    sources: [],
    request: {
      headers: {

      }
    },
    directory: websitePathName,
  };

  // with promise
  return scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('.all-properties .button-container a').first().attr('href')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: "+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
    // console.log(result)
  }).catch((err) => {
    console.log(err);
  })
}

var ooms = function(){
  var websiteName = 'ooms'
  var websitePathName = getPathName(websiteName)
  var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
  if (fs.existsSync(websitePathName+'index.html')) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('.items__overview .item--object--fw a').first().attr('href')
    // remove the folder since new data should be written
    deleteFolderRecursive(websitePathName);
  }


  options = {
    urls: [houselinks.ooms],
    sources: [],
    request: {
      headers: {

      }
    },
    directory: websitePathName,
  };

  // with promise
  return scrape(options).then((result) => {
    debugger;

    newWebsiteHtml = cheerio.load(result[0].text)

    newFirstHouseLink = newWebsiteHtml('.items__overview .item--object--fw a').first().attr('href')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: "+ newFirstHouseLink
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      console.log(text);
      // request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
    // console.log(result)
  }).catch((err) => {
    console.log(err);
  })
}

var fs = require('fs');
const cheerio = require('cheerio')
const Telegraf = require('telegraf')
var request = require('request');
var scrape = require('website-scraper');

const bot = new Telegraf('540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0')
bot.start((ctx) => {
  console.log('started:', ctx.from.id)
  return ctx.reply('Welcome!')
})
bot.startPolling();

function main() {

  bot.on('text', (ctx) => {
  // Explicit usage
    console.log(ctx.message.chat.id);
    ctx.telegram.sendMessage(ctx.message.chat.id, `Hello !!`)
  })

  // rdamapartments()
  // .then(benhousing)
  // .then(huurWoningen)
  // .then(verrarealestate)
  // .then(ideaalhousing)
  // .then(dopdop)
  // .then(rotterdamrent)
  // .then(OneTwoThreeWonen)
  // .then(perfectrent)
  // .then(deblooisvastgoed)
  // .then(valkvastgoed)
  // .then(houseSelect)
  // .then(amstelhousing)
  // .then(vhpn)
  // .then(maashave)
  // .then(homerent)
  // .then(indestad)
  ooms()

}


module.exports ={
	main: main
}
