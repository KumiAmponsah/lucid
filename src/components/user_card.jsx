import React, { useState } from 'react';
import { Star, MapPin, Heart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileCard = ({ 
  name = "Gabriel A. Gordon-Mensah",
  role = "Web Developer",
  location = "Kwabenya, Accra",
  rating = 4.0,
  maxRating = 5,
  image = null,
  isFavorite = false,
  onViewProfile = () => {}
}) => {

  const [favorite, setFavorite] = useState(isFavorite);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <Star
          key={i}
          size={20}
          className={
            i <= Math.floor(rating)
              ? 'fill-blue-600 text-blue-600'
              : i - rating < 1
              ? 'fill-blue-600/50 text-blue-600'
              : 'fill-none text-blue-600'
          }
        />
      );
    }
    return stars;
  };

  return (
    <div className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-3 sm:p-4 md:p-6 w-full">

      {/* Favorite */}
      <button 
        onClick={() => setFavorite(!favorite)}
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Heart className={`w-5 h-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
      </button>

      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full border-4 border-blue-600 flex items-center justify-center bg-gray-200 overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <User size={36} className="text-gray-400" />
          )}
        </div>
      </div>

      <h2 className="text-lg font-bold text-gray-900 text-center mb-1">
        {name}
      </h2>

      <p className="text-gray-700 text-sm text-center mb-2">
        {role}
      </p>

      <div className="flex items-center justify-center gap-1 text-gray-600 mb-3">
        <MapPin size={14} />
        <span className="text-xs">{location}</span>
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="flex gap-0.5">{renderStars()}</div>
        <span className="font-semibold">{rating.toFixed(1)}</span>
      </div>

      <Link to="/generalProfile">
        <button
          onClick={onViewProfile}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          View Profile
        </button>
      </Link>
    </div>
  );
};

export default ProfileCard;
