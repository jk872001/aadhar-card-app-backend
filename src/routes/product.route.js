import { Router } from "express";

import { upload } from "../middlewares.js/multer.middleware.js";
import { verifyJWT } from "../middlewares.js/auth.mddleware.js";
import { productUpload } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post(
  "/uploadProduct",
  upload.single("testImg"),
    productUpload
);
// productRouter.get(
//   "/getAllAadharCard/:userId",
//   verifyJWT,
//     getAllAadharCard
// );
// productRouter.post(
//   "/deleteAadhar",
//   verifyJWT,
//     deleteAadhar
// );


export { productRouter };
