var id = 0

export function registerTakenId (int) {
  int = parseInt(int, 10)
  // New ids start above the highest number that is already taken.
  if (int > id) {
    id = int + 1
  }
}

export function getNewId () {
  return id++
}
