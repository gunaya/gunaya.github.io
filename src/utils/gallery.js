export function shuffle(items) {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function createSlots(photos) {
  const orientations = ['portrait', 'landscape', 'landscape', 'landscape', 'portrait', 'landscape', 'portrait', 'portrait']
  const remaining = shuffle(photos)
  return orientations.slice(0, remaining.length).map((orientation) => {
    const matching = remaining.findIndex((photo) => photo.orient === orientation)
    return remaining.splice(matching < 0 ? 0 : matching, 1)[0]
  })
}
