import axios from "axios";
import { useEffect, useState } from "react";
import BookCards from "../bookcards";
import { Loader } from "../Loader";


function RecentlyAdded() {
    const [Data,setData] = useState()

    useEffect(() => {
    const fetch = async() => {
        const response = await axios.get(
            "http://localhost:4000/get-all-book-recent"
        );
        setData(response.data.data);
        console.log(response.data.data);
        
        
    }    
        fetch();
    }, []);
    return (  
        <div className="mt-8 px-4">
            <h4 className="text-3xl text-yellow-100">Recently added books</h4>
            {!Data && 
            (<div className="flex items-center justify-center my-8">
            <Loader/>{" "}
            </div>
            )}
            <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {Data && 
                Data.map((item,i) => (
                    <div key={i}>
                        <BookCards data={item} /> {" "}
                    </div>
                    
                ))}
            </div>
            
        </div>
    );
}

export default RecentlyAdded;