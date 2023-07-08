'use strict';
import {
  Model
} from 'sequelize';
interface RawMaterialAttributes {
  id: number,
  nameRawMater: string,
  descRawMater: string,

}
module.exports = (sequelize: any, DataTypes: any) => {
  class RawMaterials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    nameRawMater!: string;
    descRawMater!: string;
    static associate(models: any) {
      // define association here
      RawMaterials.belongsToMany(models.Materials, { through: "rawMaterial" })
    }
  }
  RawMaterials.init({
    nameRawMater: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descRawMater: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    sequelize,
    modelName: 'RawMaterials',
  });
  return RawMaterials;
};