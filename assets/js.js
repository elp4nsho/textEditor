var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
var rutaActual = "";
var dirs = [];
var archivoSeleccionado = document.getElementById("archivoEditando").value;

function http(url, metodo, body) {


    const options = {
        headers: {"content-type": "text/plain"},
        method: metodo,
        body: body == '' ? null : body
    };
    return new Promise(async (o, n) => {


        await fetch(url, options)
            .then(async response => {
                if (response.ok) {
                    o(response.text())

                } else {
                    n(new Error(await response.text()))
                }
            });

        //var response = await fetch(proxyUrl + url, options);
        await fetch("https://bouncy-glen-quiet.glitch.me/refreshed", {method: "POST"}).then(async (response) => {
            rutaActual = await response.text();
            refrescarDatos()
        });
    });

}

function refrescarDatos() {
    document.getElementById("ruta").innerText = JSON.parse(rutaActual).rutaActual;


}

function hola() {
    //http("http://localhost:8080/oli","GET").then(d=>console.log(d));
    texto = document.getElementById("text").value;
    http("https://bouncy-glen-quiet.glitch.me/oli", "POST", '{"texto": "' + texto + '"}').then(d => console.log(d));
}

function crearDirectorio(carpeta) {
    http("https://bouncy-glen-quiet.glitch.me/create/dir", "POST", '{"name":"' + carpeta + '"}')
        .then(d => {
            v
            console.log(d)
            obtenerDirectorios("./")
        })
        .catch(e => {
            alert(e)
        });
}

function eliminarDirectorio(carpeta) {
    http("https://bouncy-glen-quiet.glitch.me/delete/dir", "POST", '{"name":"' + carpeta + '"}')
        .then(d => {
            console.log(d)
            obtenerDirectorios("./")
        })
        .catch(e => {
            alert(e)
        });
}

function eliminarArchivo(archivo) {
    http("https://bouncy-glen-quiet.glitch.me/delete/file", "POST", '{"name":"' + archivo + '"}')
        .then(d => {
            console.log(d)
            obtenerDirectorios("./")
        })
        .catch(e => {
            alert(e)
        });
}

function obtenerArchivo(archivo) {
    http("https://bouncy-glen-quiet.glitch.me/file/" + archivo, "GET")
        .then(d => {
            console.log(d)
            archivoSeleccionado = archivo;
            document.getElementById("archivoEditando").value = archivo
            document.getElementById("archvioContenido").value = d
            document.getElementById("archvioContenido").elegido = archivo
        })
        .catch(e => {
            alert(`imposible leer el archivo ${archivo} error:${e}`)
        });
}


function recargarDirectorios(dirs) {
    console.log(dirs);

    a = document.getElementById("directorios");
    while (a.firstChild) {
        a.removeChild(a.firstChild)
    }
    li = document.createElement("li");
    li.innerText = "../";
    li.setAttribute("onclick", "obtenerDirectorios('../')");
    a.appendChild(li);


    console.log(dirs);

    dirs.forEach(d => {
        li = document.createElement("li");
        li.innerText = d.name;
        li.setAttribute("onclick", d.isDirectory ? `obtenerDirectorios("${d.name}")` : `obtenerArchivo("${d.name}")`)
        li.setAttribute("class", `${d.isDirectory ? "directorio" : "archivo"}`)
        a.appendChild(li);

        btn = document.createElement("button");
        btn.innerText = "X";

        btn.setAttribute("onclick", d.isDirectory ? `eliminarDirectorio("${d.name}")` : `eliminarArchivo("${d.name}")`);
        btn.setAttribute("class", `eliminar`);
        a.appendChild(btn);
    })

}

function obtenerDirectorios(dir) {
    http("https://bouncy-glen-quiet.glitch.me/directorio?dir=" + dir, "GET")
        .then(d => {
            dirs = JSON.parse(d);
            recargarDirectorios(JSON.parse(d));

        })
        .catch(e => {
            alert(e)
        });
}


function escribirArchivo() {
    var nombreArchivo = document.getElementById("archvioContenido").elegido;
    var contenidoArchivo = document.getElementById("archvioContenido").value;
    console.log(contenidoArchivo)
    http("https://bouncy-glen-quiet.glitch.me/crear/" + nombreArchivo, "POST", `${contenidoArchivo}`)
        .then(d => {
            console.log(d)
        })
        .catch(e => {
            alert("Imposible escribir el archivo")
        });

}

function crearArchivo(nombre) {
    http("https://bouncy-glen-quiet.glitch.me/crear/" + nombre, "POST", ``)
        .then(d => {
            console.log(d)
            obtenerDirectorios("./")
        })
        .catch(e => {
            alert("Imposible escribir el archivo")
        });
}

function renombrarArchivo() {
    nombre = document.getElementById("archivoEditando").value;

    http("https://bouncy-glen-quiet.glitch.me/rename/file", "POST", `{"name":"${archivoSeleccionado}","newName":"${nombre}"}`)
        .then(d => {
            console.log(d)
            obtenerDirectorios("./")
            obtenerArchivo(nombre)

        })
        .catch(e => {
            console.log(e)
            alert("Imposible escribir el archivo")
        });
}

function irAHome() {
    obtenerDirectorios("C:\\Users\\croshye\\ApiConnectAutom");
}

function agregar(key) {
    lista = document.getElementById("listaObjetos");
    li = document.createElement("li");
    li.innerText = key;
    label = document.createElement("label");
    input = document.createElement("input");

    li.appendChild(label)
    li.appendChild(input)
    lista.appendChild(li)


}


a = {
    "nombre": "api connect",
    "config": {"server": "urlServer", "organization": "fcisternas"},
    "nombreArchivo-objeto1": "objeto1",
    "cmds": [{"content": "hola"}, {"content": {"hola": "ola2"}}, {"content": " la tula"}],
    "nombreArchivo-objeto2": "objeto2"
}

//iterarObjeto(a)

function iterarObjeto(obj) {
    for (k in obj) {
        console.log(obj[k])
        console.log("tipo " + typeof obj[k])
        if (typeof obj[k] == "object") {
            iterarObjeto(obj[k])
        }
    }
}




