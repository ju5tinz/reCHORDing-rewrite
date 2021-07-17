const User = require('../models/user');
const ChordGroup = require('../models/chordGroup');

module.exports = {
  curr: (req, res, next) => {
    User.findById(req.userData.userId, (err, user) => {
      if(err) {
        return next(err);
      } 
      
      ChordGroup.findById(user.currGroup, (err, group) => {
        if(err) {
          return next(err);
        }
  
        return res
          .status(200)
          .json({
            name: group.name,
            _id: group._id
          });
      });
    });
  }
}