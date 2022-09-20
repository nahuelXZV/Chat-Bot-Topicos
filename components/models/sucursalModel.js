const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
  id: {
    allowNull: false, // not null
    autoIncrement: true,
    primaryKey: true,
    type: Number,
  },
  direccion: {
    allowNull: false,
    type: String,
    unique: true,
  },
  telefono: {
    allowNull: false,
    type: Number,
    unique: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
});

const model = mongoose.model('Sucursal', mySchema);
module.exports = model;
