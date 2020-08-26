Render = require("../helpers/renderizer");
Writer = require("../helpers/writter");
Reader = require("../helpers/reader");
Apic = require("../helpers/apic");
exports.routes = {

    get: [
        {
            "name": "root",
            "path": "/",
            "functions": async (res, req) => {
                Render.render(res,
                    {
                        files: await Writer.obtenerArchivosDirecorioActual(),
                        /*       archivoLeido: await Reader.leerArchivo('./data.txt'),*/
                        directorioActual: process.cwd()
                    });
            }
        },
        {
            "name": "apic",
            "path": "/apic",
            "functions": async (res, req) => {
                Render.renderApic(res,
                    {
                    });
            }
        }, {
            "name": "admin",
            "path": "/admin",
            "functions": async (res, req) => {
                data = {}
                archivos = await Writer.leerUnDirectorio("C:\\Users\\LT-FCISTERNAS\\asd\\Storage");

                for (a of archivos) {

                    arch = await Reader.leerArchivo(a.name);
                    arch = JSON.parse(arch);
                    arch["nombreArchivo-" + a.name] = a.name;
                    console.log(arch)
                    data = {...data, ...arch};
                }
                /*      archivos.forEach(async a => {
                          arch = await Reader.leerArchivo(a.name);
                          arch = JSON.parse(arch);
                          data = {...data,...arch}
                      });*/
                console.log(data);

                await Render.renderAdmin(res,
                    {data: data});

            }
        },
        {
            "name": "rooat",
            "path": "/oli",
            "functions": (res, req) => {
                Render.renderIt(res, "hola");

            }
        },
        {
            "name": "devolver un archivo",
            "path": "/file/:name",
            "functions": async (res, req) => {
                try {
                    Render.renderIt(res, await Reader.leerArchivo('./' + req.params.name));

                } catch (e) {
                    res.status(500);
                    Render.renderIt(res, e);

                }

            }
        },
        {
            "name": "listar un directorio",
            "path": "/directorio",
            "functions": async (res, req) => {
                directorios = [];
                archivos = await Writer.leerUnDirectorio(req.query.dir);
                archivos.forEach(d => {
                    directorios.push({name: d.name, isDirectory: d.isDirectory()})
                });
                Render.renderIt(res, directorios);

            }
        },
        {
            "name": "visulizador de yaml",
            "path": "/viewer",
            "functions": async (res, req) => {

                Render.renderVisualizer(res,{});

            }
        }
    ],
    post: [
        {
            "name": "echo",
            "path": "/oli",
            "functions": (res, req) => {

                Render.renderIt(res, req.body);
                Writer.adjuntarAlArchivo(JSON.parse(req.body).texto, "data.txt");
                console.log(JSON.parse(req.body).texto);
            }
        },
        {
            "name": "sobreescribir o crear un archivo",
            "path": "/crear/:file",
            "functions": (res, req) => {
                console.log(req.body);
                Render.renderIt(res, Writer.escribirArchivo(req.body, req.params.file));

            }
        },
        {
            "name": "escribir en un archivo",
            "path": "/escribir/:file",
            "functions": (res, req) => {
                console.log(req.body);
                Render.renderIt(res, Writer.escribirArchivo(req.body, req.params.file));

            }
        },
        {
            "name": "datos que se actualizan",
            "path": "/refreshed",
            "functions": (res, req) => {

                Render.renderIt(res, {
                    rutaActual: process.cwd()
                });

            }
        },
        {
            "name": "crear un directorio",
            "path": "/create/dir",
            "functions": (res, req) => {
                console.log(JSON.parse(req.body).name);
                Writer.crearUnDirectorio(JSON.parse(req.body).name);
                Render.renderIt(res, "OK");

            }
        },
        {
            "name": "eliminar un directorio",
            "path": "/delete/dir",
            "functions": (res, req) => {
                console.log(JSON.parse(req.body).name);
                Writer.eliminarUnDirectorio(JSON.parse(req.body).name);
                Render.renderIt(res, "OK");

            }
        },
        {
            "name": "eliminar un archivo",
            "path": "/delete/file",
            "functions": (res, req) => {
                console.log(JSON.parse(req.body).name);
                Writer.eliminarUnArchivo(JSON.parse(req.body).name);
                Render.renderIt(res, "OK");

            }
        },
        {
            "name": "renombrar un archivo",
            "path": "/rename/file",
            "functions": (res, req) => {
                console.log(JSON.parse(req.body));
                Writer.renombrarUnArchivo(JSON.parse(req.body).name, JSON.parse(req.body).newName);
                Render.renderIt(res, "OK");

            }
        },
        {
            "name": "escribir comando en la terminal",
            "path": "/cmd",
            "functions": async (res, req) => {
                res.setHeader("content-type", "text/plain")
                try {
                    console.log(req.body)
                    result = await Apic.cmd(JSON.parse(req.body).comando);
                    Render.renderIt(res, result);

                } catch (e) {
                    Render.renderIt(res, e);
                }

            }
        }
    ]


};
