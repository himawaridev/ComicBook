const express = require('express');
const router = express.Router();
const TruyenTienHiepContent = require('../Model/TruyenTienHiepContent');

router.get('/', async (req, res) => {
    try {
        const truyenTienHiepContent = await TruyenTienHiepContent.findAll();
        res.json(truyenTienHiepContent);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching TruyenTienHiepContent' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const truyenTienHiepContent = await TruyenTienHiepContent.findByPk(id);
        if (!truyenTienHiepContent) {
            res.status(404).json({ message: 'TruyenTienHiepContent not found' });
        } else {
            res.json(truyenTienHiepContent);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching TruyenTienHiepContent' });
    }
});

router.post('/', async (req, res) => {
    try {
        const truyenTienHiepContent = await TruyenTienHiepContent.create(req.body);
        res.json(truyenTienHiepContent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating TruyenTienHiepContent' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const truyenTienHiepContent = await TruyenTienHiepContent.findByPk(id);
        if (!truyenTienHiepContent) {
            res.status(404).json({ message: 'TruyenTienHiepContent not found' });
        } else {
            await truyenTienHiepContent.update(req.body);
            res.json(truyenTienHiepContent);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating TruyenTienHiepContent' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const truyenTienHiepContent = await TruyenTienHiepContent.findByPk(id);
        if (!truyenTienHiepContent) {
            res.status(404).json({ message: 'TruyenTienHiepContent not found' });
        } else {
            await truyenTienHiepContent.destroy();
            res.json({ message: 'TruyenTienHiepContent deleted' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting TruyenTienHiepContent' });
    }
});

module.exports = router;