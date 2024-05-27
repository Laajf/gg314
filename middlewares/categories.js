
const category = require("../models/category");
const categories = require("../models/category");

const findAllCategories = async (req, res, next) => {
  req.categoriesArray = await categories.find({});
  next();
}

const findCategoryById = async (req, res, next) => {
  try {
    req.categories = await categories.findById(req.params.id)
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ meesage: "Не удалось найти категорию" }));
  }
}

const createCategory = async (req, res, next) => {
  console.log("POST /categories")
  try {
    console.log(req.body)
    req.categories = await categories.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Не удалось создать категорию" }));
  }
}

const updateCategory = async (req, res, next) => {
  console.log("Отработал")
  try {
    req.categories = await categories.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "aplication/json");
    res.status(400).send(JSON.stringify({ message: "не удалось обновить категории" }))
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    req.categories = await categories.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "aplication/json");
    res.status(400).send(JSON.stringify({ message: "не удалось Удалить категории" }))
  }
}

const checkIsCategoryExists = async (req, res, next) => {

  const isInArray = req.categoriesArray.find((categories) => {
    return req.body.name === categories.name
  });

  if (isInArray) {
    res.setHeader("Content-Type", "aplication/json");
    res.status(400).send(JSON.stringify({ message: "Категория с таким названием уже существует" }));
  } else {
    next();
  }

}

const checkEmptyName = async (req, res, next) => {
  if (!req.body.name || req.body.name.length === 0) {
    res.setHeader("Content-Type", "aplication/json");
    res.status(400).send(JSON.stringify({ message: "Данные пустые" }));
  } else {
    next();
  }
}


module.exports = {
  findAllCategories,
  createCategory,
  findCategoryById,
  updateCategory,
  deleteCategory,
  checkIsCategoryExists,
  checkEmptyName
};