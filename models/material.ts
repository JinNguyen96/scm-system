'use strict';
import {
  Model
} from 'sequelize';
interface MaterialAttributes {
  no: number,
  id: string,
  name: string,
  type_id: number,
  rawMaterial: number[],
  quantity: string,
  group: string,
  price: string,
  subtotal: string,
  stat: string,
  status: string,
  note: string,
}
export default (sequelize: any, DataTypes: any) => {
  class Materials extends Model<MaterialAttributes> implements MaterialAttributes {
    no!: number;
    id!: string;
    name!: string;
    type_id!: number;
    rawMaterial!: number[];
    quantity!: string;
    group!: string;
    price!: string;
    subtotal!: string;
    stat!: string;
    status!: string;
    note!: string;
    static associate(models: any) {
      Materials.hasOne(models.MaterialType)
      Materials.hasOne(models.RawMaterial)
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
        allowNull: false
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      rawMaterial: {
        type: DataTypes.INTEGER,
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
      stat: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      note: {
        type: DataTypes.STRING,
        allowNull: false,
      }

    },
    {
      sequelize,
      modelName: 'Materials',
      timestamps: true,
    });
  return Materials;
};