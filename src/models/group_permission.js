"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Group_Permission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Group_Permission.belongsTo(models.Role, {
                foreignKey: "roleId",
                targetKey: "id",
                as: "RGroupPermissionData",
            });
            Group_Permission.belongsTo(models.Permission, {
                foreignKey: "permission",
                targetKey: "id",
                as: "PGroupPermissionData",
            });
        }
    }
    Group_Permission.init(
        {
            roleId: DataTypes.STRING,
            permission: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Group_Permission",
        }
    );
    return Group_Permission;
};
