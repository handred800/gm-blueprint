import _ from 'lodash';
import { randomPointFromXY, getMapDataXY, randomItem, randomRange, weightedRandom } from './tool';

// mapData generator
export function generateTreasureMap(x, y, treasureCount) {
  const map = [];
  const itemCount = treasureCount || randomRange(
    _.floor((x * y) / 4),
    _.ceil((x * y) / 10)
  )

  // 基本地塊
  for (let i = 0; i < y; i++) {
    let row = Array.from({ length: x }, () => 0);
    map[i] = row;
  }

  // 設置隨機 item
  const itemList = [];

  const getRandomItem = weightedRandom();
  const getRandomPoint = randomPointFromXY(x, y);

  for (let pointCount = 0; pointCount < itemCount; pointCount++) {
    const [coodrX, coodrY] = getRandomPoint();
    itemList[pointCount] = getRandomItem();
    map[coodrY][coodrX] = itemList[pointCount];
  }

  const itemInfo = _.reduce(itemList, (result, item) => {
    if(result[item.name]) {
      result[item.name] += 1;
    } else {
      result[item.name] = 1;
    }
    return result
  }, {})

  return { map, itemInfo };
}

// table render
export function drawTable($container, mapData) {
  const [x, y] = getMapDataXY(mapData);
  const $table = document.createElement('table');
  const $tbody = document.createElement('tbody');

  $container.innerHTML = '';

  function tdContent(x, y) {
    const cellX = x - 1;
    const cellY = y - 1;
    const item = mapData[cellX][cellY];

    if (item !== 0) {
      return `<td data-item="${item.label}" data-name="${item.name}">${y},${x}</td>`
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
  $container.append($table);
  $table.classList = 'table table-bordered'

}