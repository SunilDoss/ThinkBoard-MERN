import { mongoose } from "mongoose";

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
},{timestamps:true});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected:", mongoose.connection.name); // prints which DB you're connected to
});

const Note = mongoose.model('Note',noteSchema);

export default Note;