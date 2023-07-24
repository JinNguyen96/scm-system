'use strict';
import {
  Model
} from 'sequelize';
interface UnitAttributes {
  id: string,
  name: string,
  description: string,

}
export default (sequelize: any, DataTypes: any) => {
  class Units extends Model<UnitAttributes> implements UnitAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    description!: string;
    static associate(models: any) {
      // define association here
      Units.belongsToMany(models.MURs, { through: "unitId" })
    }
  }
  Units.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Units',
  });
  return Units;
};