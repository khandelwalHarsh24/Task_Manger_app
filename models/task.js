const mongoose=require('mongoose');

// As nosql has no fixed schema/ structure of documents means we can put any
// data in one collection
// So here we defined a particular schema for our websites

// Basic Validation
const TaskSchema=new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Name is not provided"],
        maxlength:[20,"Name length not greater than 20"]
    },
    completed:{
        type:Boolean,
        default:false
    }
})

// Model = Representation for the collection.
// Using model we can do CRUD operations
module.exports=mongoose.model("Task",TaskSchema);

// An instance of model is called document.
// We can construct document by using await function