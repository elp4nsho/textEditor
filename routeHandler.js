routes = require("./routes/routes");

exports.allRoutes = (app) => {
    routes.routes.get.forEach(r => {
        app.get(r.path, (req, res) => {
            r.functions(res, req)
        });
    });
    routes.routes.post.forEach(r => {
        app.post(r.path, (req, res) => {
            r.functions(res, req)
        });
    });
};
