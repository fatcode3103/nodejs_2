import * as userService from "../services/user";

const getAllUsers = async (req, res) => {
    try {
        const data = await userService.getAllUsers();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const postNewUser = async (req, res) => {
    try {
        const data = await userService.postNewUser(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const deleteUser = async (req, res) => {
    try {
        const data = await userService.deleteUser(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

const updateUser = async (req, res) => {
    try {
        const data = await userService.updateUser(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res
            .status(e.errorCode || 500)
            .json(e.message || "Error from the server");
    }
};

export { getAllUsers, postNewUser, deleteUser, updateUser };
