import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "For Businesses",
    subtitle: "Streamline Your Staffing Efficiency",
    description:
      "Whether you have short-term projects or seasonal demands, our automated on-demand staffing platform enables you to effortlessly find workers within minutes.",
    image:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    buttonText: "Find Workers",
    gradient: "from-blue-600 via-blue-700 to-indigo-800",
    category1:"/Service",
  },
  {
    id: 2,
    title: "For Individuals",
    subtitle: "Get Hired Quickly and Securely",
    description:
      "Join our network of verified workers and start getting matched with available jobs near you in just a few clicks.",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    buttonText: "Join Now",
    gradient: "from-purple-600 via-purple-700 to-pink-700",
    category1:"/Service",
  },
  {
    id: 3,
    title: "For Teams",
    subtitle: "Collaborate Seamlessly",
    description:
      "Build your dream team with our intuitive platform. Connect with skilled professionals and manage projects effortlessly.",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    buttonText: "Get Started",
    gradient: "from-teal-600 via-cyan-700 to-blue-800",
    category1:"/Service",
  },
  {
    id: 4,
    title: "For Freelancers",
    subtitle: "Unlock New Opportunities",
    description:
      "Discover flexible work opportunities that match your skills. Set your own schedule and grow your career on your terms.",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    buttonText: "Explore Jobs",
    gradient: "from-orange-600 via-red-600 to-pink-700",
    category1:"/Service",
  },
  {
    id: 5,
    title: "For Everyone",
    subtitle: "Join the Future of Work",
    description:
      "Experience the next generation of workforce management. Smart matching, instant connections, and seamless collaboration.",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    buttonText: "Learn More",
    gradient: "from-indigo-600 via-violet-700 to-purple-800",
    category1:"/Service",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, current]);

  return (
    <div 
      className={`relative w-full overflow-hidden bg-gradient-to-br ${slides[current].gradient} transition-all duration-1000`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>

      {/* Carousel slides */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="min-w-full flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-12 md:py-16 lg:py-20 gap-8 lg:gap-12"
          >
            {/* Left text section */}
            <div 
              className={`text-center lg:text-left lg:w-1/2 flex flex-col items-center lg:items-start space-y-4 md:space-y-6 transition-all duration-700 ${
                current === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-white/90 font-medium text-sm">
                  {slide.title}
                </span>
              </div>
              
              <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight drop-shadow-lg">
                {slide.subtitle}
              </h2>
              
              <p className="text-white/90 text-base sm:text-lg max-w-xl leading-relaxed">
                {slide.description}
              </p>

             <Link to={slide.category1}> 
              <button className="group mt-4 py-3.5 px-8 rounded-full bg-white text-gray-900 font-semibold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                {slide.buttonText}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              </Link>
            </div>

            {/* Right image section */}
            <div 
              className={`mt-8 lg:mt-0 lg:w-1/2 flex justify-center transition-all duration-700 delay-150 ${
                current === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                <img
                  className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[550px] xl:max-w-[600px] rounded-2xl shadow-2xl object-cover aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500"
                  src={slide.image}
                  alt={slide.subtitle}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 md:p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 md:p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center pb-6 md:pb-8 space-x-2 md:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              current === index 
                ? "bg-white w-8 md:w-10 h-2.5 md:h-3" 
                : "bg-white/40 hover:bg-white/60 w-2.5 md:w-3 h-2.5 md:h-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ 
            width: `${((current + 1) / slides.length) * 100}%` 
          }}
        ></div>
      </div>
    </div>
  );
}