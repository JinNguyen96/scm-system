'use strict';
import {
  Model
} from 'sequelize';
interface MeasurmentAttributes {
  id: number,
  nameMeasur: string,
  descMeasur: string,
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Measurments extends Model<MeasurmentAttributes> implements MeasurmentAttributes {
    id!: number;
    nameMeasur!: string;
    descMeasur!: string;
    static associate(models: any) {
      // define association here
      Measurments.belongsToMany(models.MURs, { through: "measurmentId" })
    }
  }
  Measurments.init({
    nameMeasur: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    descMeasur: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Measurments',
  });
  return Measurments;
};