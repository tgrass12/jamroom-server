const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });

    if (!user) {
      return next({
        status: 400,
        message: 'Username or password is invalid.'
      });
    }

    let {id, username} = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        { id, username },
        process.env.SECRET_KEY
      );

      return res.status(200).json({
        id,
        username,
        token
      });
    }

    return next({
      status: 400,
      message: 'Username or password is invalid.'
    });

  } catch(err) {
    return next(err);
  }
}

exports.signup = async function(req, res, next) {
  try {
    console.log(req.body);
    let user = await db.User.create(req.body);
    let {id, username} = user;
    console.log('new user');
    console.log(user);
    let token = jwt.sign(
      {id, username},
      process.env.SECRET_KEY
    );
    
    return res.status(200).json({
      id,
      username,
      token
    });

  } catch(err) {
    if (err.code === 11000) {
      err.message = 'Username or Email is already in use';
    }
    console.log(err);
    return next({
      status: 400,
      message: err.message
    });
  }
}