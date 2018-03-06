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

  // default path name to copy websites to
	var defaultPathName = './websiteSnaps/'


  //  ############## Section for a website begins #############
  var websiteName = 'rdamapartments'
  var websitePathName = defaultPathName + websiteName + '/'
  // old website content
	var oldWebsiteHtml = ''
  var oldFirstHouseLink = ''
  var newWebsiteHtml = ''
  var newFirstHouseLink = ''
  var text = ''
  // copy the old website contents if its exists
	if (fs.existsSync(websitePathName)) {
    //get the html
    oldWebsiteHtml = cheerio.load(fs.readFileSync(websitePathName+'index.html', 'utf8'));

    oldFirstHouseLink = oldWebsiteHtml('.housecontainer .houseblockcontainer .houseimage').first().attr('href')
    // remove the folder since new data should be written
		deleteFolderRecursive(websitePathName);
	}

	var scrape = require('website-scraper');
	var options = {
		urls: ['https://rotterdamapartments.com/en/Rental-apartments'],
    sources: [],
		directory: websitePathName,
	};

	// with promise
	scrape(options).then((result) => {


    newWebsiteHtml = cheerio.load(result[0].text)
    newFirstHouseLink = newWebsiteHtml('.housecontainer .houseblockcontainer .houseimage').first().attr('href')

    if (newFirstHouseLink !== oldFirstHouseLink) {
      let text = "There is a new link: "+ newFirstHouseLink
      request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});
    }
    else {
      text = 'No new links for ' + websiteName
      request('https://api.telegram.org/bot540567822:AAEQjj5l_kIhsfQjMIWopg-Loly0ZpIsrE0/sendMessage?chat_id=503848682&text='+ encodeURI(text), function (error, response, body) {});

    }
    //check if the links match, otherwise alarm !!
		// console.log(result)
	}).catch((err) => {
		// console.log(err);
	});

  //  ############## Section for a website ends #############
  


}


module.exports ={
	main: main
}
