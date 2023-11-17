"use strict";
import { Model } from "sequelize";
interface SupplierAttributes {
  id: string;
  name: string;
  email: string;
  phoneNumber: number;
  address: string;
  status: string;
  taxNumber: number;
  profileMaterial: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Suppliers
    extends Model<SupplierAttributes>
    implements SupplierAttributes
  {
    id!: string;
    name!: string;
    email!: string;
    phoneNumber!: number;
    address!: string;
    status!: string;
    taxNumber!: number;
    profileMaterial!: string;
    static associate(models: any) {
      Suppliers.hasOne(models.MaterialType);
      Suppliers.hasOne(models.RawMaterial);
      Suppliers.hasMany(models.Stat);
      Suppliers.hasMany(models.Categories);
    }
  }
  Suppliers.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      taxNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileMaterial: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Suppliers",
      timestamps: true,
    }
  );
  return Suppliers;
};
