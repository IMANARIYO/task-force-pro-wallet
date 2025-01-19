import React from "react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className='bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105'>
      <div className='flex flex-col items-center text-center'>
        {/* Feature Icon */}
        <div className='mb-4 md:mb-6 p-4 rounded-full bg-blue-100 text-blue-600 text-3xl md:text-4xl'>
          {icon}
        </div>
        {/* Feature Title */}
        <h3 className='text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-gray-800'>
          {title}
        </h3>
        {/* Feature Description */}
        <p className='text-gray-600 text-base md:text-lg'>
          {description}
        </p>
      </div>
    </div>
  )
}

export default FeatureCard
