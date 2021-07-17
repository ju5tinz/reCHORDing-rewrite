const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/user');
const ChordGroup = require('../models/chordGroup');

const createToken = require('./util/createToken');

module.exports = {
  register: (req, res, next) => {
      //check if anyone with same username
    User.findOne({ 
      username: req.body.username
    }, (err, user) => {
      if (err) {
        return next(err);
      }
      //if no one has same username
      if(!user) {
        const saltRounds = parseInt(process.env.SALTROUNDS);
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          if (err) {
            return next(err);
          } else {
            const chordGroup = new ChordGroup({
              name: "default",
              fretboards: []
            });

            const user = new User({
              username: req.body.username,
              hashedPassword: hash,
              currGroup: mongoose.Types.ObjectId(chordGroup._id)
            });

            user.chordGroups.push(mongoose.Types.ObjectId(chordGroup._id));

            user.save((err) => {
              if(err) {
                return next(err);
              } else {
                chordGroup.save((err) => {
                  if(err) {
                    return next(err);
                  } else {
                    token = createToken(user);

                    const userCookieOptions = {
                      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                      httpOnly: true,
                      sameSite: 'none'
                    };
            
                    return res
                      .status(200)
                      .cookie('user', token, userCookieOptions)
                      .json({
                        message: "Account Created",
                        currGroup: {
                          name: chordGroup.name,
                          _id: chordGroup._id,
                        }
                      });
                  }
                });
              }
            });
          }
        });
      } else {
        return res.status(409).json({
          message: "Username exists"
        });
      }
    });
  },

  login: (req, res) => {
    User.findOne({
      username: req.body.username
    }, 
    '_id username hashedPassword currGroup',
    async (err, user) => {
      if(err) {
        return next(err);
      }
      if(!user) {
        return res.status(401).json({
          message: "Incorrect password or username"
        });
      } else {
        const match = await bcrypt.compare(req.body.password, user.hashedPassword);
  
        if(match) {
          token = createToken(user);
  
          const userCookieOptions = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 *1000),
            httpOnly: true,
            sameSite: 'None',
            secure: true
          };
  
          ChordGroup.findById(user.currGroup, 'name _id', (err, currGroup) => {
            return res
              .status(200)
              .cookie('user', token, userCookieOptions)
              .json({
                message: "Logged In",
                currGroup
              });
          });
        } else {
          return res.status(401).json({
            message: "Incorrect password or username"
          });
        }
      }
    });
  },

  logout: (req, res) => {
    return res
      .status(200)
      .cookie('user', '', {expires: new Date(0)})
      .json({
        message: "Logged Out"
      });
  }
}