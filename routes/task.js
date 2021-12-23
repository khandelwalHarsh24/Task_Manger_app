const express=require('express');
const router=express.Router();

const {
    getalltask,
    addtask,
    gettask,
    updatetask,
    deletetask,
}=require('../controllers/tasks');


router.route('/').get(getalltask).post(addtask);
router.route('/:id').get(gettask).patch(updatetask).delete(deletetask);

module.exports=router;