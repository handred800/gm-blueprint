import _ from 'lodash';
import { randomPointFromXY, randomRange } from './tool';
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