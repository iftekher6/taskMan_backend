import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type : String,
       
        required :true,
    },
    description: {
        type :String,
        
        required: true,
    },
    isCompleted: {
        type :String,
        select : false,
    },
    // assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // user : {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref : 'User',
    //     required : true,
    // },
    // admin : {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref : 'Admin',
    //     required : true,
    // },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: {
        type : Date,
        default : Date.now,
    },
  });
  
  export const Task = mongoose.model('Task', schema); 