import React from "react";

const FAQ = () => {
  return (
    <div className="my-10 space-y-5 w-5/6 mx-auto ">
      <div>
        <h1 className="text-3xl font-bold  text-center">
          How does this posture corrector work?
        </h1>
        <p className="text-center my-3 w-2/3 mx-auto font-semibold text-gray-500">
          A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.
        </p>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border-2 border-base-300">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold">
          Is it suitable for all ages and body types?
        </div>
        <div className="collapse-content text-sm">
          CA posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border-2 border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
          IDoes it really help with back pain and posture improvement?
        </div>
        <div className="collapse-content text-sm">
          A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border-2 border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
         Does it have smart features like vibration alerts?
        </div>
        <div className="collapse-content text-sm">
         A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-100 border-2 border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
         How will I be notified when the product is back in stock?
        </div>
        <div className="collapse-content text-sm">
         A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.
        </div>
      </div>
    </div>
  );
};

export default FAQ;
