'use strict';
import { Model } from "sequelize";
interface HistoryAttributes {
  id: string,
  material: string,
  personInCharge: string,
  code: string,
  quantity: string,
  name:string
}
export default (sequelize: any, DataTypes:any) => {
  class History extends Model<HistoryAttributes> implements HistoryAttributes {
    id!: string;
    material!: string;
    personInCharge!: string;
    code!: string;
    quantity!: string;
    name!:string
    static associate(models: any) {
      // define association here
    }
  }
  History.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    material:{
      type: DataTypes.STRING,
    },
    personInCharge:{
      type: DataTypes.STRING,
    },
    code:{
      type: DataTypes.STRING,
    },
    quantity:{
      type: DataTypes.STRING,
    },
    name:{
      type: DataTypes.STRING
    }

  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};