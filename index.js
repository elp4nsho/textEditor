const Route = require('./routeHandler');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(express.json())
app.use(bodyParser.text());

app.use(express.static(__dirname + '/'));
app.engine('pug', require('pug').__express)
const port = 8080;


(async () => {
    try {
        Route.allRoutes(app);
        app.listen(port, () => {});
        console.log("started.. at port: "+port)
    } catch (e) {
        console.log(e);
    }
})();




