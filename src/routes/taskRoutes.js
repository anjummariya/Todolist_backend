import { Task} from "../models/taskModel.js";
import mongoose from 'mongoose';
import express from "express";

const router=express.Router();

router.get('/',async(req,res)=>{
    try{
        const response =await Task.find({});
        res.json(response);
    }catch(error){
        res.json(error);
        }
})
router.post('/', async(req,res)=>{
        const { todo } = req.body;
        try {
            const newTask = new Task({ todo });
            const savedTask = await newTask.save();
            res.json(savedTask);
        } catch (error) {
            res.status(500).json({ message: 'Error adding task', error: error.message });
        }
    });
   
router.put('/:id', async (req, res) => {
  const { id } = req.params; 
  const { todo } = req.body; 

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { todo }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
});
  
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: id });
  }
  try {
    const deletedTask = await Task.findByIdAndRemove(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});
  
export default router;