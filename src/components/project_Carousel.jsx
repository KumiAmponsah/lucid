import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// A carousel component to showcase project images with navigation and auto-play features
//STEP 1: Import the component where needed: import ProjectCarousel from "../components/project_Carousel.jsx";
//STEP 2: Pass an array of project image URLs as props to the component in your desired page like so:

//const projects = [
//    "../assets/2150721533.jpg"
//    "../assets/delivery.jpg"
//    "../assets/19605.jpg"
//    "../assets/2150721533.jpg"
//  ];

//STEP 3: insert component like so: <ProjectCarousel projects={projects} />
export default function ProjectCarousel({ projects }) {
  const [currentProject, setCurrentProject] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Auto-play functionality for projects
  useEffect(() => {
    if (!isAutoPlaying || projects.length <= 1) return;
    const interval = setInterval(nextProject, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentProject, projects.length]);

  // Don't show navigation if there's only one project
  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-bold mb-6 text-gray-900">Projects</h2>
        <p className="text-gray-500 text-center py-8">No projects to display</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-6 text-gray-900">Projects</h2>
      <div 
        className="relative"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          {projects.length > 1 && (
            <button
              onClick={prevProject}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>
          )}
          
          {/* Project Images Slider */}
          <div className="flex-1 mx-4 overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentProject * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={index} className="min-w-full flex justify-center">
                  <img
                    src={project}
                    alt={`Project ${index + 1}`}
                    className="w-full max-w-md rounded-lg shadow-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Next Button */}
          {projects.length > 1 && (
            <button
              onClick={nextProject}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110"
              aria-label="Next project"
            >
              <ChevronRight className="w-6 h-6 text-gray-900" />
            </button>
          )}
        </div>
        
        {/* Dot Indicators */}
        {projects.length > 1 && (
          <div className="flex justify-center space-x-2 mt-4">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentProject 
                    ? "bg-blue-600 w-8 h-2.5" 
                    : "bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}