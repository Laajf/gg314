const sendAllCategories = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.categoriesArray));
}

const sendCategoryCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));
}

const sendCategoryById = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));
}

const sendCategoryUpdated = (req, res) => {
  res.setHeader("Content-Type", "aplication/json");
  res.status(200).send(JSON.stringify({ message: "Категория обновилась" }))
}

const sendCategoryDelete = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));
}

module.exports =  {
  sendAllCategories,
  sendCategoryCreated,
  sendCategoryById,
  sendCategoryUpdated,
  sendCategoryDelete
}; 