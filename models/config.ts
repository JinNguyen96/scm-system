import { Sequelize } from "sequelize";
const sequelize = new Sequelize(process.env.DB_NAME_NEW as string, process.env.DB_USER_NEW as string, process.env.DB_PASS_NEW as string, {

  host: process.env.DB_HOST_NEW,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  port: '3306' as unknown as number,
  logging: false

});

export default sequelize;