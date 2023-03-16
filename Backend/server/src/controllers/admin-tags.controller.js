const adminTagController = {};

const Tag = require('../models/Tag')

// Crear una nueva etiqueta
adminTagController.postTag = async (req, res) => {
    const { id, name } = req.body
    const newTag = new Tag({
      id,
      name
    })

    newTag.save((err) => {
        if (err) {
        res.status(500).json( err.message )
        } else {
        res.status(201).json( 'Etiqueta creada' )
        }
    })
};

// Obtener todas las etiquetas
adminTagController.getTags = async (req, res) => {
    Tag.find({}, (err, tags) => {
        if (err) {
        res.status(500).json( err.message )
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
        res.status(500).json( err.message )
        } else if (!tag) {
        res.status(404).json( 'Tag not found' )
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
        res.status(500).json( err.message )
      } else if (!tag) {
        res.status(404).json( 'Tag not found' )
      } else {
        res.status(200).json( 'Etiqueta actualizada' )
      }
    })
};

// Eliminar una etiqueta
adminTagController.deleteTag = async (req, res) => {
    const { id } = req.params
    Tag.findOneAndDelete({ id }, (err, tag) => {
        if (err) {
        res.status(500).json( err.message )
        } else if (!tag) {
        res.status(404).json( 'Tag not found' )
        } else {
        res.status(200).json({ message: 'Tag deleted' })
        }
    })
};

adminTagController.getMaxId = async (req, res) => {
  Tag.find({}, { _id: 0, id: 1 }, { sort: { id: -1 }, limit: 1 }, (err, result) => {
      if (err) {
          res.status(500).json( err.message )
      } else {
          res.status(200).json(result[0].id)
      }
  })
};

module.exports = adminTagController;