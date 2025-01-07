const express = require('express');
const router = express.Router();
const Categories = require('../Model/Categories');

router.get('/', async (req, res) => {
    try {
        const categories = await Categories.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Categories.findByPk(id);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
        } else {
            res.json(category);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category' });
    }
});

router.post('/', async (req, res) => {
    try {
        const category = await Categories.create(req.body);
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Categories.findByPk(id);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
        } else {
            await category.update(req.body);
            res.json(category);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating category' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Categories.findByPk(id);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
        } else {
            await category.destroy();
            res.json({ message: 'Category deleted' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category' });
    }
});

module.exports = router;