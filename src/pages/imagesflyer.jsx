import React, { useState } from 'react';
import { Download } from 'lucide-react';

const NamingCeremonyFlyers = () => {
  const [currentFlyer, setCurrentFlyer] = useState(0);

  const flyers = [
    {
      id: 1,
      title: "Flyer 1 - Mother & Baby",
      image: "image-1" // This will be replaced with actual image
    },
    {
      id: 2,
      title: "Flyer 2 - Family Group",
      image: "image-2"
    },
    {
      id: 3,
      title: "Flyer 3 - Placeholder",
      image: "image-3"
    }
  ];

  const downloadFlyer = (flyerNumber) => {
    alert(`To download: Right-click on Flyer ${flyerNumber} and select "Save image as..." or take a screenshot of the flyer.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Naming Ceremony Thank You Flyers
        </h1>
        
        {/* Flyer Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          {flyers.map((flyer, index) => (
            <button
              key={flyer.id}
              onClick={() => setCurrentFlyer(index)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentFlyer === index
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
              }`}
            >
              Flyer {flyer.id}
            </button>
          ))}
        </div>

        {/* Flyer Display */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Flyer 1 - Mother & Baby Portrait */}
            {currentFlyer === 0 && (
              <div className="w-[800px] h-[1000px] bg-white shadow-2xl relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 -mr-48 -mt-48"></div>
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200 rounded-full opacity-20 -ml-40 -mb-40"></div>
                </div>

                {/* Top Decorative Border */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"></div>
                <div className="absolute top-16 left-0 right-0 h-2 bg-white"></div>
                
                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center px-12 pt-32">
                  {/* Thank You Header */}
                  <div className="text-center mb-8">
                    <h1 className="text-7xl font-bold text-blue-600 mb-4" style={{fontFamily: 'Georgia, serif'}}>
                      Thank You
                    </h1>
                    <div className="w-32 h-1 bg-blue-400 mx-auto"></div>
                  </div>

                  {/* Image Container */}
                  <div className="w-[500px] h-[400px] mb-8 rounded-2xl overflow-hidden shadow-xl border-8 border-white">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                      <p className="text-blue-400 text-lg font-semibold">Mother & Baby Photo</p>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg border-t-4 border-blue-500">
                    <p className="text-gray-700 text-xl leading-relaxed text-center" style={{fontFamily: 'Georgia, serif'}}>
                      We are deeply grateful to everyone who joined us in celebrating the naming of our child. Your prayers, presence, and generosity are truly appreciated.
                    </p>
                    <div className="mt-6 text-center">
                      <p className="text-2xl font-bold text-blue-600" style={{fontFamily: 'Georgia, serif'}}>
                        May God bless you abundantly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Decorative Border */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-white"></div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"></div>
              </div>
            )}

            {/* Flyer 2 - Family Group Landscape */}
            {currentFlyer === 1 && (
              <div className="w-[800px] h-[1000px] bg-white shadow-2xl relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>

                {/* Header Section with Curved Design */}
                <div className="relative h-64 bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden">
                  <div className="absolute -bottom-1 left-0 right-0 h-20 bg-white rounded-t-[100%]"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                    <h1 className="text-8xl font-bold text-white mb-2" style={{fontFamily: 'Georgia, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.2)'}}>
                      Thank You
                    </h1>
                    <div className="flex justify-center gap-2">
                      <div className="w-12 h-1 bg-white"></div>
                      <div className="w-12 h-1 bg-blue-300"></div>
                      <div className="w-12 h-1 bg-white"></div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative px-12 pt-8">
                  {/* Image Container */}
                  <div className="w-full h-[350px] mb-8 rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-100">
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
                      <p className="text-blue-400 text-lg font-semibold">Family Group Photo</p>
                    </div>
                  </div>

                  {/* Message Card */}
                  <div className="relative">
                    {/* Decorative Corner Elements */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-blue-500"></div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 border-t-4 border-r-4 border-blue-500"></div>
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-4 border-l-4 border-blue-500"></div>
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-blue-500"></div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-white p-10 rounded-2xl shadow-lg">
                      <p className="text-gray-700 text-xl leading-relaxed text-center mb-6" style={{fontFamily: 'Georgia, serif'}}>
                        We are deeply grateful to everyone who joined us in celebrating the naming of our child. Your prayers, presence, and generosity are truly appreciated.
                      </p>
                      <div className="text-center">
                        <div className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full shadow-lg">
                          <p className="text-2xl font-bold" style={{fontFamily: 'Georgia, serif'}}>
                            May God bless you abundantly.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Flyer 3 - Elegant Minimal Design */}
            {currentFlyer === 2 && (
              <div className="w-[800px] h-[1000px] bg-white shadow-2xl relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"></div>
                
                {/* Decorative Geometric Elements */}
                <div className="absolute top-20 right-20 w-40 h-40 border-4 border-blue-300 rounded-full opacity-30"></div>
                <div className="absolute top-32 right-32 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
                <div className="absolute bottom-40 left-20 w-32 h-32 border-4 border-blue-400 transform rotate-45 opacity-20"></div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-16">
                  {/* Top Accent Line */}
                  <div className="w-full flex justify-center mb-12">
                    <div className="w-64 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                  </div>

                  {/* Thank You Text */}
                  <div className="text-center mb-12">
                    <div className="text-blue-600 text-2xl font-semibold mb-2 tracking-widest">WITH GRATITUDE</div>
                    <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4" style={{fontFamily: 'Georgia, serif'}}>
                      Thank You
                    </h1>
                  </div>

                  {/* Image Container - Circular Frame */}
                  <div className="relative mb-12">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20"></div>
                    <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden shadow-2xl border-8 border-white">
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-white flex items-center justify-center">
                        <p className="text-blue-400 text-lg font-semibold">Celebration Photo</p>
                      </div>
                    </div>
                  </div>

                  {/* Message Box */}
                  <div className="max-w-2xl bg-white bg-opacity-80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-blue-100">
                    <p className="text-gray-700 text-xl leading-relaxed text-center mb-6" style={{fontFamily: 'Georgia, serif'}}>
                      We are deeply grateful to everyone who joined us in celebrating the naming of our child. Your prayers, presence, and generosity are truly appreciated.
                    </p>
                    <div className="text-center pt-6 border-t-2 border-blue-200">
                      <p className="text-3xl font-bold text-blue-700" style={{fontFamily: 'Georgia, serif'}}>
                        May God bless you abundantly.
                      </p>
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="w-full flex justify-center mt-12">
                    <div className="w-64 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Download Button */}
            <button
              onClick={() => downloadFlyer(currentFlyer + 1)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Download size={24} />
              Download Instructions for Flyer {currentFlyer + 1}
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Download Instructions:</h3>
          <p className="text-gray-700 mb-2">
            To save each flyer as a separate image file:
          </p>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Navigate to the flyer you want to download using the buttons above</li>
            <li>Right-click on the flyer and select "Save image as..." (or take a screenshot)</li>
            <li>Choose your desired location and filename</li>
            <li>Repeat for each of the three flyers</li>
          </ol>
          <p className="text-sm text-gray-600 mt-4 italic">
            Note: You'll need to replace the placeholder images with your actual photos by editing the design or using image editing software.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NamingCeremonyFlyers;