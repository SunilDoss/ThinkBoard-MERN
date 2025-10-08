import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import axios from "axios";
import App from "../App";


const CreatePage = () => {
   const [title,setTitle]     = useState("");
   const [content,setcontent] = useState("");
   const [loading,setloading] = useState(false);

   const navigator = useNavigate();

   const handleNoteSubmit = async(e) => {
    e.preventDefault();
    if(!title.trim() || !content.trim() ){
        toast.error("All fields are required");
        return;
    }

    setloading(true);
    try {
        await axios.post("/notes",{
            title,
            content
        });
        setloading(false);
        toast.success("Note created successfully");
        setTitle("");setcontent("");
        navigator("/");
        
    } catch (error) {
        setloading(false);
        console.error("Error creating note:", error);
        toast.error("Failed to create note. Please try again.");
    }
    
   }
   return (
    <div className="min-h-screen bg-base-200">
        <div className="container mx-auto p-4 py-8">
            <Link to={"/"} className="btn btn-ghost mb-6">
                <ArrowLeftIcon className="size-5" />
                <span>Back to Notes</span>
            </Link>
            <div className="card bg-base-100">
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-4">Create New Notes</h2>
                    <form onSubmit={handleNoteSubmit}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input type="text" placeholder="Enter Note Title" 
                                className="input input-bordered" value={title}
                                onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                         <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Content</span>
                            </label>
                            <textarea placeholder="Enter Note Content" 
                                className="input input-bordered" value={content}
                                onChange={(e) => setcontent(e.target.value)}/>
                        </div>
                        <div className="card-actions justify-end">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Note'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
   )
}

export default CreatePage;