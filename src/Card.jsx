import React from "react";
import { forwardRef } from "react";

const Card = forwardRef(({ id, frontAlt, category, frontSrc }, ref) => {
  return (
    <div className="card" id={id} ref={ref}>
      <div className="card-wrapper">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={frontSrc} alt={frontAlt} width={500} height={500} />
          </div>

          <div className="flip-card-back">
            <div className="p- flex flex-col justify-between relative">
              {/* Top Title */}
              <div>
                <div className="flex gap-3 w-full justify-center ">
                  <h2 className="text-xl font-semibold tracking-wide text-center">
                    {category.heading}
                  </h2>
                  <div className="w-3 h-3  border-2 border-[#ec5c29] rotate-0"></div>
                </div>

                {/* List */}
                <div className="mt-6 space-y-4">
                  {category.items.map((item, index) => (
                    <p key={index} className="border-b border-dotted border-gray-300 pb-2">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Card;
