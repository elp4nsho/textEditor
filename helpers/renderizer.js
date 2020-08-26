/*
const express = require('express');
const app = express();
const port = 8080;

/!*app.use(express.static(__dirname + '/'));

app.engine('html', require('ejs').renderFile);
/!*app.set('view engine', 'html');*!/
app.set('view engine', 'pug')
app.set('views', __dirname);*!/
app.get('/', (req, res) => {
    /!*res.render('pagina.pug',{catalogos:catalogos(),listaApis:listaApis});*!/
    //res.render('pagina.pug', {catalogos: catalogos()});
    res.end("hola");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
*/

exports.render = (res, content) => {

    return res.render('home.pug', content);
    //return res.render("home.pug");
};
exports.renderAdmin = (res, content) => {

    return res.render('admin.pug', content);
    //return res.render("home.pug");
};
exports.renderApic = (res, content) => {

    return res.render('apic.pug', content);
    //return res.render("home.pug");
};
exports.renderVisualizer = (res, content) => {
    return res.render('visualizer.pug', content);
};
exports.renderIt = (res, it) => {
    return res.send(it);
    //return res.render("home.pug");
};
