import * as roleService from "../services/role";

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
        const data = await roleService.postNewRole(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

export { getAllRoles, postNewRole };
