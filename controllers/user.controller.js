const { usermodel } = require("../models/user.model");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role)
      return res.status(400).send("All fileds are not present");

    const hash = bcrypt.hashSync(password, 8);

    const findUser = await usermodel.findOne({ email });

    if (findUser)
      return res.status(409).send({ messsage: "user already exist" });

    const user = new usermodel({ name, email, password: hash, role });
    await user.save();

    var token = jwt.sign({ id: user._id }, "secretKey");

    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.send({
      message: "user not created",
      error: error.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send("All fileds are not present");

    const findUser = await usermodel.findOne({ email });

    if (!findUser)
      return res.status(400).send({ message: "user does not exist" });

    const passwordCompare = bcrypt.compareSync(password, findUser.password);

    if (findUser && !passwordCompare)
      return res.status(400).send({ message: "wrond credentials" });

    var token = jwt.sign({ id: findUser._id }, "secretKey");

    res.status(200).send({
      message: "Login success",
      name: findUser.name,
      email,
      token,
      _id: findUser._id,
    });
  } catch (error) {
    res.status(400).send({ message: "login failed", error: error.message });
  }
};

module.exports = { addUser, Login };
