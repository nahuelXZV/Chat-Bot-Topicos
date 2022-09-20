const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
  nombre: {
    allowNull: false,
    type: String,
    required: true,
  },
  descripcion: {
    allowNull: false,
    type: String,
    required: false,
  },
  precio: {
    type: Number,
    required: true,
  },
  tamano: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const model = mongoose.model('Pizza', mySchema);
module.exports = model;
