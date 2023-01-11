'use strict';
import { Model, UUIDV4 } from 'sequelize';
interface UserPermissionAttributes{
  id: number,
  user_perm: string
}

module.exports = (sequelize:any, DataTypes: any) => {
  class User_Permission extends Model<UserPermissionAttributes> implements UserPermissionAttributes {
    id!: number;
    user_perm!: string;
    static associate(models: any) {
      User_Permission.belongsTo(models.User)
    }
  }
  User_Permission.init({
    id:{
      type: DataTypes.INTEGER,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,

    },
   
    user_perm:{
      type: DataTypes.STRING,
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'User_Permission',
  });
  return User_Permission;
};