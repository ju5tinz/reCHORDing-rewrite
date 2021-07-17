//TODO: rewrite this

module.exports = (chord) => {
  let selectedFrets = chord.selectedFrets
  let newSelectedFrets = [], size = 2
  while(selectedFrets.length > 0) newSelectedFrets.push(selectedFrets.splice(0, size))
  chord.selectedFrets = newSelectedFrets.slice()
  return {...chord.toJSON(), selectedFrets:newSelectedFrets}
}