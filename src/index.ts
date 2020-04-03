const numeral = require('../node_modules/numeral')
import './styles/style.scss';

const value = numeral(999).format('$0,0.00');
console.log(`I would pay ${value} for this course!`); // eslint-disable-line no-console
