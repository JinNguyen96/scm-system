'use strict';
import {
  Model
} from 'sequelize';
interface TMURAttributes {
  id: string,
  categoryId: string,
  MURId: string,
  isRequired: boolean
}
export default (sequelize: any, DataTypes: any) => {
  class TMURs extends Model<TMURAttributes> implements TMURAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    categoryId!: string;
    MURId!: string;
    isRequired!: boolean;
    static associate(models: any) {
      // define association here
      TMURs.hasMany(models.MURs)
    }
  }
  TMURs.init({
    categoryId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    MURId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TMURs',
  });
  return TMURs;
};