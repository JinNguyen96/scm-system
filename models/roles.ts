"use strict";
import { Model } from "sequelize";

export enum RolePerm {
  perUser_view = "USER_VIEW",
  perUser_add = "USER_ADD",
  perUser_edit = "USER_EDIT",
  perUser_delete = "USER_DELETE",
  perRole_view = "ROLES_VIEW",
  perRole_add = "ROLES_ADD",
  perRole_edit = "ROLES_EDIT",  
  perRole_delete = "ROLES_DELETE",
  perMaterial_view = "MATERIAL_VIEW",
  perMaterial_add = "MATERIAL_ADD",
  perMaterial_edit = "MATERIAL_EDIT",
  perMaterial_delete = "MATERIAL_DELETE",
}
export enum RoleScopes {
  own = "OWN",
  point = "POINT",
  type = "TYPE",
  all = "ALL",
}
interface RoleAttributes {
  id: string;
  roleName: string;
  roleDescription: string;
  rolePermission: RolePerm[];
  roleScopes: RoleScopes[];
}
export default (sequelize: any, DataTypes: any) => {
  class Roles extends Model<RoleAttributes> implements RoleAttributes {
    id!: string;
    roleName!: string;
    roleDescription!: string;
    rolePermission!: RolePerm[];
    roleScopes!: RoleScopes[];
    static associate(models: any) {
      Roles.belongsTo(models.Users);
    }
  }
  Roles.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      roleDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rolePermission: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleScopes: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Roles",
      timestamps: false,
    }
  );
  return Roles;
};
