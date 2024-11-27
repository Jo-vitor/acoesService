import Sequelize from 'sequelize';

const sequelize = new Sequelize('trabalho_ws', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;