export function decodePath(str) {
  return str.split('-').map(s => parseInt(s))
}
