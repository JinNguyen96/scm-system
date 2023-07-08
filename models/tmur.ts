'use strict';
import {
  Model
} from 'sequelize';
interface TMURAttributes {
  id: number,
  materialTypeId: number,
  MURId: number
}
module.exports = (sequelize: any, DataTypes: any) => {
  class TMURs extends Model<TMURAttributes> implements TMURAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    materialTypeId!: number;
    MURId!: number;
    static associate(models: any) {
      // define association here
      TMURs.hasMany(models.MURs)
    }
  }
  TMURs.init({
    materialTypeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    MURId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'TMURs',
  });
  return TMURs;
};