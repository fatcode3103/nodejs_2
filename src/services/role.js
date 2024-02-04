import db from "../models/index";

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
            const namePermission = item.RGroupPermissionData.map(
                (innerItem) => innerItem.PGroupPermissionData.name
            );
            const { RGroupPermissionData, ...rest } = item.get({ plain: true });
            return { ...rest, namePermission: namePermission };
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

export { getAllRoles, postNewRole, getPermission, deleteRole };
