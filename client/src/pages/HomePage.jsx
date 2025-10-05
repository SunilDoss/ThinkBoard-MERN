import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "axios";
import toast from "react-hot-toast";

const HomePage = () => {
    const [isRateLimited,setIsRateLimited] = useState(false);
    const [notes,setNotes] = useState([]);
    const [loading,setLoading] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/notes/");
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

    return <div className="min-h-screen">
        <Navbar />
        {isRateLimited && <RateLimitedUI/>}
    </div>
};

export default HomePage;