const filename = process.argv[2]; 

let shell = require("shelljs");

shell.exec("echo shell.exec running");
shell.exec(`json-server --watch ${filename} --port 8000`);