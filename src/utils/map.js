import _ from 'lodash';
import { randomPointFromXY, getMapDataXY, randomRange } from './tool';
import { randomItem } from './item'

function randomUniqPoint(x, y, itemCount) {
  let coordinateList = [];
  const getRandomPoint = randomPointFromXY(x, y);

  function createUniqCoordinate(totalCount) {
    for (let pointCount = 0; pointCount < totalCount; pointCount++) {
       coordinateList.push(getRandomPoint());
    }
    coordinateList = _.uniqWith(coordinateList, _.isEqual);
    console.count('createUniqCoordinate')
    console.log(`${coordinateList.length}, ${itemCount}`)
  }

  while (coordinateList.length < itemCount) {
    createUniqCoordinate(itemCount - coordinateList.length)
  }

  return coordinateList
}

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
  const itemList = randomItem(itemCount);
  const randomPointList = randomUniqPoint(x, y, itemCount);

  for (let pointCount = 0; pointCount < itemCount; pointCount++) {
    const [coodrX, coodrY] = randomPointList[pointCount];
    map[coodrY][coodrX] = itemList[pointCount];
  }

  const itemInfo = _.reduce(itemList, (result, item) => {
    const name = item.data.name;
    if(result[name]) {
      result[name] += 1;
    } else {
      result[name] = 1;
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
      const {data, qty} = item
      return `<td data-item="${data.label}" data-name="${data.name}" data-qty="${qty}">${y},${x}</td>`
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