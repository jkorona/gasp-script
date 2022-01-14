import { resolve, extname } from 'path';
import { promises as fs } from 'fs'

const IMGS = [
  '.jpg',
  '.jpeg',
  '.tiff',
]

function isMatchingType(fileName) {
  const extension = extname(fileName);
  return IMGS.includes(extension);
}

export async function* scan(src) {
  const dirents = await fs.readdir(src, { withFileTypes: true });
  for (const dirent of dirents) {
    const path = resolve(src, dirent.name); 
    if (dirent.isDirectory()) {
      yield* scan(path);
    } else if (isMatchingType(path)) {
      yield path;
    }
  }
}
