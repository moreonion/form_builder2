var id = 0

/**
 * Bump the id counter up so that existing ids are not used another time.
 * @param  {integer} int An already taken id.
 */
export function registerTakenId (int) {
  int = parseInt(int, 10)
  // New ids start above the highest number that is already taken.
  if (int >= id) {
    id = int + 1
  }
}

/**
 * Get a new id for a tree node.
 * @returns {integer} A new id.
 */
export function getNewId () {
  return id++
}
