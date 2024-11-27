import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 
import User from './User.js';

const Movimentacao = sequelize.define('Movimentacao', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: DataTypes.ENUM("Compra", "Venda", "Dividendo"),
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ativo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// User.hasMany(Movimentacao, {
//   foreingKey: 'clienteId'
// });
// Movimentacao.belongsTo(User, {
//   constraint: true,
// });

export default Movimentacao;