import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 
import User from './User.js';

const Transacao = sequelize.define('Transacao', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: DataTypes.ENUM("Deposito", "Saque"),
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Transacao.belongsTo(User, {
//     constraint: true,
// });
// User.hasMany(Transacao, {
//     foreingKey: 'userId'
// });

export default Transacao;