'use strict';
import {
  Model
} from 'sequelize';
interface MURAttributes {
  id: number,
  statId: number,
  unitId: number
}
export default (sequelize: any, DataTypes: any) => {
  class MURs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    statId!: number;
    unitId!: number;
    static associate(models: any) {
      // define association here
      MURs.hasOne(models.Measurments)
      MURs.hasOne(models.Units)
      MURs.hasOne(models.TMURs)
    }
  }
  MURs.init({
    statId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    unitId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'MURs',
  });
  return MURs;
};