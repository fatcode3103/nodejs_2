import express from "express";

import * as userController from "../controllers/userController";
import * as roleController from "../controllers/roleController";

const router = express.Router();

router.get("/get-users", userController.getAllUsers);
router.post("/add-new-user", userController.postNewUser);
router.delete("/delete-user", userController.deleteUser);
router.put("/update-user", userController.updateUser);

router.get("/get-roles", roleController.getAllRoles);
router.post("/add-new-role", roleController.postNewRole);
router.post("/get-permissions", roleController.getPermission);
router.delete("/delete-role", roleController.deleteRole);

module.exports = router;
