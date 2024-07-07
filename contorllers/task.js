import ErrorHandler from "../middlewars/error.js";
import { Task } from "../models/task.js";


// import { Task } from "../models/task.js";
export const newTask = async (req, res, next)=>{
try {
    const {title, description}=req.body;
    await Task.create({title, description});


res.status(201).json({
    success : true,
    message : 'task added',
});
} catch (error) {
    next(error);
}

};

export const getMyTask = async (req,res,next)=>{
    
    try {
        // const userid = req.user._id;
        const tasks = await Task.find({});

  
    res.status(200).json({
        success : true,
        tasks,
    });
    } catch (error) {
        next(error);
    }
};
export const updateTask = async (req,res,next)=>{
  
try {
    const {id} = req.params; //params is used to access ID's
    const task = await Task.findById(id);
    if(!task) return next(new ErrorHandler('task not found', 404));
    
 ///if task found then :
    task.isCompleted = !task.isCompleted;
        
    await task.save();
    res.status(200).json({
        success : true,
        message : 'task updated',
    });
} catch (error) {
    next(error);
}
};
export const deleteTask = async (req,res,next)=>{
  try {
    const task = Task.findById(req.params.id);
    if(!task) return next(new ErrorHandler('task not found', 404));
    await task.deleteOne();
    
    
    res.status(200).json({
        success : true,
        message : 'task deleted',
    });
  } catch (error) {
    next(error);
  }
};