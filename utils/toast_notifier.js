const exec = require('child_process').exec;

const toast_notify = (title, message) => {
    return new Promise((resolve, reject) => {
        exec(`SnoreToast.exe -t "${title}" -m "${message}" -p logo.png  -w`, { cwd: "./snoretoast"}, (err, stdout, stderr) => {
            if(err) reject(err);
        }).on('exit', code => {
            resolve(code);
        });
    });
}

module.exports = { toast_notify: toast_notify };