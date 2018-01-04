const re = /^pG-(\d+)--pI-(\d+)$/

export function decodePaletteItem(encodedStr) {
  const res = re.exec(encodedStr)
  return res !== null ? {
    paletteGroupIndex: parseInt(res[1]),
    paletteItemIndex: parseInt(res[2])
  } : null
}
