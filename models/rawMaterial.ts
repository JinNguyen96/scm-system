'use strict';
import {
  Model
} from 'sequelize';
interface RawMaterialAttributes {
  id: string,
  name: string,
  description: string,

}
export default (sequelize: any, DataTypes: any) => {
  class RawMaterials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    nameRawMater!: string;
    descRawMater!: string;
    static associate(models: any) {
      // define association here
      RawMaterials.belongsToMany(models.Materials, { through: "rawMaterial" })
    }
  }
  RawMaterials.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.STRING,
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