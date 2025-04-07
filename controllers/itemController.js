const Item = require('../models/item');

module.exports = {
  async create(req, res) {
    try {
      const item = await Item.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    const items = await Item.findAll();
    res.json(items);
  },

  async getOne(req, res) {
    const item = await Item.findByPk(req.params.id);
    item ? res.json(item) : res.status(404).json({ error: 'Item não encontrado' });
  },

  async update(req, res) {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item não encontrado' });
    await item.update(req.body);
    res.json(item);
  },

  async delete(req, res) {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item não encontrado' });
    await item.destroy();
    res.json({ message: 'Item deletado com sucesso' });
  }
};