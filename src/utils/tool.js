import _ from 'lodash';

export function randomRange (max, min = 0) {
  return _.round(Math.random() * (max - min) + min);
}

export function randomPointFromXY(MaxX, MaxY) {
  return () => [_.round(Math.random() * (MaxX - 1)), _.round(Math.random() * (MaxY - 1))];
}

export function getMapDataXY(mapData) {
  if(mapData.length === 0) return [0, 0]
  const x = mapData[0].length;
  const y = mapData.length;
  return [x, y]
}

// https://dev.to/trekhleb/weighted-random-algorithm-in-javascript-1pdc
export function weightedRandom(items, weights) {
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