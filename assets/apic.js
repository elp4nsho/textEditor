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

    });

}

function enviarComando() {
    document.getElementById("loading").style.display = "flex";

    cmd = document.getElementsByTagName("input")[0].value;
    http("http://localhost:8080/cmd", "POST", '{"comando":"' + cmd + '"}').then(d => {
        document.getElementsByTagName("textarea")[0].value = d;
        document.getElementById("historial").innerText += d;
        document.getElementById("loading").style.display = "none";
    })
}
