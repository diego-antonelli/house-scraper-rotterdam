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

var getPathName = function(websiteName){
  var defaultPathName = './websiteSnaps/'
  return defaultPathName + websiteName + '/'
}

var fs = require('fs');
const cheerio = require('cheerio')
const Telegraf = require('telegraf')
var request = require('request');

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

  // generic path name vars
	var defaultPathName = './websiteSnaps/'
  var websiteName = ''
  var websitePathName = ''
  // generic html, html links
	var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''

  // scraper options
  var scrape = require('website-scraper');
  var options= {}
  //bot related
  var text = ''


  //  ############## Section for a RDAM APARTMENTS begins #############
  // websiteName = 'rdamapartments'
  // websitePathName = getPathName(websiteName)
  // // old website content
	// oldWebsiteHtml = ''
  // oldFirstHouseLink = ''
  // newWebsiteHtml = ''
  // newFirstHouseLink = ''
  // text = ''
  // // copy the old website contents if its exists
	// if (fs.existsSync(websitePathName)) {
  //   //get the html
  //   oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));
  //
  //   oldFirstHouseLink = oldWebsiteHtml('.housecontainer .houseblockcontainer .houseimage').first().attr('href')
  //   // remove the folder since new data should be written
	// 	deleteFolderRecursive(websitePathName);
	// }
  //
  //
	// options = {
	// 	urls: ['https://rotterdamapartments.com/en/Rental-apartments'],
  //   sources: [],
	// 	directory: websitePathName,
	// };
  //
	// // with promise
	// scrape(options).then((result) => {
  //
  //
  //   newWebsiteHtml = cheerio.load(result[0].text)
  //   newFirstHouseLink = newWebsiteHtml('.housecontainer .houseblockcontainer .houseimage').first().attr('href')
  //
  //   if (newFirstHouseLink !== oldFirstHouseLink) {
  //     let text = "There is a new link: "+ newFirstHouseLink
  //     request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
  //   }
  //   else {
  //     text = 'No new links for ' + websiteName
  //     request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
  //
  //   }
  //   //check if the links match, otherwise alarm !!
	// 	// console.log(result)
	// }).catch((err) => {
	// 	// console.log(err);
	// });
  //
  // //  ############## Section for a RDAM APARTMENTS ends #############


  // //  ############## Section for a Benhousing begins #############
  // websiteName = 'benhousing'
  // websitePathName = getPathName(websiteName)
	// oldWebsiteHtml = ''
  // oldFirstHouseLink = ''
  // newWebsiteHtml = ''
  // newFirstHouseLink = ''
  // text = ''
  // // copy the old website contents if its exists
	// if (fs.existsSync(websitePathName)) {
  //   //get the html
  //   oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));
  //
  //   oldFirstHouseLink = oldWebsiteHtml('#ajcontent .result-item .proc').first().attr('href')
  //   // remove the folder since new data should be written
	// 	deleteFolderRecursive(websitePathName);
	// }
  //
  //
	// options = {
	// 	urls: ['https://www.benhousing.nl/ons-verhuur-aanbod/'],
  //   sources: [],
	// 	directory: websitePathName,
	// };
  //
	// // with promise
	// scrape(options).then((result) => {
  //
  //
  //   newWebsiteHtml = cheerio.load(result[0].text)
  //   debugger;
  //   newFirstHouseLink = newWebsiteHtml('#ajcontent .result-item .proc').first().attr('href')
  //
  //   if (newFirstHouseLink !== oldFirstHouseLink) {
  //     let text = "There is a new link: "+ newFirstHouseLink
  //     request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
  //   }
  //   else {
  //     text = 'No new links for ' + websiteName
  //     request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
  //
  //   }
  //   //check if the links match, otherwise alarm !!
	// 	// console.log(result)
	// }).catch((err) => {
	// 	console.log(err);
	// });
  //
  // //  ############## Section for a Benhousing ends #############


  //  ############## Section for a huurWoningen begins #############
  websiteName = 'huurWoningen'
  websitePathName = getPathName(websiteName)
	oldWebsiteHtml = ''
  oldFirstHouseLink = ''
  newWebsiteHtml = ''
  newFirstHouseLink = ''
  text = ''
  // copy the old website contents if its exists
	if (fs.existsSync(websitePathName)) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('.listing-search__listings .listing__link').first().attr('href')
    // remove the folder since new data should be written
		deleteFolderRecursive(websitePathName);
	}


	options = {
		urls: ['https://www.huurwoningen.nl/in/rotterdam/?max_price=1000&number_of_rooms=15&size=50&sort=datetime_created&direction=desc&page=1'],
    sources: [],
    request: {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
      }
    },
		directory: websitePathName,
	};

	// with promise
	scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)
    debugger;
    newFirstHouseLink = newWebsiteHtml('.listing-search__listings .listing__link').first().attr('href')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: https://www.huurwoningen.nl"+ newFirstHouseLink
      request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
		// console.log(result)
	}).catch((err) => {
		console.log(err);
	});

  //  ############## Section for a huurWoningen ends #############



}


module.exports ={
	main: main
}
