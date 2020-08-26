const fs = require("fs"); // libreria para leer archivos


//funcion para obtener archivos del directorio actual
exports.obtenerArchivosDirecorioActual = () => {
    return new Promise((o, n) => {
        fs.readdir(process.cwd(), {withFileTypes: true}, (e, i) => {

            o(i);
            n(e);
        });
    });
};

exports.leerUnDirectorio = (dir) => {
    return new Promise((o, n) => {
        process.chdir(dir)
        fs.readdir("./",{withFileTypes: true}, (e, i) => {
            /*console.log(process.cwd()+"/"+dir)
            console.log(i)*/
            o(i);
            n(e);
        });

    });
};


exports.crearUnDirectorio = (nombre)=>{
    return new Promise((o,n)=>{
        fs.mkdir(`./${nombre}`,(e,d)=>{
            console.log(d)
            console.log(e)
            o(true);
            n(e);
        });

    })
};

exports.eliminarUnDirectorio = (nombre)=>{
    return new Promise((o,n)=>{
        fs.rmdir(`./${nombre}`,(e,d)=>{
            console.log(d)
            console.log(e)
            o(true);
            n(e);
        });

    })
};

exports.eliminarUnArchivo = (nombre)=>{
    return new Promise((o,n)=>{
        fs.unlink(`./${nombre}`,(e,d)=>{
            console.log(d)
            console.log(e)
            o(true);
            n(e);
        });

    })
};
exports.renombrarUnArchivo = (nombre,nuevoNombre)=>{
    return new Promise((o,n)=>{
        fs.rename(`./${nombre}`,`./${nuevoNombre}`,(e,d)=>{
            console.log(d);
            console.log(e);
            o(true);
            n(e);
        });
    });
};





//funcion para escribir en un archivo en concreto
exports.escribirArchivo = (data, archivo) => {
    return new Promise((o, n) => {
        fs.writeFile(archivo, data, (err) => {
            o(true);
            n(err);
        })
    })
};
//funcion para adjuntar una linea en un archivo en concreto
exports.adjuntarAlArchivo = (data, archivo) => {
    return new Promise((o, n) => {
        txtLast = fs.readFileSync(archivo, "utf-8");
        toWrite = `${txtLast}\n${data}`
        fs.writeFile(archivo, toWrite, (err) => {
            o(true);
            n(err);
        })
    })
};
