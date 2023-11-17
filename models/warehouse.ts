"use strict";
import { Model } from "sequelize";

interface warehouseAttributes {
  id: string;
  name: string;
  address: string;
  personInCharge: string;
  code: string;
  material: string;
  quantity: number;
}
export default (sequelize: any, DataTypes: any ) => {
  class Warehouse extends Model<warehouseAttributes> implements warehouseAttributes {
    id!: string;
    name!: string;
    address!: string;
    personInCharge!: string;
    code!: string;
    material!: string;
    quantity!: number;
    static associate(models: any) {
      // define association here
    }
  }
  Warehouse.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true
      },
      name: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      address:{
        type: DataTypes.STRING,
        allowNull: false
      },
      personInCharge:{
        type: DataTypes.STRING,
        allowNull:false
      },
      code: {
        type: DataTypes.STRING,
        allowNull:false
      },
      material: {
        type: DataTypes.STRING,
        references:{
          model: "Material",
          key: "id"
        }
      },
      quantity:{
        type: DataTypes.INTEGER,
        allowNull:false
      }
    },
    {
      sequelize,
      modelName: "Warehouse",
      timestamps: true,
    }
  );
  return Warehouse;
};
