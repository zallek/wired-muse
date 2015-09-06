export const nodes = [
  {id: 1, group: 1, value: 1},
  {id: 2, group: 1, value: 1},
  {id: 3, group: 1, value: 2},
  {id: 4, group: 1, value: 1},
  {id: 5, group: 1, value: 1},
  {id: 6, group: 1, value: 1},
  {id: 7, group: 2, value: 1},
  {id: 8, group: 2, value: 2},
  {id: 9, group: 2, value: 3},
];

export const edges = [
  {from: 1, to: 2},
  {from: 1, to: 3},
  {from: 2, to: 4},
  {from: 2, to: 5},
  {from: 2, to: 8},
  {from: 4, to: 6},
  {from: 4, to: 8},
  {from: 4, to: 9},
  {from: 7, to: 8},
  {from: 7, to: 9},
  {from: 8, to: 9},
];

export const groups = [
  {id: 1, color: '#F0AB00'},
  {id: 2, color: '#0756A5'},
];
