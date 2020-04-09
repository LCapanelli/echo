const numeral = require('numeral');
const value = numeral(999).format('$0,0.00');
// import chalk from "chalk";
// const chalk = require('chalk');

document.addEventListener('DOMContentLoaded', () => {
  // do your setup here
  console.log('Initialized app');
  console.log(`I would pay ${value} for this course!`); // eslint-disable-line no-console

});
