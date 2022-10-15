import _ from 'lodash';
import { randomPointFromXY, getMapDataXY, randomItem, randomRange } from './tool';

// mapData generator
export function generateTreasureMap(x, y, treasureCount) {
  const map = [];
  const itemCount = treasureCount || randomRange(
    _.floor((x * y) / 4),
    _.ceil((x * y) / 10)
  )

  for (let i = 0; i < y; i++) {
    let row = Array.from({ length: x }, () => 0);
    map[i] = row;
  }

  function setTreasurePoint(map, point) {
    const randomPoint = randomPointFromXY(x, y);
    for (let j = 1; j <= point; j++) {
      const [coodrX, coodrY] = randomPoint();
      map[coodrY][coodrX] = randomItem();
    }
  }
  setTreasurePoint(map, itemCount);

  return map;
}

// table render
export function drawTable($el, mapData) {
  const $app = document.querySelector('#app');
  const [x, y] = getMapDataXY(mapData);
  const $table = document.createElement('table');
  const $tbody = document.createElement('tbody');

  function tdContent(x, y) {
    const cellX = x - 1;
    const cellY = y - 1;
    const item = mapData[cellX][cellY];

    if (item !== 0) {
      return `<td data-item="${item.status}">${item.name}</td>`
    } else {
      return `<td>${y},${x}</td>`
    }
  }

  for (let j = 0; j <= y; j++) {
    let $tr = '<tr>';
    for (let i = 0; i <= x; i++) {
      if (j === 0) {
        $tr += `<th>${i}</th>`
      } else if (i === 0) {
        $tr += `<th>${j}</th>`
      } else {
        $tr += tdContent(j, i)
      }
    }
    $tr += '</tr>'
    $tbody.insertAdjacentHTML('beforeend', $tr);
  }

  $table.append($tbody);
  $app.append($table);
  $table.classList = 'table table-bordered'

}