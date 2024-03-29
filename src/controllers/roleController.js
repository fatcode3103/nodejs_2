import * as roleService from "../services/role.js";
import db from "../models/index.js";

const getAllRoles = async (req, res) => {
    try {
        const data = await roleService.getAllRoles();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const postNewRole = async (req, res) => {
    try {
        const transaction = await db.sequelize.transaction();
        const data = await roleService.postNewRole(req.body, transaction);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const getPermission = async (req, res) => {
    try {
        const data = await roleService.getPermission();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const deleteRole = async (req, res) => {
    try {
        const data = await roleService.deleteRole(req.query.roleId);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const updateRole = async (req, res) => {
    try {
        const data = await roleService.updateRole(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const deletePermission = async (req, res) => {
    try {
        const data = await roleService.deletePermission(req.query.permissionId);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const postNewPermission = async (req, res) => {
    try {
        const data = await roleService.postNewPermission(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const updatePermission = async (req, res) => {
    try {
        const data = await roleService.updatePermission(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

export {
    getAllRoles,
    postNewRole,
    getPermission,
    deleteRole,
    updateRole,
    deletePermission,
    postNewPermission,
    updatePermission,
};
