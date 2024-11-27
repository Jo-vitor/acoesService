import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 
import Ativo from './Ativo.js';
import Movimentacao from './Movimentacao.js';
import Transacao from './Transacao.js';

const User = sequelize.define('User', {
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
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  saldo: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  investido: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  carteiraUltimoMes: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  carteiraAtual: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  dataUltimaModificacaoCarteira: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
});

User.hasMany(Ativo, {
  foreingKey: 'clienteId'
});
Ativo.belongsTo(User, {
  constraint: true,
  foreingKey: 'userId'
});

User.hasMany(Movimentacao, {
  foreingKey: 'clienteId'
});
Movimentacao.belongsTo(User, {
  constraint: true,
  foreingKey: 'userId'
});

User.hasMany(Transacao, {
  foreingKey: 'userId'
});
Transacao.belongsTo(User, {
  constraint: true,
  foreingKey: 'userId'
});

export default User;