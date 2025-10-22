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
parser.add_argument('-i', '--input-files', { help: "The ipynb-file of which to convert the cells to slides", required: true, dest: 'input' });
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
function main() {
    var notebook = JSON.parse(fs.readFileSync(args_.input, { encoding: 'utf8' }));
    var slide_notebook = convertToSlides(notebook);
    fs.writeFileSync(path.parse(args_.input).name + ".slides.ipynb", JSON.stringify(slide_notebook));
}
main();
