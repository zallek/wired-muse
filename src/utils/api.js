

export function fetchNetwork() {
  return new Promise((resolve, reject) => {
    resolve(require('mocks/network'));
  });
}
