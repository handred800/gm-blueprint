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
  return items[randomRange(itemsLength - 1)];
}

// https://dev.to/trekhleb/weighted-random-algorithm-in-javascript-1pdc
export function weightedRandom() {
  const weights = items.map((item) => item.weight);
  const cumulativeWeights = [];
  for (let i = 0; i < weights.length; i += 1) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  }

  const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];

  return () => {
    const randomNumber = maxCumulativeWeight * Math.random();

    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      if (cumulativeWeights[itemIndex] >= randomNumber) {
        return items[itemIndex]
      }
    }
  }

}