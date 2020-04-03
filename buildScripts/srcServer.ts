const express = require('express');
const path = require('path');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const config = require('../webpack.config.js');

const port = 3000;
const app = express();
const compiler = webpack(config);

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port, function (err) {
    if (err){
        /* eslint-disable-next-line */
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }

});

app.use(middleware(compiler, {
    noInfo: true, publicPath: config.output.publicPath, stats:    { colors: true }
}));

app.use(middleware(compiler));

app.use(express.static(path.resolve(__dirname, 'dist')));