import _ from 'lodash';
import { randomRange, weightedRandom } from './tool';
import { items } from '../data/item.json';

export const randomItem = (() => {
  const weights = items.map((item) => item.weight);

  const randomFunc = weightedRandom(items, weights);

  return (count) => {
    const list = [];
    for (let index = 0; index < count; index++) {
      let item = randomFunc();
      
      list.push({
        data: item,
        qty: randomRange(item.qty[1], item.qty[0])
      });
    }
    return list;
  }
})()