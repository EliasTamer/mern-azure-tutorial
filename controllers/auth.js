const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require("uuid");

exports.signUp = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const encryptedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      id: uuidv4(),
      email,
      password: encryptedPassword,
      name,
    });

    const user = await newUser.save();

    return res.status(201).json({
      message: "success",
      user: user,
    });
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;


  try {
    const user = await User.findOne({ email: email })

    if (!user) {
      const error = new Error("email not found.")
      error.statusCode = 401;
      throw error;
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      const error = new Error("incorrect password");
      error.statusCode = 401;
      throw error
    }

    const token = jwt.sign({ email: user.email, id: user.id }, "secrethere", { expiresIn: '1h' })

    return res.status(201).json({
      status: "success",
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
        token
      }
    })
  } catch (error) {
    next(error);
  }
}