'use strict';
import { Model }
  from 'sequelize';

interface MaterialTypeAttributes {
  nameMaterType: string,
  noMaterType: number,
  id: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class MaterialTypes extends Model<MaterialTypeAttributes> implements MaterialTypeAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    nameMaterType!: string;
    noMaterType!: number;
    id!: number;
    static associate(models: any) {
      // define association here
    }
  }
  MaterialTypes.init({
    nameMaterType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    noMaterType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'MaterialTypes',
  });
  return MaterialTypes;
};