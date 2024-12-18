import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../Controller/userController.js";
import validateRequest from "../middleware/validateRequest.js";
import userValidationSchema from "../validation/userValidation.js";

const router = express.Router();

router.post("/signup", validateRequest(userValidationSchema), signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
