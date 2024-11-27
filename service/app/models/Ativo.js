import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 
import User from './User.js';

const Ativo = sequelize.define('Ativo', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ticket: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM("Acao", "Fundo imobiliario"),
    allowNull: false,
  },
  precoUltimaCompra: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valorTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

// User.hasMany(Ativo, {
//   foreingKey: 'clienteId'
// });
// Ativo.belongsTo(User, {
//   constraint: true,
// });

export default Ativo;