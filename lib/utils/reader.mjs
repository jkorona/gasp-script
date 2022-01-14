import { promisify } from 'util';
import exif from 'jpeg-exif';
import { scan } from './scanner.mjs';

const parseExif = promisify(exif.parse);
const parseDate = (dateTimeString) => {
  const [date, time] = dateTimeString.split(' ');
  return new Date(`${date.replaceAll(':', '-')}T${time}.000Z`);
};

export async function read(src) {
  const files = [];
  for await (const name of scan(src)) {
    const exif = await parseExif(name);
    files.push({ name, dateTime: parseDate(exif.DateTime) });
  }
  return files;
}