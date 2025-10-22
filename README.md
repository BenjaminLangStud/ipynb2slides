# ipynb2slides

A simple tool to convert the cells in one or more jupyter notebooks to slide cells

## Installation

1. Install Node.js and npm (if not already installed)
2. Install the (only) dependency:
```
npm i argparse
```

## Running the script

A help message is available with:
```sh
node index.js -h
```

> [!CAUTION]
> This script is highly unoptimized and can probably break if not handled with care! You have been warned...

## Building from source

You will first need to install the dev-depencencies:

```sh
npm i typescript
npm i --save-dev @types/argparse
npm i --save-dev @types/node
```

Then you can run the typescript compiler to get the JavaScript file:

```sh
tsc
```