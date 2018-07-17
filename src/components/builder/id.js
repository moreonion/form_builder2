var id = 0

export function setNextId (int) {
  id = parseInt(int, 10)
}

export function getNewId () {
  return id++
}
