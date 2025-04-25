import React from 'react';

const Rating = ({ HotelInfo }) => {
  return (
    <div className=' flex flex-col justify-end'>
      <div>
        {
          (() => {
            const rating = HotelInfo.rating;

            switch (true) {
              case rating >= 4.5:
                return <span className="font-medium">Great Rating!</span>;
              case rating >= 4:
                return <span className="font-medium">Very Good</span>;
              case rating >= 3:
                return <span className="font-medium">Good</span>;
              case rating >= 2:
                return <span className="font-medium">Needs Improvement</span>;
              case rating >= 1:
                return <span className="font-medium">Poor Rating</span>;
              case rating >= 0:
                return <span className="font-medium">Very Poor</span>;
              default:
                return <span className="font-medium">Rating Not Available</span>;
            }
          })()
        }
      </div>
      <div className='text-zinc-700'>
        {HotelInfo.review_count} review{HotelInfo.review_count > 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default Rating;
