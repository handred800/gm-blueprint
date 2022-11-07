import * as ReactDOM from 'react-dom/client';
const root = ReactDOM.createRoot(document.getElementById("app"));
import App from './App';

root.render(<App />);

document.querySelector('#show').addEventListener('change', () => {
  document.querySelector('#app').classList.toggle('show');
})



