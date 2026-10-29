  const mongoose = require("mongoose")

const subSectionSchema = new mongoose.Schema({
   title:{
    type:String,
   },
   description:{
    type:String,
   },
   timeDuration:{
    type:String
   },
   videoFile:{
    type:String,
   }
});
// Pehle check karein agar model pehle se compiled hai, warna naya banayein
module.exports = mongoose.models.SubSection || mongoose.model("SubSection", subSectionSchema);