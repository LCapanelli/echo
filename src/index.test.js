const expect = require("chai").expect;
var chai = require('chai');
// https://www.chaijs.com/plugins/chai-dom/
chai.use(require('chai-dom'));
const fs = require("fs");
const jsdom = require("../node_modules/jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;

describe('First test', function () {
    it('should pass', function () {
        expect(true).to.equal(true);
    });
});

describe('index.html', function () {
    it('should show Venus', function (done) {
        const index = fs.readFileSync('./src/index.html', "UTF-8");
        const dom = new JSDOM(index);
        const { window } = (new JSDOM(``, { runScripts: "outside-only" }));

        const h2 = dom.window.document.getElementsByTagName('h2')[0];

        if (expect(h2).to.contain.html('Hello Venus!')){
            done();
            window.close();
        }
    });
})