var scraper  = require('./scraperIndex')

var intervalFirst = 1000 * 60 * 5
var intervalSec = 1000 * 60 * 10
var intervalThir = 1000 * 60 * 8

var currentInterval = intervalFirst;

if (false){
    setInterval(function(){
        scraper.main();
        switch (currentInterval) {
          case intervalFirst:
            currentInterval = intervalSec
            console.log('Changed the intervals to ', currentInterval);
          break;
          case intervalSec:
            currentInterval = intervalThir
            console.log('Changed the intervals to ', currentInterval);
          break;
          case intervalThir:
            currentInterval = intervalFirst
            console.log('Changed the intervals to ', currentInterval);
          break;
          default:
        }
    }, currentInterval);
}
else{
    scraper.main()
}

