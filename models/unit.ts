'use strict';
import {
  Model
} from 'sequelize';
interface UnitAttributes {
  id: number,
  nameUnit: string,
  descUnit: string,

}
module.exports = (sequelize: any, DataTypes: any) => {
  class Units extends Model<UnitAttributes> implements UnitAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    nameUnit!: string;
    descUnit!: string;
    static associate(models: any) {
      // define association here
      Units.belongsToMany(models.MURs, { through: "unitId" })
    }
  }
  Units.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nameUnit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descUnit: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Units',
  });
  return Units;
};