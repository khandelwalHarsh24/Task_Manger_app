const mongoose=require("mongoose");



// here second value is for deprication warning
// This returns a promise
// This method will use sync method so we setup in another way in async method.
// In this case first server is created then db is work 
// But if server is not connected to db then all functality failed
// If db is connected then our server is going to run.

// mongoose.connect(connection_string).then(()=>{
//     console.log("Connected to db")
// })
// .catch((err)=>{
//     console.log(err);
// })

const connectdb=(url)=>{
    return mongoose.connect(url);
}

module.exports=connectdb

// We will set the env variable

// .env file is used to safe the things which we are not going to show everyone
// 