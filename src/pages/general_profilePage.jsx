import React, { useState } from 'react';
import ProjectCarousel from "../components/project_Carousel.jsx";
import slide1 from "../assets/2150721533.jpg"
import slide2 from "../assets/delivery.jpg"
import slide3 from "../assets/handy.jpg"
import slide4 from "../assets/2150721533.jpg"
import BackToTop from '../components/back_the_top_btn.jsx';

import { Star, CheckCircle, Users, User, Clock, MessageCircle, Phone, ChevronUp, ChevronDown, BriefcaseBusiness} from 'lucide-react';

export default function GeneralProfile() {
  const [reviewsOpen, setReviewsOpen] = useState(false);

  const projects = [
    slide1,
    slide2,
    slide3,
    slide4
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 min-h-60 max-h-80 to-blue-400 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4 text-white">
            
           
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-7xl mx-auto px-4 -mt-14">
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="relative">
                <div className="absolute top-2 right-4 z-30">
                  <button className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100">
                    <Phone className="inline-block mr-1 w-4 h-4" />
                        Contact for price
                    </button>
                </div>
            </div>
            {/* Floating Profile Image */}
    <div className="relative -top-14 left-1/2 transform -translate-x-1/2 z-30">
      <div className="w-24 h-24 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-blue-600 bg-gray-200 flex items-center justify-center overflow-hidden">
        {false ? (
          <img
            src="../assets/profile.svg"
            alt="profile picture"
            className="w-full h-full object-cover"
          />
        ) : (
          <User size={48} className="text-gray-400" />
        )}
      </div>
    </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gabriel A. Gordon-Mensah</h1>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
              <span className="font-semibold text-blue-600">4.0</span>
              <span className="text-gray-500 text-sm">(30 reviews)</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <BriefcaseBusiness className="w-4 h-4  text-blue-600" />
              <span>Web Developer</span>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            I'm a Frontend developer with 3-5 years of experience building responsive web applications using React, Vue, and JavaScript/TypeScript. I create accessible, high-performance interfaces with clean code and ... more
          </p>
          <div className="flex space-x-3">
            <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">UI/UX Design</span>
            <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">UI/UX Design</span>
            <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">UI/UX Design</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Overview Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl text-black font-bold mb-4">Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">Hired 50 Times</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">User has been verified</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">14 employees</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">2 years experience</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl text-black font-bold mb-4">Payment Methods</h2>
            <p className="text-gray-700">This user accepts Cash, Mobile Money, Bank transfer</p>
          </div>

          {/* Working Hours */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl text-black font-bold mb-4">Working Hour</h2>
            <div className="space-y-2 text-gray-700">
              <p>Weekdays: 9am - 5pm</p>
              <p>Weekends: N/A</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <button className="bg-blue-600 text-white py-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">Message</span>
          </button>
          <button className="bg-blue-600 text-white py-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700">
            <Phone className="w-5 h-5" />
            <span className="font-semibold">Call Now</span>
          </button>
        </div>


        {/* Projects Section */}
        <ProjectCarousel projects={projects} />

 {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow mt-8">
          <button
            onClick={() => setReviewsOpen(!reviewsOpen)}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
            {reviewsOpen ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </button>
          
          {reviewsOpen && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-gray-900">Great 4.0</div>
                    <div className="flex justify-center space-x-1 my-2">
                      {[1, 2, 3, 4].map((i) => (
                        <Star key={i} className="w-6 h-6 fill-blue-600 text-blue-600" />
                      ))}
                      <Star className="w-6 h-6 text-gray-300" />
                    </div>
                    <div className="text-gray-600">30 reviews</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { stars: 5, percentage: 80 },
                    { stars: 4, percentage: 0 },
                    { stars: 3, percentage: 5 },
                    { stars: 2, percentage: 10 },
                    { stars: 1, percentage: 0 },
                  ].map((rating) => (
                    <div key={rating.stars} className="flex items-center space-x-3">
                      <span className="w-8 text-right">{rating.stars}</span>
                      <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${rating.percentage}%` }}
                        ></div>
                      </div>
                      <span className="w-12 text-right text-sm text-gray-600">
                        {rating.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="mt-8 space-y-6">
                {[1, 2, 3, 4, 5, 6].map((review) => (
                  <div key={review} className="border-t pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full">
                        <div className="w-full h-full justify-items-center object-cover"><User size={44} className="text-gray-400" /></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">John Doe</div>
                        <div className="flex space-x-1 my-1">
                          {[1, 2, 3, 4].map((i) => (
                            <Star key={i} className="w-4 h-4 fill-blue-600 text-blue-600" />
                          ))}
                          <Star className="w-4 h-4 text-gray-300" />
                        </div>
                        <p className="text-gray-700 mt-2">
                          My computer was cleaned, software installed, and is now working way faster
                          than before! My only concern is that the pricing indicated was quite different
                          from what was charged.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <BackToTop />
      </div>      
  );
}