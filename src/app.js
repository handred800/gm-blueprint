import { generateTreasureMap, drawTable } from "./utils/map";

function init (row, col, itemCount) {
  const $app = document.querySelector('#app');
  const { map, itemInfo } = generateTreasureMap(row, col, itemCount);
  
  console.table(map);
  console.table(itemInfo)
  drawTable($app, map)
}

// form
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  const row = parseInt(document.querySelector('#col').value);
  const col = parseInt(document.querySelector('#row').value);

  init(row, col);
})

document.querySelector('#show').addEventListener('change', () => {
  $app.classList.toggle('show');
})

init(10, 25)