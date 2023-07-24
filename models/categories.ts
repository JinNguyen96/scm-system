'use strict';
import { Model } from 'sequelize';

interface CategoriesAttributes {
  id: string,
  name: string,
  description: string,
  stat: string,
  unit: string,
  isRequired: boolean,

}
export default (sequelize: any, DataTypes: any) => {
  class Categories extends Model<CategoriesAttributes> implements CategoriesAttributes {
    id!: string;
    name!: string;
    description!: string;
    stat!: string;
    unit!: string;
    isRequired!: boolean;
    static associate(models: any) {
      // define association here
    }
  }
  Categories.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};