"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var argparse_1 = require("argparse");
var path = require("path");
var fs = require("fs");
var version = require("./package.json");
var parser = new argparse_1.ArgumentParser({
    description: "Converts all markdown cells to slide cells"
});
parser.add_argument('-v', '--version', { action: "version", version: version });
var group = parser.add_mutually_exclusive_group({ required: true });
group.add_argument('-i', '--input-files', { help: "The ipynb-file of which to convert the cells to slides", dest: 'input', nargs: "+" });
group.add_argument('-d', '--directory', { help: "The directory where all notebooks are stored" });
var args_ = parser.parse_args();
function convertToSlides(notebook) {
    notebook.cells.forEach(function (cell) {
        cell.metadata = {
            slideshow: {
                slide_type: "slide"
            }
        };
    });
    return notebook;
}
function convertNotebook(filepath) {
    var notebook = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf8' }));
    var slide_notebook = convertToSlides(notebook);
    var parsedPath = path.parse(filepath);
    var outputPath = path.join(parsedPath.dir, parsedPath.name + ".slides.ipynb");
    fs.writeFileSync(outputPath, JSON.stringify(slide_notebook));
}
function main() {
    var inputFiles = [];
    if (args_.input != undefined) {
        inputFiles.concat(args_.input);
    }
    else if (args_.directory) {
        fs.readdirSync(args_.directory).forEach(function (item) {
            if (item.endsWith(".ipynb")) {
                inputFiles.push(path.join(args_.directory, item));
            }
            ;
        });
    }
    inputFiles.forEach(convertNotebook);
}
main();
