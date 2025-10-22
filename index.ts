import { ArgumentParser } from "argparse";
import * as path from "path";
import * as fs from "fs";
const version = require("./package.json");

const parser = new ArgumentParser({
    description: "Converts all markdown cells to slide cells"
});

parser.add_argument('-v', '--version', { action: "version", version: version })
const group = parser.add_mutually_exclusive_group({ required: true });
group.add_argument('-i', '--input-files', { help: "The ipynb-file of which to convert the cells to slides", dest: 'input', nargs: "+" })
group.add_argument('-d', '--directory', { help: "The directory where all notebooks are stored" });

const args_ = parser.parse_args();

type Notebook = {
    cells: {
        cell_type: string,
        id: string,
        metadata: object,
        source: string[]
    }[],
    metadata: any,
    nbformat: number,
    nbformat_minor: number
}

function convertToSlides(notebook: Notebook) {
    notebook.cells.forEach((cell) => {
        cell.metadata = {
            slideshow: {
                slide_type: "slide"
            }
        }
    });
    return notebook;
}

function convertNotebook(filepath: string) {
    const notebook: Notebook = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf8' }));
    const slide_notebook = convertToSlides(notebook);
    const parsedPath = path.parse(filepath);
    const outputPath = path.join(parsedPath.dir, parsedPath.name + ".slides.ipynb");
    fs.writeFileSync(outputPath, JSON.stringify(slide_notebook))
}

function main() {
    var inputFiles: string[] = [];
    if (args_.input != undefined) {
        inputFiles.concat(args_.input);
    } else if (args_.directory) {
        fs.readdirSync(args_.directory).forEach(item => {
            if (item.endsWith(".ipynb")) {
                inputFiles.push(path.join(args_.directory, item));
            };
        })
    }
    inputFiles.forEach(convertNotebook)
}

main()