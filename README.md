# GASP script

NodeJS script that **G**roups **A**nd **S**orts **P**hotos. 

Script follows algorithm described below:

1. Finds all the images in the `source` folder and all its subfolders
2. Reads photo creation date and time from file metadata (exif)
3. Sorts by date/time and groups by year, month, day or outputs flat list
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
  source                 path to directory with photos to group & sort
  target                 path to directory where grouped & sorted photos should be placed afterwards

Options:
  -V, --version          output the version number
  -s, --sort <dir>       sorting direction (choices: "asc", "dsc", default: asc)
  -v, --verbose          enables additional logging dor debugging
  -g, --groupby <level>  group photos by year, month, day, none (choices: "year", "month", "day", "none", default: none)
  -h, --help             display help for command
```
