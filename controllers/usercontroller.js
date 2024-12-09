const User = require("../models/User"); // models

// Insert user function for registration
const insertuser = async (request, response) => {
  try {
    const input = request.body;
    const user = new User(input);
    await user.save();
    response.send('Registered Successfully');
  } catch (e) {
    response.status(500).send(e.message);
  }
};

// Check if user exists for login (reusing if needed)
const checkuserlogin = async (request, response) => {
  try {
    const input = request.body;
    const user = await User.findOne(input);
    response.json(user);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

// New function to check if email exists
const checkEmail = async (request, response) => {
  try {
    const { email } = request.body; // extracting email from request body
    const user = await User.findOne({ email: email });

    if (user) {
      return response.json({ exists: true }); // Email exists in DB
    } else {
      return response.json({ exists: false }); // Email not found
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

module.exports = { insertuser, checkuserlogin, checkEmail };
