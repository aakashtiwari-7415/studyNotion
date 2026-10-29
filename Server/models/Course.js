const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
    },
    courseDiscription:{
        type:String,
    },
    whatWillLearn:{
        type:String,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    ratingAndReview:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview",
        }
    ],
    price:{
        type:String,
    },
    tag:{
        type:String,
        ref:"Tag",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },

    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    thumbnail:{
        type:String,
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    instructions:{
        type:[String],
    },
    status:{
        type:String,
        enum:["Draft", "Published"]
    }

});

module.exports = mongoose.model("Course",courseSchema)