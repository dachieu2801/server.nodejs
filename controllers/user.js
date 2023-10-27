const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const configToken = require('../config/token');
// const TOKEN_SECRET = 'somethingrandom'

module.exports = {
  register: async (req, res, next) => {
    //kiểm tra xem username cótonf tại hay chưa
    const exist = await User.findOne({ email: req.query.email });
    if (exist) return res.status(422).json({ message: 'Email is exist' });
    const hashPassword = await bcrypt.hash(req.query.password, 12);

    const user = new User({
      ...req.query,
      hashPassword,
      role: 'client'
    });

    try {
      await user.save();
      res.status(200).json({ message: 'oke' });
    } catch (err) {
      res.status(400).json(err);
    }

  },
  allUsers: async (req, res, next) => {
    try {
      const users = await User.find({})
      res.status(200).json(users)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  collectUsers: async (req, res, next) => {
    try {
      const users = await User.find({})
      res.status(200).json(users)
    } catch (err) {
      res.status(404).json(err)
    }
  },
  // tao them
  signin: async (req, res, next) => {

    try {
      const user = await User.findOne({ email: req.query.email });
      if (!user) return res.status(422).json({ message: 'Email or Password is not correct' });


      const checkPassword = await bcrypt.compare(req.query.password, user.hashPassword);

      if (!checkPassword) return res.status(422).json({ message: 'Email or Password is not correct' });

      const token = jwt.sign({ _id: user._id, name: user.fullname, role: user.role }, configToken.secret, { expiresIn: 60 * 60 * 24 });

      res.status(200).json({ token, id: user._id, fullname: user.fullname });
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  },
  signinAdmin: async (req, res, next) => {

    try {
      const user = await User.findOne({ email: req.query.email });
      if (!user) return res.status(422).json({ message: 'Email or Password is not correct' });
      if (user.role === 'client') {
        return res.status(403).json({ message: 'Email or Password is not correct' })
      }
      const checkPassword = await bcrypt.compare(req.query.password, user.hashPassword);

      if (!checkPassword) return res.status(422).json({ message: 'Email or Password is not correct' });

      const token = jwt.sign({ _id: user._id, name: user.fullname, role: user.role }, configToken.secret, { expiresIn: 60 * 60 * 24 });

      res.status(200).json({ token, id: user._id, fullname: user.fullname, role: user.role });
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  },


  editUser: async (req, res, next) => {

    try {
      const user = await User.findOne({ email: req.query.email });
      if (!user) return res.status(422).json({ message: 'Email or Password is not correct' });
      if (user.role === 'client') {
        return res.status(403).json({ message: 'Email or Password is not correct' })
      }
      const checkPassword = await bcrypt.compare(req.query.password, user.hashPassword);

      if (!checkPassword) return res.status(422).json({ message: 'Email or Password is not correct' });

      const token = jwt.sign({ _id: user._id, name: user.fullname, role: user.role }, configToken.secret, { expiresIn: 60 * 60 * 24 });

      res.status(200).json({ token, id: user._id, fullname: user.fullname });
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  },
  detailUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(422).json({ message: 'Has not User' });

      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  },


}





