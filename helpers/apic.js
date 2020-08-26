var shell = require('shelljs');
const spawn = require('child_process').spawn;
//spawn('node', ['./index.js'], { shell: true, stdio: 'inherit' });

exports.cmd = (cmd) => {
    return new Promise((o, n) => {
        shell.exec(cmd, {silent: true}, (d, s, e) => {
            if (e.length > 0) {
                n(e);

            } else {
                console.log(s);
                o(s);
            }

        });

    });
};
