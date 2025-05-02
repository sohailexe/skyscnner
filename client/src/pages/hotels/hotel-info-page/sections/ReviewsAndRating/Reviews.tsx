import React from "react";

interface Category {
  label: string;
  rating: number;
}

interface ReviewsProps {
  categories: Category[];
}

const Reviews: React.FC<ReviewsProps> = ({ categories }) => {
  console.log(categories);

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {categories.map((data, index) => (
          <div key={index} className="py-2 pr-3">
            <div className="flex items-center justify-between py-2 text-zinc-700">
              <p>{data.label}</p>
              <p>{data.rating}</p>
            </div>
            <div className="h-3 rounded-2xl bg-gray-300">
              <div
                className="h-3 rounded-2xl bg-Primaray_Color"
                style={{ width: `${data.rating * 20}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Reviews;
