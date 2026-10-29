
const Section = require("../models/Section");
const Course = require("../models/Course")
const SubSection = require("../models/SubSection")
exports.createSection = async (req,res) => {
    try {
        //fecth data
        const {sectionName , courseId} = req.body;
        //validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "Missing required properties",
            });
        }
        //create section
        const newSection = await Section.create({sectionName});
        //update in cousreese walae me 
        const updateCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push : {
                    courseContent: newSection._id,
                },
            },
           { returnDocument: 'after' }
        ).populate({
            path: "courseContent",
            populate: {
                path: "SubSection",
                strictPopulate: false,
            },
        }).exec();


        //return response

        res.status(200).json({
            success: true,
            message:"section is succusefully cresated"
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
			message: "Internal server error",
			error: error.message,
        })
    }
}

exports.updateSection = async (req,res) =>{
    try {
        //FETch data form req body
        const {sectionName , sectionId } = req.body;

        //update section 
        const section = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},
            {new:true}
        )

        // return response
    	res.status(200).json({
			success: true,
			message: section,
		});    
    } catch (error) {
      res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
}
}

//delet section handler 
exports.deleteSection = async (req, res) => {
    try {
        //fetcht id
        const {sectionId} = req.params;
        //delet section
        const section = await Section.findByIdAndDelete({sectionId});
        res.status(200).json({
			success: true,
			message: "Section deleted",
		});
        
    } catch (error) {
        res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}        