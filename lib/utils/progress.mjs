import clui from 'clui';
import clear from 'clear';

const progressBar = new clui.Progress(75);


export function progress(max) {
  let progress = 1;
  return () => {
    clear();
    console.log('Copying...', progressBar.update(progress++, max));
  }
}
