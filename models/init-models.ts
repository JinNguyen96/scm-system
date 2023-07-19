import _Type from "./type";
import { DataTypes } from "sequelize";
import _Roles from "./roles";
import _Users from "./users";
import _Materials from './material';
import _Stats from './stats'
import _Categories from './categories';
import _MaterialTypes from './materialType'
import _Measurments from './measurment';
import _MURs from './mur';
import _RawMaterials from './rawMaterial';
import _TMURs from './tmur';
import _Units from './unit'
function initModels(sequelize: any) {
  const Type = _Type(sequelize, DataTypes);
  const Roles = _Roles(sequelize, DataTypes);
  const Users = _Users(sequelize, DataTypes);
  const Materials = _Materials(sequelize, DataTypes);
  const Stats = _Stats(sequelize, DataTypes);
  const Categories = _Categories(sequelize, DataTypes);
  const MaterialTypes = _MaterialTypes(sequelize, DataTypes);
  const Measurments = _Measurments(sequelize, DataTypes);
  const MURs = _MURs(sequelize, DataTypes);
  const RawMaterials = _RawMaterials(sequelize, DataTypes);
  const TMURs = _TMURs(sequelize, DataTypes);
  const Units = _Units(sequelize, DataTypes);

  // const Category

  Roles.belongsTo(Users, { as: 'Roles_id', foreignKey: "id" });
  Type.belongsTo(Users, { as: 'user_type', foreignKey: "id" });

  Users.hasMany(Roles, { as: "Users_userRole", foreignKey: "id" });
  Users.hasMany(Type, { as: "userType_Type", foreignKey: "id" });

  Stats.belongsToMany(Materials, {
    as: 'stat_id',
    through: "stat"
  })

  Materials.hasMany(Stats)

  return {
    Type,
    Roles,
    Users,
    Materials,
    Stats,
    Categories,
    MaterialTypes,
    Measurments,
    MURs,
    RawMaterials,
    TMURs,
    Units
  };
}
export default initModels;
