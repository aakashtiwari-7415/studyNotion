const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { mongo, default: mongoose } = require("mongoose");


//create rating 
exports.createRating = async (req,res) => {
    try {
        //get user id 
        const userId = req.user.id;
        //fetch data frrom req body
        const {rating , review ,courseId} = req.body;
        //check if use rid enroolled or not 
        const courseDetails = await Course.findOne(
                                    {_id: courseId,
                                        studentsEnrolled:{$elemMatch:{$eq: userId}},
                                    }
        );
    
        if(!courseDetails){
            return res.status(404).json({
                succuess:false,
                message:'student id nno enrolledin the course'
            });
        }
        //check if user already revieewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                                        user:userId,
                                                        course:courseId,
        });
        if(alreadyReviewed){
            return res.status(403).json({
                succues:false,
                message:'course is already reviewed by the user'
            
            });
        }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
                                                    rating , review,
                                                    course:courseId,
                                                    user:userId,
        });
        //update courser wit this rating review
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                    {_id:courseId},
                                                    {$push:{ratingAndReviews:ratingReview._id}},
                                                    {new:true}
        )
        console.log(updatedCourseDetails);

        //return response
        return res.status(200).json({
            succues:true,
            message:'RAating and review creaated successsfully'
        })
    } catch (error) {
        
    }
}


//get average rating
exports.getAverageRating  = async (req,res) => {
    try {
        //get course id 
        const courseId = req.body.courseId;
        //calcualte avg rating 
        
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},

                }
            }
        ])
        //return rating
        if(result.length > 0){
            return res.status(200).json({
                succues:true,
                averageRating:result[0].averageRating,
            })
        }

        //if no rating reveivew exist
        return res.status(200).json({
            succues:true,
            message:'Average Rating is 0, no ratings given till now',
            averageRating:0,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            succues:false,
            message:error.message,
        })
    }
}


//get all rating and review

exports.getAllRating = async (req,res) => {
    try {
        const allReviews = await RatingAndReview.find({})
                                    .sort({rating:"desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select:"courseName",
                                    })
                                    .exec();

        return res.status(200).json({
            succues:true,
            message:"All reviews fetched successfully",
            data:allReviews,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            succues:false,
            message:error.message,
        })
    }
}