#!/usr/bin/env node
"use strict";
var fs = require("fs");
var path = require("path");
var chalk = require("chalk");
var shell = require("shelljs");
var packageDependencies = require("../package.json").dependencies;
var cwd = process.cwd();
var scriptPath = __dirname;
var paths = [path.join(cwd, "..", "..", "hooks"), path.join(cwd, "..", "..", "hooks", "after_prepare")];
var dependencies = [];
var stat = null;
for (var dependency in packageDependencies) {
    dependencies.push(dependency);
}
paths.forEach(function (folder) {
    try {
        stat = fs.statSync(folder);
    }
    catch (err) {
        if (err.code === "ENOENT") {
            console.log(chalk.yellow.bold("Creating directory: " + folder));
            fs.mkdirSync(folder);
        }
    }
});
var minifyFilePath = path.join(cwd, "after_prepare", "ionic-minify.js");
var configFilePath = path.join(cwd, "minify-conf.json");
var minifyFile = fs.readFileSync(minifyFilePath, "utf8");
var configFile = fs.readFileSync(configFilePath, "utf8");
var minifyFileNewPath = path.join(paths[1], "ionic-minify.js");
var configFileNewPath = path.join(paths[0], "minify-conf.json");
console.log(chalk.cyan("Copying minifier file to project's hooks/after_prepare..."));
fs.writeFileSync(minifyFileNewPath, minifyFile);
try {
    stat = fs.statSync(configFileNewPath);
    console.log(chalk.yellow("You already have a minify-conf.json file..."));
}
catch (err) {
    if (err.code === "ENOENT") {
        console.log(chalk.cyan("Copying configuration file to project's hooks/ folder..."));
        fs.writeFileSync(configFileNewPath, configFile);
    }
}
console.log(chalk.cyan("Updating hooks directory to have execution permissions..."));
shell.chmod("-R", 755, paths[0]);
dependencies.forEach(function (dependency) {
    try {
        stat = fs.statSync(path.join(cwd, "..", dependency));
        console.log(chalk.yellow("It appears that you have already installed " + dependency + "..."));
    }
    catch (err) {
        if ((dependency !== "chalk" && dependency !== "shelljs") && err.code === "ENOENT") {
            console.log(chalk.blue("Copying " + dependency + " to your node_modules/ folder..."));
            fs.renameSync(path.join(cwd, "node_modules", dependency), path.join(cwd, "..", dependency));
        }
    }
});
console.log(chalk.green.bold("Ionic minify has been installed successfully! :)"));
