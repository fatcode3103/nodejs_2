"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Role.hasOne(models.User, {
                foreignKey: "roleId",
                as: "roleUserData",
            });
            Role.hasMany(models.Group_Permission, {
                foreignKey: "roleId",
                as: "RGroupPermissionData",
            });
        }
    }
    Role.init(
        {
            name: DataTypes.STRING,
            roleId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Role",
        }
    );
    return Role;
};
