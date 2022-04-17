# GASP script

NodeJS script that **G**roups **A**nd **S**orts **P**hotos. 

Script follows algorithm described below:

1. Finds all the images in the `source` folder and all its subfolders
2. Reads photo creation date and time from file metadata (exif)
3. Sorts by date/time and groups by year, month and day
4. Saves photos in new ordered file structure under `target` location

Currently supported file types:
* `jpg`
* `jpeg`
* `tiff`
* `jiff`

## Installation

```bash
npm install -g gasp-script
```

## Usage

```bash
Usage: gasp [options] <source> <target>

Arguments:
  source             path to directory with photos to group & sort
  target             path to directory where grouped & sorted photos should be placed afterwards

Options:
  -V, --version      output the version number
  -s, --sort <dir>   sorting direction (choices: "asc", "dsc", default: asc)
  -m, --mode <mode>  defines how to process files (choices: "copy", "move", default: copy)
  -h, --help         display help for command
```
