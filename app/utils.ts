export function getRandomId(length = 10) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
}

export function getMachineLabel() {
  return 'fwx-ml-' + getRandomId(5)
}
