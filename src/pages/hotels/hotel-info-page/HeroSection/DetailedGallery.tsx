import {    X } from "lucide-react";
import { useEffect } from "react";

const DetailedGallery = ({HandleClick}) => {

    const HandleBackToGallery = ()=>{
        HandleClick()
    }

    useEffect(() => {
    const original = document.body.style.overflow;
    
    
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = original); 
    }, []);

    return (
        <div className="fixed inset-0 space-x-5 pt-10  z-50 flex  justify-center bg-white overflow-hidden">
            <div className="w-[50%] overflow-y-auto border">
                ddl
            </div>
            <div onClick={HandleBackToGallery} className="size-16 flex items-center justify-center rounded-full bg-bg-primary text-blue-500 hover:bg-zinc-200 hover:text-black transition-all ease-in duration-300 cursor-pointer">
                <X/>
            </div>
        </div>
    );
    };

export default DetailedGallery;
