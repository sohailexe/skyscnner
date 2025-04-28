// src/components/FullMapModal.jsx
import { createPortal } from 'react-dom';
import {X} from 'lucide-react';           
import MapView from './MapView';                

export default function FullMapModal({ open, ManipulteShowFull }) {
  if (!open) return null;

  const CloseMap = ()=>{
    ManipulteShowFull();
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex bg-white ">
      
      <div className="w-[340px]  overflow-y-auto">
        
      </div>

      
      <div className="flex-grow z-10">
        <MapView zoom={15} className="h-full w-full" />
      </div>

      <div onClick={CloseMap} className='absolute bg-bg-primary text-zinc-700 cursor-pointer flex items-center justify-center size-16 right-5 top-5  z-50 rounded-full'>
        <X/>
      </div>
    </div>,
    document.body
  );
}
