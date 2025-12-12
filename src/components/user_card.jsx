import React from 'react';
import { Star, MapPin, User } from 'lucide-react';
import {Link} from 'react-router-dom';

const ProfileCard = ({ 
  name = "Gabriel A. Gordon-Mensah",
  role = "Web Developer",
  location = "Kwabenya, Accra",
  rating = 4.0,
  maxRating = 5,
  image = null,
  onViewProfile = () => {}
}) => {
  // Function to render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <Star
          key={i}
          size={20}
          className={`${
            i <= Math.floor(rating)
              ? 'fill-blue-600 text-blue-600'
              : i - rating < 1 && i - rating > 0
              ? 'fill-blue-600/50 text-blue-600'
              : 'fill-none text-blue-600'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <>
<div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-3 sm:p-4 md:p-6 w-full">
      {/* Profile Image */}
      <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 sm:border-3 md:border-4 border-blue-600 flex items-center justify-center bg-gray-200 overflow-hidden">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={32} className="text-gray-400 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          )}
        </div>
      </div>

      {/* Name */}
      <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 text-center mb-1 sm:mb-2 line-clamp-2">
        {name}
      </h2>

      {/* Role */}
      <p className="text-gray-700 text-xs sm:text-sm text-center mb-1 sm:mb-2 line-clamp-1">
        {role}
      </p>

      {/* Location */}
      <div className="flex items-center justify-center gap-1 text-gray-600 mb-2 sm:mb-3">
        <MapPin size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" />
        <span className="text-xs line-clamp-1">{location}</span>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
        <div className="flex gap-0.5">
          {renderStars()}
        </div>
        <span className="text-gray-900 font-semibold text-sm sm:text-base">
          {rating.toFixed(1)}
        </span>
      </div>

      {/* View Profile Button */}
      <Link to="/generalProfile"><button 
        onClick={onViewProfile}
        className="w-full bg-blue-600 text-white py-1.5 sm:py-2 md:py-2.5 px-2 sm:px-3 md:px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 text-xs sm:text-sm"
      >
        View Profile
      </button>
      </Link>
    </div>
</>
  );
};
 export default ProfileCard;
