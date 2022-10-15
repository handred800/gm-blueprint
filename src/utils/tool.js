import _ from 'lodash';
import { items } from '../data/item.json';

export function randomRange (max, min = 0) {
  return _.round(Math.random() * (max - min) + min);
}

export function randomPointFromXY(MaxX, MaxY, noRepeat = false) {
  if(noRepeat) {

  } else {
    return () => [_.round(Math.random() * (MaxX - 1)), _.round(Math.random() * (MaxY - 1))];
  }
}

export function getMapDataXY(mapData) {
  const x = mapData[0].length;
  const y = mapData.length;
  return [x, y]
}

export function randomItem() {
  const itemsLength = items.length;
  return items[_.round(Math.random() * (itemsLength - 1))];
}
