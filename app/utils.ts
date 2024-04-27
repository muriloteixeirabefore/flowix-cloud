export function get_random_id(length = 10) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
}

export function get_machine_label() {
  return 'fwx-ml-' + get_random_id(5)
}
