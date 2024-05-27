const bcrypt = require("bcryptjs");
const users = require("../models/user");

const findAllUsers = async (req, res, next) => {
  req.usersArray = await users.find({}), { password: 0 };
  next();
}

const hashPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(req.body.password, salt);

    req.body.password = hash;
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
}


const createUser = async (req, res, next) => {
  console.log("POOST /users")
  try {
    console.log(req.body)
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Не удалось создать пользователя" }));
  }
}

const findUserById = async (req, res, next) => {
  console.log("GET /users/:id");
  try {
    req.user = await users.findById(req.params.id, { password: 0 })
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "не удалось найти пользователей" }))
  }
}

const updateUser = async (req, res, next) => {
  try {
    req.user = await users.findByIdAndUpdate(req.params.id, req.body);
    next()
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "не удалось обновить пользователя" }))
    
  }
}

const deleteUser = async (req, res, next) => {
  try {
    req.user = await users.findByIdAndDelete(req.params.id);
    next();
  } catch {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "не удалось удалить пользователя" }))
  }
}

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (!req.body.username ||
      !req.body.email ||
      !req.body.password
   ) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Одно из полей не заполнено" }))
   } else {
    next();
   }
}

const checkEmptyNameAndEmail = async (req, res, next) => {
  if (!req.body.username || !req.body.email) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Одно из полей при обновлении не заполнено" }))
  } else {
    next();
  }
}



module.exports = {
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  hashPassword
};

// Проблема в роуте