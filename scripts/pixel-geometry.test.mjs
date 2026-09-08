import assert from 'node:assert/strict';
import { getGridSize, resolveDisplacements } from '../src/components/pixels/geometry.ts';
import { constrainPanelDisplacements } from '../src/components/pixels/panel-layout.ts';

const pixel = (row, col, displaceX = 1, displaceY = 1) => ({ row, col, displaceX, displaceY });
const size = { cols: 9, rows: 13 };
assert.deepEqual(getGridSize(390, 523, 40), size);
for (const value of [0, -1, NaN, Infinity]) assert.deepEqual(getGridSize(390, 523, value), { cols: 0, rows: 0 });
assert.deepEqual(getGridSize(20, 20, 40), { cols: 0, rows: 0 });
assert.deepEqual(resolveDisplacements([pixel(-1, -2)], size), [{ ...pixel(12, 7), index: 0 }]);
assert.deepEqual(resolveDisplacements([pixel(0, 9), pixel(1, -10), pixel(13, 0), pixel(-14, 0), pixel(0.5, 0), pixel(0, 0, Infinity)], size), []);
assert.deepEqual(resolveDisplacements([pixel(0, 0), pixel(0, 0, 2), pixel(0, -9)], size), [{ ...pixel(0, 0), index: 0 }]);
assert.deepEqual(resolveDisplacements([pixel(0, 0, 0, 0)], size), []);
assert.deepEqual(resolveDisplacements([pixel(-1, -1)], {cols:0, rows:0}), []);
assert.deepEqual(resolveDisplacements([pixel(0, 0)], getGridSize(0, 0, 40)), []);
// Source identity survives breakpoint-dependent validity.
assert.deepEqual(resolveDisplacements([pixel(0, 10), pixel(0, 1)], size), [{...pixel(0, 1), index:1}]);
const constrain = (input, grid, side) => constrainPanelDisplacements(resolveDisplacements(input, grid), grid, side).map(({index, ...d}) => d);
const panel = constrain([pixel(2, 2), pixel(0, 0, 4, 4), pixel(-1, -1, 8, 8), pixel(0, 1, -8, -8)], size, 'left');
assert.deepEqual(panel, [pixel(12, 8, 1, 3), pixel(0, 1, -2, -1)]);
assert.deepEqual(constrain([pixel(-1, 0, -8, 8)], size, 'right'), [pixel(12, 0, -1, 3)]);
assert.deepEqual(constrain([pixel(0, 0, 8, 8)], {cols:1, rows:1}, 'full'), [pixel(0, 0, 2, 3)]);
console.log('pixel geometry: passed');
