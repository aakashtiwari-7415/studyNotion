const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadFileToCloudinary } = require("../utils/imageUploader");

exports.createCourse = async (req, res) => {
    try {
        // 1. Get user id from req.user
        const userId = req.user.id;

        // 2. Fetch required fields from req.body
        const {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
            instructions,
        } = req.body;

        // 3. Fetch thumbnail from req.files safely
        const thumbnail = req.files?.thumbnail;

        // 4. Mandatory fields validation
        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag ||
            !thumbnail ||
            !category
        ) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            });
        }

        // Status fallback check
        let status = req.body.status;
        if (!status) {
            status = "Draft";
        }

        // 5. Check if user exists & is an instructor (FIXED: UserActivation replaced with User)
        const instructorDetails = await User.findById(userId);
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details Not Found",
            });
        }

        // 6. Check if category is valid (FIXED: categoryDetails variable checked)
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            });
        }

        // 7. Upload image to Cloudinary
        const thumbnailImage = await uploadFileToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );

        // 8. Create new course entry (FIXED: Spelling typos resolved)
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
        });

        // 9. Add new course to instructor's user schema
        await User.findByIdAndUpdate(
            instructorDetails._id,
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { returnDocument: "after" }
        );

        // 10. Add new course to category schema (FIXED: category._id changed to category)
        await Category.findByIdAndUpdate(
            category,
            {
                $push: {
                    courses: newCourse._id, // Schema field standard: 'courses'
                },
            },
            { returnDocument: "after" }
        );

        // 11. Success Response
        return res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course created successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        });
    }
};

exports.getAllCourses = async (req,res) => {
    try {
        const allCourses = await Course.find({},
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                reatingAndReview: true,
                studentsEnroled:true,
            }
        ).populate("instructor").exec();

        return res.status(200).json({
			success: true,
			data: allCourses,
		});
    } catch (error) {
        console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
    }
}

exports.getCoursesDetails = async(req,res) =>{
    try {
            //get data from req body 
        const {courseId} = req.body;

        //find courese details
        const courseDetails = await Course.find(
                                    {_id: courseId})
                                    .populate(
                                        {
                                            path:"instructor",
                                            populate:{
                                                path:"addutionalDetails" ,
                                            },
                                        }
                                    )
                                    .populate("category")
                                    .populate("ratingAndreviews")
                                    .populate({
                                        path:"courseContent",
                                        populate:{
                                            path:"subSection",
                                        },
                                    })
                                    .exec();

        //validation
        
        if(!courseDetails) {
            return res.status(400).json({
                success:false,
                message:`could not find the course with ${courseId}`,
            });
        }

        return res.status(200).json({
            success:true,
            message:"Course Detail fetched successfully",
            data:courseDetails,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
    
}