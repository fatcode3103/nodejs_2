"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Permission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Permission.hasMany(models.Group_Permission, {
                foreignKey: "permission",
                as: "PGroupPermissionData",
            });
        }
    }
    Permission.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Permission",
        }
    );
    return Permission;
};
