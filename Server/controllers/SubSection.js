const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadFileToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
    try {
        // Fetch data from request body
        const { sectionId, title, timeDuration, description } = req.body;

        // Video is coming with key "video"
        const video = req.files?.video;

        console.log("BODY:", req.body);
        console.log("FILES:", req.files);
        console.log("VIDEO:", video);

        // Check all fields
        if (!sectionId || !timeDuration || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Required",
            });
        }

        // Upload video to Cloudinary
        const uploadDetails = await uploadFileToCloudinary(
            video,
            process.env.FOLDER_NAME
        );

        // Create new SubSection
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoFile: uploadDetails.secure_url,
        });

        // Add SubSection to Section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    SubSection: SubSectionDetails._id,
                },
            },
            { new: true }
        ).populate("SubSection");

        return res.status(200).json({
            success: true,
            data: updatedSection,
        });

    } catch (error) {
        console.error("Error creating new sub-section:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
//update subsection handleer

exports.updateSubSection = async (req,res) => {
    try{
        // fetch data 
        const {sectionId ,title , description } = req.body;
       // const video = req.files.videofile;
        const subSection = await SubSection.findById(sectionId);

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"SubSection not found",
            })
        }

        if(title !== undefined){
            subSection.title = title
        }

        if(description !== undefined){
            subSection.description = description
        }

        if(req.files && req.files.video !== undefined){
          const video = req.files.video;
          const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
          )  
          subSection.videoUrl = uploadDetails.secure_url
          subSection.timeDuration = `${uploadDetails.duration}`
        }
        
        await subSection.save()

        res.status(200).json({
            success: true,
            message: "SubSection Updated Successfully",
            data: subSection,
        });
    }catch(error){
        // Handle any errors that may occur during the process
		console.error("Error uopdateing new sub-section:", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}

//delet subsection

exports.deleteSubSection = async (req,res) => {
    try{
        const {subSectionId , sectionId} = req.body;

        await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )

        const subSection = await SubSection.findByIdAndUpdate({_id: subSectionId})
        
        if(!subSection){
            return res
                .status(404)
                .json({success:false, message: "SubSection not found"})
        }


		res.status(200).json({
			success: true,
			message: "SubSection deleted successfully",
		});

    }catch(error){
        console.log(error)
        return res.status(500).json({
			success: false,
			message: "An error occurred while deleting the subsection",
			error: error.message,
		});
    }
}