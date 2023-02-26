const adminTagController = {};

const Tag = require('../models/Tag')

// Crear una nueva etiqueta
adminTagController.postTag = async (req, res) => {
    const { name } = req.body
    const newTag = new Tag({
        name
    })

    newTag.save((err) => {
        if (err) {
        res.status(500).json({ error: err.message })
        } else {
        res.status(201).json({ message: 'Tag created' })
        }
    })
};

// Obtener todas las etiquetas
adminTagController.getTags = async (req, res) => {
    Tag.find({}, (err, tags) => {
        if (err) {
        res.status(500).json({ error: err.message })
        } else {
        res.status(200).json(tags)
        }
    })
};

// Obtener una etiqueta específica
adminTagController.getTag = async (req, res) => {
    const { id } = req.params
    Tag.findOne({ id }, (err, tag) => {
        if (err) {
        res.status(500).json({ error: err.message })
        } else if (!tag) {
        res.status(404).json({ message: 'Tag not found' })
        } else {
        res.status(200).json(tag)
        }
    })
};

// Actualizar una etiqueta
adminTagController.putTag = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    Tag.findOneAndUpdate({ id }, { name }, { new: true }, (err, tag) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else if (!tag) {
        res.status(404).json({ message: 'Tag not found' })
      } else {
        res.status(200).json({ message: 'Tag updated' })
      }
    })
};

// Eliminar una etiqueta
adminTagController.deleteTag = async (req, res) => {
    const { id } = req.params
    Tag.findByIdAndDelete(id, (err, tag) => {
        if (err) {
        res.status(500).json({ error: err.message })
        } else if (!tag) {
        res.status(404).json({ message: 'Tag not found' })
        } else {
        res.status(200).json({ message: 'Tag deleted' })
        }
    })
};

module.exports = adminTagController;