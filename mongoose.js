const mongoose = require('mongoose');

main().catch(err => console.log(err));

//connects directly to database named image
async function main(){
    await mongoose.connect("mongodb://localhost:27017/imagesdb")
}

const imageSchema = new mongoose.Schema({
    name: String,
    file: String,
    creationdate: Date,
    creator: String,
    filetype: String
})

const Image = mongoose.model("Image", imageSchema)

//const comic1 = new Image({name:"", file:"", etc:""})
//comic1.save()