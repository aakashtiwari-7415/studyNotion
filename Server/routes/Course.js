// Import the required modules
const express = require("express")
const router = express.Router()






//importing middleware
const {auth, isInstructor, isStudent ,isAdmin} = require("../middleware/auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************
//import course controllers
const {
    createCourse,
    getAllCourses,
    getCoursesDetails,
} = require("../controllers/Course")
//course can only be createdd by instructors
router.post("/createCourse",auth , isInstructor , createCourse)
//routes for getallcourse aur getcoursesdetails
router.get("/getAllCourse",getAllCourses)
router.get("/getCourseDetails",getCoursesDetails)


//sections controllers imports
const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section")
// rooutes for secction
router.post("/addSection",auth,isInstructor, createSection)
router.post("/updateSection",auth ,isInstructor,updateSection)
router.post("/deleteSection",auth,isInstructor,deleteSection)


//import subsection controllers
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
}= require("../controllers/SubSection")
//routees for subsection to a section
router.post("/addSubSection",auth,isInstructor,createSubSection)
router.post("/updateSubSecton",auth, isInstructor,updateSubSection)
router.post("/deleteSubSection",auth , isInstructor, deleteSubSection);




// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here

//categories controllers import
const {
    showAllCategories,
    createCategories,
    categoryPageDetails,

} = require("../controllers/Category");
//routes for categories
router.post("/createCategory",auth , isAdmin , createCategories)
router.get("/showAllCategories",showAllCategories)
router.post("/getCategoryPageDetail",categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

//ratinG controlllers import
const{
    createRating,
    getAverageRating,
    getAllRating,
} = require("../controllers/RatingAndReview")
router.post("/createRating",auth, isStudent ,createRating)
router.get("/getAverageRating",getAverageRating)
router.get("/getRating",getAllRating)

module.exports = router;

