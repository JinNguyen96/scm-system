'use strict';

import { Model, UUIDV4} from 'sequelize'
interface UserAttributes{
  id: number,
  name: string,
  email: string,
  password: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes>implements UserAttributes {
    id!: number;
    name!: string;
    email!:string;
    password!: string;
    static associate(models: any) {
      User.hasOne(models.User_Permission)
    }
  };

  User.init({
    id:{
      type: DataTypes.INTEGER,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};