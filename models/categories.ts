"use strict";
import { Model } from "sequelize";

interface CategoriesAttributes {
  id: string;
  name: string;
  no: number;
}
export default (sequelize: any, DataTypes: any) => {
  class Categories
    extends Model<CategoriesAttributes>
    implements CategoriesAttributes
  {
    id!: string;
    name!: string;
    no!: number;
    static associate(models: any) {
      // define association here
    }
  }
  Categories.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Categories",
    }
  );
  return Categories;
};
