require('./Db/connect')
const express=require('express');
const app=express();
const port=process.env.PORT||3000;

const tasks=require('./routes/task')
const connectdb=require('./Db/connect');
require('dotenv').config();
app.use(express.static('./public'));

// Used this middleware so that we able to used req.body.
// If we dont use it we don't have data in req.body
app.use(express.json());



// app.get('/',(req,res)=>{
//     res.send("Task Manager");
// })

app.use('/api/v1/tasks',tasks)

const start=async ()=>{
    try {
        await connectdb(process.env.MONGO_URI);
        app.listen(port,console.log(`Server Listening To The Port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();

