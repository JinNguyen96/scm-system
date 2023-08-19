"use strict";
import { Model } from "sequelize";
interface MURAttributes {
  id: string;
  statId: string;
  unitId: string;
}
export default (sequelize: any, DataTypes: any) => {
  class MURs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    statId!: string;
    unitId!: string;
    static associate(models: any) {
      // define association here
      MURs.hasOne(models.Measurments);
      MURs.hasOne(models.Units);
      MURs.hasOne(models.TMURs);
    }
  }
  MURs.init(
    {
      statId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      unitId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "MURs",
    }
  );
  return MURs;
};
