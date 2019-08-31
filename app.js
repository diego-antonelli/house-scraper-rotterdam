var scraper  = require('./scraperIndex')

var intervalFirst = 900000
var intervalSec = 800000
var intervalThir = 700000

var currentInterval = intervalFirst;

// setInterval(function(){
//     scraper.main();
//     switch (currentInterval) {
//       case intervalFirst:
//         currentInterval = intervalSec
//         console.log('Changed the intervals to ', currentInterval);
//       break;
//       case intervalSec:
//         currentInterval = intervalThir
//         console.log('Changed the intervals to ', currentInterval);
//       break;
//       case intervalThir:
//         currentInterval = intervalFirst
//         console.log('Changed the intervals to ', currentInterval);
//       break;
//       default:
//     }
// }, currentInterval);
// setInterval(scraper.main, 10000);
scraper.main()
