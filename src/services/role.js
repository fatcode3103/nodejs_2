import db from "../models/index";
import { Op } from "sequelize";

const getAllRoles = async () => {
    try {
        const res = await db.Role.findAll({
            include: {
                model: db.Group_Permission,
                as: "RGroupPermissionData",
                attributes: ["permission"],
                include: {
                    model: db.Permission,
                    as: "PGroupPermissionData",
                    attributes: ["name"],
                },
            },
        });
        const modifiedRes = res.map((item) => {
            const permissions = item.RGroupPermissionData.map((innerItem) => ({
                name: innerItem.PGroupPermissionData.name,
                permissionId: innerItem.permission,
            }));
            const { RGroupPermissionData, ...rest } = item.get({ plain: true });
            return {
                ...rest,
                permissionName: permissions.map((perm) => perm.name),
                permissionId: permissions.map((perm) => perm.permissionId),
            };
        });
        if (res)
            return {
                data: modifiedRes,
                message: "Get all roles successful",
            };
        throw { errorCode: 404, message: "Get all roles failed" };
    } catch (e) {
        throw e;
    }
};

const postNewRole = async (data) => {
    const t = await db.sequelize.transaction();
    try {
        if (!!data) {
            const role = await db.Role.create(
                {
                    name: data.name,
                },
                { transaction: t }
            );
            const bulkPermissionArray = data.permissionId.map((item) => {
                return {
                    roleId: role.id,
                    permission: item,
                };
            });
            const groupPermission = await db.Group_Permission.bulkCreate(
                bulkPermissionArray,
                { transaction: t }
            );

            const allRoles = await getAllRoles();
            if (!!role && !!groupPermission) {
                await t.commit();
                return {
                    data: allRoles.data,
                    message: "Add new role successful",
                };
            }
            throw { errorCode: 404, message: "Add new role failed" };
        }
        throw { errorCode: 400, message: "Add new role failed" };
    } catch (e) {
        await t.rollback();
        throw e;
    }
};

const getPermission = async () => {
    try {
        const res = await db.Permission.findAll();
        if (res)
            return {
                data: res,
                message: "Get all permissions successful",
            };
        throw { errorCode: 404, message: "Get all permissions failed" };
    } catch (e) {
        throw e;
    }
};

const deleteRole = async (roleId) => {
    try {
        if (!!roleId) {
            const res = await db.Role.findOne({
                where: { id: roleId },
            });
            if (res) {
                await res.destroy();
                await db.Group_Permission.destroy({
                    where: {
                        roleId: roleId,
                    },
                });
                const allRoles = await getAllRoles();
                return {
                    data: allRoles.data,
                    message: "Delete role successful",
                };
            }
            throw { errorCode: 404, message: "Delete role failed" };
        }
        throw { errorCode: 400, message: "Role not found" };
    } catch (e) {
        throw e;
    }
};

const updateRole = async (data) => {
    const { name, roleId, additionId, removeId } = data;
    try {
        const res = await db.Role.findOne({
            where: { id: roleId },
        });
        await res.update({
            name: name,
        });
        if (additionId && additionId.length > 0) {
            const bulkPermissionArray = data.additionId.map((item) => {
                return {
                    roleId: roleId,
                    permission: item,
                };
            });
            await db.Group_Permission.bulkCreate(bulkPermissionArray);
        }
        if (removeId && removeId.length > 0) {
            for (const item in removeId) {
                await db.Group_Permission.destroy({
                    where: {
                        [Op.and]: [
                            { roleId: roleId },
                            { permission: removeId[item] },
                        ],
                    },
                });
            }
        }
        const allRoles = await getAllRoles();
        if (res)
            return {
                data: allRoles.data,
                message: "Update role successful",
            };
        throw { errorCode: 404, message: "Update role failed" };
    } catch (e) {
        throw e;
    }
};

export { getAllRoles, postNewRole, getPermission, deleteRole, updateRole };
