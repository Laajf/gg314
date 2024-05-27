const mongoose = require('mongoose');

const userModel = require('./user');
const categoryModel = require('./category');

const gameSchema = new mongoose.Schema({
  title: {
      // Поле со строковым значением
    type: String,
    // Явно указываем, что поле обязательно при записи в базу нового документа
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
  }],
  // Добавляем поле для списка категорий
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: categoryModel,
  }],
});

gameSchema.statics.findGameByCategory = function(category) {
  return this.find({})
  .populate({
    path: "categories",
    math: { name: category }
  })
  .populate({
    path: "users",
    select: "-password"
  })
  .then(game => {
    return game.filter(game => game.categories.length > 0)
  })
}

const game = mongoose.model('games', gameSchema); 

module.exports = game;