"use strict";
import { Model, UUIDV4 } from "sequelize";


interface StatsAttributes {
    id: string;
    statHeight: number;
    statLength: number;
    statWeight: number;
    statThickness: number;
    statColor: string;
    statVolume: number;
}
export default (sequelize: any, DataTypes: any) => {
    class Stats extends Model<StatsAttributes> implements StatsAttributes {
        id!: string;
        statWeight!: number;
        statLength!: number;
        statHeight!: number;
        statThickness!: number;
        statColor!: string;
        statVolume!: number;
        static associate(models: any) {
            Stats.belongsToMany(models.Materials, {
                through: "stat",
            });
        }
    }
    Stats.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            statWeight: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            statLength: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            statHeight: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            statColor: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            statThickness: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            statVolume: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

        },
        {
            sequelize,
            modelName: "Stats",
            timestamps: true
        }
    );
    return Stats;
};
