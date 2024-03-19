import { Router } from "express";

import { upload } from "../middlewares.js/multer.middleware.js";
import { verifyJWT } from "../middlewares.js/auth.mddleware.js";
import { aadharCardUpload, getAllAadharCard } from "../controllers/aadharCard.controller.js";

const aadharCardRouter = Router();

aadharCardRouter.post(
  "/uploadAadharCard",
  upload.single("aadharCard"),
    aadharCardUpload
);
aadharCardRouter.get(
  "/getAllAadharCard/:userId",
    getAllAadharCard
);


export { aadharCardRouter };
