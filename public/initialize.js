var numeral = require('numeral');
var value = numeral(999).format('$0,0.00');
document.addEventListener('DOMContentLoaded', function () {
    // do your setup here
    console.log('Initialized app');
    console.log("I would pay " + value + " for this course!"); // eslint-disable-line no-console
});
