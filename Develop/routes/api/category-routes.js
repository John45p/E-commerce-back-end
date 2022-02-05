const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  // find all categories
router.get('/', async(req, res) => {
  // be sure to include its associated Products
try {
  const allCategory = await Category.findAll({
    include: [{
      model: Product,
      as: 'products'
    }]
  })
  res.status(200).json(allCategory);
console.log(allCategory)
} catch (err) {
  res.status(500).json(err);
}
});

 // find one category by its `id` value
router.get('/:id', async(req, res) => {
  // be sure to include its associated Products
  try {
    const oneCategory = await Category.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Product
        }]
    })

    if (!oneCategory) {
        res.status(404).json('No category found with this id!');
        return;
    }

    res.status(200).json(oneCategory);
} catch (err) {
    res.status(500).json(err);
}
});

  // create a new category
router.post('/', async(req, res) => {
try {
  const createCategory = await Category.create(req.body);
  res.status(200).json(createCategory);
} catch (err) {
  res.status(400).json(err)
}
});

  // update a category by its `id` value
router.put('/:id', async(req, res) => {
  try {
    const putCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(putCategory);
  } catch (err) {
    res.status(400).json(err)
  }

});

  // delete a category by its `id` value
router.delete('/:id', async(req, res) => {
try {
const deleteCategory = await Category.destroy({
  where: {
    id: req.params.id
  },
});
if (!deleteCategory) {
  res.status(404).json('No id found');
  return;
}
res.status(200).json(deleteCategory);


}catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
