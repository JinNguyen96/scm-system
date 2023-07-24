'use strict';
import {
  Model
} from 'sequelize';
interface StatsAttributes {
  id: string,
  name: string,
  description: string,
}
export default (sequelize: any, DataTypes: any) => {
  class Stats extends Model<StatsAttributes> implements StatsAttributes {
    id!: string;
    name!: string;
    description!: string;
    static associate(models: any) {
      // define association here

    }
  }
  Stats.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Stats',
  });
  return Stats;
};