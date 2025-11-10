import { useState } from "react";

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
  },
  {
    id: 3,
    title: "For Individuals",
    subtitle: "Get Hired Quickly and Securely",
    description:
      "Join our network of verified workers and start getting matched with available jobs near you in just a few clicks.",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    buttonText: "Join Now",
  },
  {
    id: 4,
    title: "For Individuals",
    subtitle: "Get Hired Quickly and Securely",
    description:
      "Join our network of verified workers and start getting matched with available jobs near you in just a few clicks.",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    buttonText: "Join Now",
  },
  {
    id: 5,
    title: "For Individuals",
    subtitle: "Get Hired Quickly and Securely",
    description:
      "Join our network of verified workers and start getting matched with available jobs near you in just a few clicks.",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    buttonText: "Join Now",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full overflow-hidden bg-blue-700">
      {/* Carousel slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-20 lg:px-32 py-10 gap-10"
          >
            {/* Left text section */}
            <div className="text-center md:text-left md:w-1/2 flex flex-col items-center md:items-start">
              <h1 className="text-orange-500 font-medium text-3xl py-2">
                {slide.title}
              </h1>
              <h2 className="font-semibold text-5xl text-white py-2 leading-tight">
                {slide.subtitle}
              </h2>
              <p className="text-gray-200 text-base py-4 max-w-md">
                {slide.description}
              </p>
              <button className="mt-2 py-3 px-6 rounded-lg bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition">
                {slide.buttonText}
              </button>
            </div>

            {/* Right image section */}
            <div className="sm:mt-4 mt-8 md:mt-0 md:w-1/2 flex justify-center">
              <img
                className="w-[400px] md:w-[500px] lg:w-[550px] rounded-lg shadow-2xl object-cover"
                src={slide.image}
                alt="slider"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-60 hover:bg-opacity-90 text-white p-5 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-60 hover:bg-opacity-90 text-white p-5 rounded-full"
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg>
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center mt-4 pb-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-orange-500" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
