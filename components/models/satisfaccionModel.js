const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
  opinion: {
    allowNull: false,
    type: String,
    unique: true,
  },
  cliente_id: {
    allowNull: false,
    type: mongoose.Types.ObjectId,
  },
  createdAt: {
    allowNull: false,
    type: Date,
    field: 'create_at',
    defaultValue: Date.now,
  },
});

const model = mongoose.model('Satisfaccion', mySchema);
module.exports = model;
