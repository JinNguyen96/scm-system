"use strict";
import { Model, DataTypes } from "sequelize";
export interface UserAttributes {
  id: number;
  userType: number[];
  userEmail: string;
  userPassword: string;
  userRole: number[];
  userPhoneNumber: number;
  userFirstName: string;
  userLastName: string;
  userDob: Date;
  userAdress: string;
  relatedUser: string;
  relatedType: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Users extends Model<UserAttributes> implements UserAttributes {
    [x: string]: any;
    id!: number;
    userType!: number[];
    userEmail!: string;
    userPassword!: string;
    userRole!: number[];
    userPhoneNumber!: number;
    userFirstName!: string;
    userLastName!: string;
    userDob!: Date;
    userAdress!: string;
    relatedUser!: string;
    relatedType!: string;
    static associate(models: any) {
      Users.hasMany(models.Type);
      Users.hasMany(models.Roles);
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Type",
          key: "id",
        },
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      userPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Roles",
          key: "id",
        },
      },
      userPhoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      userFirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userLastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userDob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      userAdress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      relatedUser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      relatedType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
      timestamps: false,
    }
  );
  return Users;
};
