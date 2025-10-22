import { ArgumentParser } from "argparse";
import * as path from "path";
import * as fs from "fs";
const version = require("./package.json");

const parser = new ArgumentParser({
    description: "Converts all markdown cells to slide cells"
});

parser.add_argument('-v', '--version', { action: "version", version: version })
parser.add_argument('-i', '--input-files', { help: "The ipynb-file of which to convert the cells to slides", required: true, dest: 'input' })

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

function main() {
    const notebook: Notebook = JSON.parse(fs.readFileSync(args_.input, { encoding: 'utf8' }));
    const slide_notebook = convertToSlides(notebook);
    fs.writeFileSync(path.parse(args_.input).name + ".slides.ipynb", JSON.stringify(slide_notebook))
}

main()