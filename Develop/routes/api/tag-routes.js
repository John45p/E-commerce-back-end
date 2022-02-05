const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
router.get('/', async(req, res) => {
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
        include: [{
            model: Product
        }]
    })
    res.status(200).json(allTags);
    console.log(allTags)
} catch (err) {
    res.status(500).json(err);
}
});

  // find a single tag by its `id`
router.get('/:id', async(req, res) => {
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Product
        }]
    })
    if (!oneTag) {
        res.status(404).json('No tag found with this id!');
        return;
    }
    res.status(200).json(oneTag);
} catch (err) {
    res.status(500).json(err);
}


});

  // create a new tag
router.post('/', async(req, res) => {
  try {
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  } catch (err) {
    res.status(400).json(err)
  }
});

  // update a tag's name by its `id` value
router.put('/:id', async(req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err)
  }
});

  // delete on tag by its `id` value
router.delete('/:id', async(req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!deleteTag) {
      res.status(404).json('No id found');
      return;
    }
    res.status(200).json(deleteTag);
  
    }catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
