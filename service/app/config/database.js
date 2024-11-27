import Sequelize from 'sequelize';

const sequelize = new Sequelize('trabalho_ws', 'root', '12345678', {
  host: 'database-1.cehdhwhdylye.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
});

export default sequelize;
