

export function fetchRoom(id) {
  return new Promise((resolve, reject) => {
    resolve(require('mocks/room1'));
  });
}

export function reinforceNode(userId, nodeId, power) {
  return new Promise((resolve, reject) => {
    resolve();
  });
}
