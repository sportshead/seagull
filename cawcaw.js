const fs = require("fs");
const path = require("path");

const chokidar = require('chokidar');
const notifier = require('node-notifier');

const logLocation = path.join(process.env.HOMEDRIVE, process.env.HOMEPATH, "Documents/EVE/Logs/ChatLogs");
const files = fs.readdirSync(logLocation).filter(fn => fn.startsWith("Local_"));
const filename = path.join(logLocation, files[files.length - 1]);

console.log(`Detected log file ${filename}`)

const watcher = chokidar.watch(filename, { cwd: "." });
watcher.on("change", (path) => {
    const data = fs.readFileSync(path).toString("utf16le");
    const lines = data.split("\n");
    console.log(lines);
    const message = lines[lines.length - 2];
    console.log(`Received new line "${message}"`);
    notifier.notify(message);
});
watcher.on("ready", () => {
    console.log(`Ready`);
});
watcher.on("add", (path) => {
    console.log(`Watching ${path}`);
    notifier.notify(`Watching ${path}`);
});
