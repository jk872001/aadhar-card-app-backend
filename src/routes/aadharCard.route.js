import { Router } from "express";

import { upload } from "../middlewares.js/multer.middleware.js";
import { verifyJWT } from "../middlewares.js/auth.mddleware.js";
import { aadharCardUpload, deleteAadhar, getAllAadharCard } from "../controllers/aadharCard.controller.js";

const aadharCardRouter = Router();

aadharCardRouter.post(
  "/uploadAadharCard",
  upload.single("aadharCard"),
  verifyJWT,
    aadharCardUpload
);
aadharCardRouter.get(
  "/getAllAadharCard/:userId",
  verifyJWT,
    getAllAadharCard
);
aadharCardRouter.post(
  "/deleteAadhar",
  verifyJWT,
    deleteAadhar
);


export { aadharCardRouter };
