
const Task=require('../models/task');
const getalltask=async (req,res)=>{
    // const task=await Task.get;
    try {
        const task=await Task.find({});
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({msg:"Document not get"})
    }
}

const addtask=async (req,res)=>{
    try {
        const task=await Task.create(req.body);
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

const gettask=async (req,res)=>{
    try {
        const {id:taskID}=req.params;
        const task=await Task.findOne({_id:taskID});
        if(!task){
            return res.status(404).json({msg:`Not Found By Id ${req.params.id}`})
        }
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updatetask= async (req,res)=>{
    try{
        const {id:taskID}=req.params;
        const task=await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true
        });
        if(!task){
            return res.status(404).json({msg:`Not Found By Id ${req.params.id}`})
        }
        res.status(200).json({task});
    }
    catch(error){
        res.status(500).json({msg:error});
    }
}

const deletetask=async (req,res)=>{
    try {
        const {id:taskID}=req.params;
        const task=await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return res.status(404).json({msg:`Not Found By Id ${req.params.id}`})
        }
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports={
    getalltask,
    addtask,
    gettask,
    updatetask,
    deletetask,
}


// Add task
// res.send("Add Task");
    // const task=await Task.create({name:'first task'});

    // const task=await Task.create(req.body);
    // res.status(201).json({task});


// Get task
// res.send("Get Task")
// res.json({id:req.params.id})
// try {
//     const task=await Task.findById(req.params.id);
//     if(!task){
//         return res.status(404).json({msg:`Not Found By Id ${req.params.id}`})
//     }
//     res.status(201).json(task);
// } catch (error) {
//     res.status(500).json({msg:`Element Not Found By Id ${req.params.id}`})
// }

// Update Task
 // res.send("Update Task");

    // try {
    //     const task=await Task.findByIdAndUpdate(req.params.id,{"name":"Khushi"});
    //     res.status(201).json(task);
    // } catch (error) {
    //     res.status(500).json({msg:`Element Not Found By Id ${req.params.id}`})
    // }

// Delete Task

