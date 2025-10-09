import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const HomePage = () => {

    const [isRateLimited,setIsRateLimited] = useState(false);
    const [notes,setNotes] = useState([]);
    const [loading,setLoading] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get("notes/");
                setNotes(res.data);
                setIsRateLimited(false);
            } catch (error) {
             console.log("Error Fetching Notes");
             console.log(error);
             if(error.status === 429){
                setIsRateLimited(true);
             }else{
                toast.error("Failed to load Notes");
             }
            } finally {
                setLoading(false);
            }
        }
        fetchNotes();
    },[]);

    return (
        <div className="min-h-screen">
            <Navbar />
            {isRateLimited && <RateLimitedUI/>}

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className="text-center text-primary py-10">Loadind notes...</div>}
                {notes.length == 0 && !isRateLimited && (
                    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
                        <div className="bg-primary/10 rounded-full p-8">
                            <NotebookIcon className="size-10 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold">No notes yet</h3>
                        <p className="text-base-content/70">
                            Ready to organize your thoughts? Create your first note to get started on your journey.
                        </p>
                        <Link to="/create" className="btn btn-primary">
                            Create Your First Note
                        </Link>
                    </div>
                )}
                {notes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => {
                           return (
                           <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                           )
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;