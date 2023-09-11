"use strict";
import { Model } from "sequelize";
interface MaterialAttributes {
  no: number;
  id: string;
  name: string;
  category_id: string;
  rawMaterial: string;
  quantity: string;
  group: string;
  price: string;
  subtotal: string;
  safe_quantity: number;
  status: string;
  metadata: string;
  note: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Materials
    extends Model<MaterialAttributes>
    implements MaterialAttributes
  {
    no!: number;
    id!: string;
    name!: string;
    category_id!: string;
    rawMaterial!: string;
    quantity!: string;
    group!: string;
    price!: string;
    subtotal!: string;
    safe_quantity!: number;
    status!: string;
    metadata!: string;
    note!: string;
    static associate(models: any) {
      Materials.hasOne(models.MaterialType);
      Materials.hasOne(models.RawMaterial);
      Materials.hasMany(models.Stat);
      Materials.hasMany(models.Categories);
    }
  }
  Materials.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rawMaterial: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      group: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtotal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      safe_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      metadata: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Materials",
      timestamps: true,
    }
  );
  return Materials;
};
