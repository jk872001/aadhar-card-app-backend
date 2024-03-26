import { Router } from "express";
import {
  changeCurrentPassword,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  getUserById,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateUserAvatar,
  updateUserCoverImage,
  userUpdate,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares.js/multer.middleware.js";
import { verifyJWT } from "../middlewares.js/auth.mddleware.js";

const userRouter = Router();

userRouter.post("/registerUser", verifyJWT, registerUser);
userRouter.post("/loginUser", loginUser);
userRouter.get("/getAllUsers", verifyJWT, getAllUsers);
userRouter.get("/getUserById/:userId", verifyJWT, getUserById);
userRouter.delete("/deleteUser", verifyJWT, deleteUser);
userRouter.post("/logoutUser", verifyJWT, logoutUser);
userRouter.post("/refresh-token", refreshAccessToken);
userRouter.post("/change-password", verifyJWT, changeCurrentPassword);
userRouter.get("/get-current-user", verifyJWT, getCurrentUser);
userRouter.put("/userUpdate/:userId", verifyJWT, userUpdate);
userRouter.post(
  "/update-user-avatar",
  upload.single("avatar"),
  verifyJWT,
  updateUserAvatar
);
userRouter.post(
  "/update-user-coverImage",
  upload.single("coverImage"),
  verifyJWT,
  updateUserCoverImage
);
userRouter.get("/c/:username", verifyJWT, getUserChannelProfile);
userRouter.get("/history", verifyJWT, getWatchHistory);
export { userRouter };
