import React from 'react';

const NavCard = () => {
  return (
    <>
      <div className='grid grid-cols-3 gap-4'>
        {
          ["1", "2", "3"].map((data, index) => (
            <div key={index} className='col-span-1 border h-32'>
              {data}
            </div>
          ))
        }
      </div>
    </>
  );
}

export default NavCard;
