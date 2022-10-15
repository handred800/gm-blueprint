import { generateTreasureMap, drawTable } from "./utils/map";

const $app = document.querySelector('#app');
const map = generateTreasureMap(10, 50);

console.table(map);
drawTable($app, map)
