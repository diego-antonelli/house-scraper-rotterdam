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
function main() {

  // default path name to copy websites to
	var defaultPathName = './websiteSnaps/'

  // old website content
	var htmltoCompare = ''

  // copy the old website contents if its exists
	if (fs.existsSync(defaultPathName)) {
    //get the html
    htmltoCompare = fs.readFileSync(defaultPathName+'index.html', 'utf8');

    // remove the folder since new data should be written
		deleteFolderRecursive(defaultPathName);
	}

	var scrape = require('website-scraper');
	var options = {
		urls: ['https://rotterdamapartments.com/en/Rental-apartments'],
    sources: [],
		directory: defaultPathName,
	};

	// with promise
	scrape(options).then((result) => {
		//TODO:compare it with htmltoCompare
		console.log(result)
	}).catch((err) => {
		console.log(err);
	});

}


module.exports ={
	main: main
}
