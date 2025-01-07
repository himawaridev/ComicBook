const express = require('express');
const router = express.Router();
const TruyenTienHiep = require('../Model/TruyenTienHiep');

router.get('/', async (req, res) => {
    try {
        const truyenTienHiep = await TruyenTienHiep.findAll();
        res.json(truyenTienHiep);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching TruyenTienHiep' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const truyenTienHiep = await TruyenTienHiep.findByPk(id);
        if (!truyenTienHiep) {
            res.status(404).json({ message: 'TruyenTienHiep not found' });
        } else {
            res.json(truyenTienHiep);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching TruyenTienHiep' });
    }
});

router.post('/', async (req, res) => {
    try {
        const truyenTienHiep = await TruyenTienHiep.create(req.body);
        res.json(truyenTienHiep);
    } catch (error) {
        res.status(500).json({ message: 'Error creating TruyenTienHiep' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const truyenTienHiep = await TruyenTienHiep.findByPk(id);
        if (!truyenTienHiep) {
            res.status(404).json({ message: 'TruyenTienHiep not found' });
        } else {
            await truyenTienHiep.update(req.body);
            res.json(truyenTienHiep);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating TruyenTienHiep' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const truyenTienHiep = await TruyenTienHiep.findByPk(id);
        if (!truyenTienHiep) {
            res.status(404).json({ message: 'TruyenTienHiep not found' });
        } else {
            await truyenTienHiep.destroy();
            res.json({ message: 'TruyenTienHiep deleted' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting TruyenTienHiep' });
    }
});

module.exports = router;