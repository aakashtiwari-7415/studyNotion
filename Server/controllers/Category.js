const Category = require("../models/Category");

exports.createCategories = async (req,res) => {
    try{
        //fetch data from req body
        const {name,description} = req.body;
        //validation
        if(!name){
            return res
            .status(400)
            .json({
                success:false,
                message:"All fields are required"
            });
        }
        //save in db
        const CategorysDetails = await Category.create({
            name:name,
            description:description,
        })
        console.log(CategorysDetails)
        //retrune res
     	return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});   
    }catch(error){
        return res.status(500).json({
			success: true,
			message: error.message,
		});
    }
};

exports.showAllCategories = async (req,res) => {
    try{
        const allCategories =  await Category.find(
            {},
            {name:true,description:true}
        )

        res.status(200).json({
			success: true,
			data: allCategories,
		});
    }catch(error){
        return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
};


exports.categoryPageDetails = async (req,res) => {
    try{
        //fetch category id
        const {categoryId} = req.body;

        //get courses for the specified category
        const selectedCategory = await Category.findById(categoryId)
                                                        .populate("courses")
                                                        .exec();
         
        console.log(selectedCategory);
        //handel case when the caatogy is not found
        if(!selectedCategory){
            console.log("Category not found.");
			return res
				.status(404)
				.json({ success: false, message: "Category not found" });
        }
       
        // Get courses for different  categories
		 
        const differentCategories = await Category.find({
                                            _id: {$ne: categoryId},
                                        })
                                        .populate("courses").exec();
        //get top 10 selling courses
        //HW - write it on your own

        //return res
        res.status(200).json({
			selectedCourses: selectedCourses,
			differentCourses: differentCourses,
		});
    }catch(error){
        return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}