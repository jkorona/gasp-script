import { format } from 'date-fns';
import pl from 'date-fns/locale/pl/index.js'

export function sort(files, options) {
  const sortFn = options.sort === 'asc' ?
    (a, b) => a.dateTime.getTime() - b.dateTime.getTime() :
    (a, b) => b.dateTime.getTime() - a.dateTime.getTime();

  return files
  .sort(sortFn)
  .reduce((model, file) => {
    const year = file.dateTime.getFullYear();
    const month = format(file.dateTime, 'LLLL', { locale: pl });
    const day = file.dateTime.getDate();
    
    let yearContainer = model[year] ?? {};
    let monthContainer = year[month] ?? {};
    let dayContainer = month[day] ?? [];
    
    dayContainer.push(file);

    monthContainer[day] = dayContainer;
    yearContainer = { ...yearContainer, [month]: monthContainer };
    return { ...model, [year]: yearContainer }
  }, {});
}
