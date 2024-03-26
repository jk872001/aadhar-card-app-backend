import { AadharCard } from "../models/aadharCard.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const aadharCardUpload = asyncHandler(async (req, res) => {
  const { employeeName, aadharCardHolderName, aadharCardNumber, uploadedBy } =
    req.body;

  //  All fields non-empty validation
  if (
    [employeeName, aadharCardHolderName, aadharCardNumber].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "Please fill all the fields");
  }

  const isAadharCardExists = await AadharCard.findOne({
    $or: [{ aadharCardNumber }],
  });
  if (isAadharCardExists) {
    throw new ApiError(409, "Aadhar Card already exists");
  }

  let aadharCardFilePath = req.file?.path;

  if (!aadharCardFilePath) {
    throw new ApiError(400, "Please upload aadhar card");
  }

  const aadharCardOnCloudinary = await uploadOnCloudinary(aadharCardFilePath);

  if (!aadharCardOnCloudinary) {
    throw new ApiError(400, "Please upload aadhar card on cloud ");
  }

  const uploadAadharCard = await AadharCard.create({
    employeeName,
    aadharCardHolderName,
    aadharCardNumber,
    aadharCard: aadharCardOnCloudinary?.secure_url.replace(".pdf", ".jpg"),
    uploadedBy,
  });

  // here we are finding aadhar card again by id for ensuring aadhar card is created or not
  const aadharCardFind = await AadharCard.findById(uploadAadharCard._id);

  if (!aadharCardFind) {
    throw new ApiError(
      500,
      "Something went wrong in uploading the aadhar card"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, aadharCardFind, "Aadhar card uploaded successfully")
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


export { aadharCardUpload,getAllAadharCard,deleteAadhar };
