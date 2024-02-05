import db from "../models/index";

const getAllUsers = async () => {
    try {
        const res = await db.User.findAll({
            include: {
                model: db.Role,
                as: "roleUserData",
                attributes: ["name", "id"],
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
            },
        });
        if (res) {
            const modifiedRes = res.map((item) => {
                const { roleUserData, ...rest } = item.get({ plain: true });
                const permissionArray = [];
                if (roleUserData && roleUserData.RGroupPermissionData) {
                    roleUserData.RGroupPermissionData.forEach((innerItem) => {
                        permissionArray.push(
                            innerItem.PGroupPermissionData?.name || ""
                        );
                    });
                }
                return {
                    ...rest,
                    permission: permissionArray,
                    role: roleUserData?.name || null,
                };
            });

            return {
                data: modifiedRes,
                message: "Get all users successful",
            };
        }

        throw { errorCode: 404, message: "Get all users failed" };
    } catch (e) {
        throw e;
    }
};

const postNewUser = async (data) => {
    try {
        if (!!data) {
            const res = await db.User.create({
                name: data.name,
                age: data.age,
                roleId: data.roleId,
            });
            const allUsers = await getAllUsers();
            if (res)
                return {
                    data: allUsers.data,
                    message: "Add user successful",
                };
            throw { errorCode: 404, message: "Add user failed" };
        }
        throw { errorCode: 400, message: "User data not found" };
    } catch (e) {
        throw e;
    }
};

const deleteUser = async (userId) => {
    try {
        if (!!userId) {
            const res = await db.User.findOne({
                where: { id: userId },
            });
            if (res) {
                await res.destroy();
                const allUsers = await getAllUsers();
                return {
                    data: allUsers.data,
                    message: "Delete user successful",
                };
            }
            throw { errorCode: 404, message: "Delete user failed" };
        }
        throw { errorCode: 400, message: "User not found" };
    } catch (e) {
        throw e;
    }
};

const updateUser = async (data) => {
    try {
        if (!!data) {
            const res = await db.User.findOne({
                where: { id: data.id },
            });
            if (res) {
                await res.update({
                    name: data.name,
                    age: data.age,
                    roleId: data.roleId,
                });
                await res.save();
                const allUsers = await getAllUsers();
                return {
                    data: allUsers.data,
                    message: "Delete user successful",
                };
            }
            throw { errorCode: 404, message: "Delete user failed" };
        }
        throw { errorCode: 400, message: "User not found" };
    } catch (e) {
        throw e;
    }
};

export { getAllUsers, postNewUser, deleteUser, updateUser };
