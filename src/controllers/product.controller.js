import { AadharCard } from "../models/aadharCard.model.js";
import { Product } from "../models/product.modal.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const productUpload = asyncHandler(async (req, res) => {
  const { testName, testInfo, subCategory, category,testHeading,price,keyPoints  } =
    req.body;

  //  All fields non-empty validation
  if (
    [testName, testInfo, subCategory, category,testHeading,price ].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "Please fill all the fields");
  }

  const isProductExists = await Product.findOne({
    $or: [{ testName }],
  });
  if (isProductExists) {
    throw new ApiError(409, "Test already exists");
  }

  let productFilePath = req.file?.path;

  if (!productFilePath) {
    throw new ApiError(400, "Please upload aadhar card");
  }

  const productOnCloudinary = await uploadOnCloudinary(productFilePath);

  if (!productOnCloudinary) {
    throw new ApiError(400, "Please upload product on cloud ");
  }

  const uploadProduct = await Product.create({
    testName,
    testHeading,
    testInfo,
    price,
    category,
    subCategory,
    keyPoints,
    testImg: productOnCloudinary?.secure_url.replace(".pdf", ".jpg"),
   
  });

  // here we are finding aadhar card again by id for ensuring aadhar card is created or not
  const productFind = await Product.findById(uploadProduct._id);

  if (!productFind) {
    throw new ApiError(
      500,
      "Something went wrong in uploading the product"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, productFind, "Product uploaded successfully")
    );
});

const getAllAadharCard=asyncHandler(async(req,res)=>{
      const {userId}=req.params

      const user = await User.findOne({_id:userId})
      let userRole= user.role
      let aadharCards;
      if(userRole==="admin"){
         aadharCards= await AadharCard.find({})
      }else{
         aadharCards= await AadharCard.find({uploadedBy:userId})
      }
    

    return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {aadharCards},
        "All aadhar cards fetched successfully"
      )
    );
})

const deleteAadhar=asyncHandler(async (req,res)=>{
  const aadharId = req.body.aadharId
  
  await AadharCard.deleteOne({_id: aadharId })
  
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Aadhar deleted successfully"));
})


export { productUpload,getAllAadharCard,deleteAadhar };
