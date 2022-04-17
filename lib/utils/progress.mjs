import clui from 'clui';
import clear from 'clear';

const progressBar = new clui.Progress(75);


export function progress(max, keepLogs) {
  let progress = 1;
  return () => {
    if (!keepLogs) {
      clear();
    }
    console.log('Copying...', progressBar.update(progress++, max));
  }
}
