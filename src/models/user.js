"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.Role, {
                foreignKey: "roleId",
                targetKey: "id",
                as: "roleUserData",
            });
        }
    }
    User.init(
        {
            name: DataTypes.STRING,
            age: DataTypes.STRING,
            roleId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
