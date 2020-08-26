const fs = require('fs');

exports.leerArchivo = (archivo) => {
    return new Promise((o, n) => {
        try {
            let data = fs.readFileSync(archivo, "utf-8");
            //console.log(data);
            o(data);
        } catch (e) {
            //console.log(e);
            n(e);
        }
    });
};


