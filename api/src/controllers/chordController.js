const mongoose = require('mongoose');
const Chord = require('../models/chord');
const ChordGroup = require('../models/chordGroup');

const unflattenChord = require('./util/unflattenChord');

module.exports = {
  add: (req, res) => {
    const chordData = req.body.chord;
  
    const chord = new Chord({
      selectedFrets: chordData.selectedFrets.flat(),
      openStrings: chordData.openStrings,
      topFret: chordData.topFret,
      currNotes: chordData.currNotes,
      chordName: chordData.chordName
    });
    
    
    chord.save(async (err) => {
      if (err) return next(err);

      const groupId = req.groupId;
      const group = await ChordGroup.findById(groupId);
      group.chords.push(mongoose.Types.ObjectId(chord._id));
      await group.save();

      const toSend = unflattenChord(chord);
      res.send(JSON.stringify(toSend));
    });
  },

  get: (req, res) => {
    const groupId = req.groupId;

    ChordGroup.findById(groupId, (err, group) => {
      if(err) {
        return next(err);
      }

      const chordIds = group.chords;

      Chord.find({
        '_id': { $in: chordIds }
      }, {}, { 
        sort: {'createdAt': 1}
      }, (err, chordList) => {
        if(err) {
          return next(err);
        }

        const newChordList = chordList.map(chord => unflattenChord(chord));

        res.send(JSON.stringify(newChordList));
      }
      )
    });
  },
}