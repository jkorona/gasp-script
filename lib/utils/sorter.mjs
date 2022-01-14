import { format } from 'date-fns';
import pl from 'date-fns/locale/pl/index.js'

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function sort(files, options) {
  const sortFn = options.sort === 'asc' ?
    (a, b) => a.dateTime.getTime() - b.dateTime.getTime() :
    (a, b) => b.dateTime.getTime() - a.dateTime.getTime();

  return files
  .sort(sortFn)
  .reduce((model, file) => {
    const year = file.dateTime.getFullYear();
    const month = capitalize(format(file.dateTime, 'LLLL', { locale: pl }));
    const day = format(file.dateTime, 'dd');
    
    let yearContainer = model[year] ?? {};
    let monthContainer = year[month] ?? {};
    let dayContainer = month[day] ?? [];
    
    dayContainer.push(file);

    monthContainer[day] = dayContainer;
    yearContainer = { ...yearContainer, [month]: monthContainer };
    return { ...model, [year]: yearContainer }
  }, {});
}
