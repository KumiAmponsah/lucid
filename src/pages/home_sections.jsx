import React from 'react';
import Search from '../assets/search_options.png';
import Review from '../assets/Ratings.png';
import Book from '../assets/book.png';
import InstantQuotes from '../assets/instant qoutes.jpg';
import Carousel from '../components/carousal_slider.jsx';


const Section1 = () => {

const steps = [
  {id: 1, alt:"pic", num:"1", title: "Search", description: "Search for your desired service or browse through our diverse categories.", imageUrl: Search},
  {id: 2, alt:"pic", num:"2", title: "Get Instant Quotes", description: "Receive offers from local workers within minutes. Compare prices, reviews, and availability.", imageUrl:InstantQuotes},
  {id: 3, alt:"pic", num:"3", title: "Choose & Book", description: "Select the best worker for your task based on reviews, ratings, and price. Book instantly through our secure platform.", imageUrl: Book},
  {id: 4, alt:"pic", num:"4", title: "Feedback & Review", description: "Leave feedback to help future customers and build our trusted community network.", imageUrl: Review},

]

  return (
    <div className="flex flex-col min-h-screen bg-gray-300">
      {/* Card Section - Top 3 Cards */}
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8 mt-16 px-6 mb-6 py-4">
        {/* Card 1 - Security */}
        <div className="card rounded-3xl w-full bg-white card-md shadow-2xl">
          <div className="card-body items-center text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full p-1">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12"
                  viewBox="0 0 28 28"
                >
                  <g fill="none">
                    <path
                      fill="url(#fluentColorShield280)"
                      d="M13.56 2.142a.75.75 0 0 1 .878 0c.643.464 2.088 1.312 3.897 2.041c1.81.73 3.922 1.317 5.913 1.317a.75.75 0 0 1 .75.75v7.752c0 3.027-1.703 5.841-3.838 7.95c-2.133 2.107-4.827 3.64-7.033 4.024l-.128.022l-.129-.022c-2.205-.385-4.9-1.917-7.033-4.024C4.703 19.843 3 17.029 3 14.002V6.25a.75.75 0 0 1 .75-.75c1.991 0 4.103-.587 5.914-1.317c1.808-.73 3.253-1.577 3.896-2.04"
                    />
                    <defs>
                      <radialGradient
                        id="fluentColorShield280"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientTransform="rotate(54 8.463 -11.286)scale(57.4728 51.0658)"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset=".338" stopColor="#0FAFFF" />
                        <stop offset=".529" stopColor="#367AF2" />
                        <stop offset=".682" stopColor="#5750E2" />
                        <stop offset=".861" stopColor="#CC23D1" />
                      </radialGradient>
                    </defs>
                  </g>
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-black mt-4">
              Secure & Trusted
            </h2>
            <p className="text-gray-600">
              All workers are verified and background-checked to ensure your
              safety and peace of mind
            </p>
          </div>
        </div>

        {/* Card 2 - Fast Service */}
        <div className="card rounded-3xl w-full bg-white card-md shadow-2xl">
          <div className="card-body items-center text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full p-1">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      fill="url(#SVG43clcbof)"
                      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2"
                    />
                    <path
                      fill="url(#SVGgWLVHbdW)"
                      d="M11.993 6.648a.75.75 0 0 0-1.493.102v6l.007.102a.75.75 0 0 0 .743.648h4l.102-.007A.75.75 0 0 0 15.25 12H12V6.75z"
                    />
                    <defs>
                      <linearGradient
                        id="SVG43clcbof"
                        x1="5.333"
                        x2="15.333"
                        y1=".889"
                        y2="23.111"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#1EC8B0" />
                        <stop offset="1" stopColor="#2764E7" />
                      </linearGradient>
                      <linearGradient
                        id="SVGgWLVHbdW"
                        x1="10.981"
                        x2="9.01"
                        y1="7.148"
                        y2="13.094"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FDFDFD" />
                        <stop offset="1" stopColor="#D1D1FF" />
                      </linearGradient>
                    </defs>
                  </g>
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-black mt-4">
              Quick Response
            </h2>
            <p className="text-gray-600">
              Get instant matches with available workers in your area. Fast
              response times guaranteed
            </p>
          </div>
        </div>

        {/* Card 3 - Quality Assured */}
        <div className="card rounded-3xl w-full bg-white card-md shadow-2xl">
          <div className="card-body items-center text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full p-1">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <path
                    d="M24.2505 29.4183C23.6542 28.822 22.8454 28.487 22.0021 28.487C21.1588 28.487 20.3501 28.822 19.7538 29.4183C19.1575 30.0146 18.8225 30.8234 18.8225 31.6666C18.8225 32.5099 19.1575 33.3187 19.7538 33.915L29.2538 43.415C29.5497 43.7085 29.9006 43.9407 30.2864 44.0983C30.6723 44.2558 31.0854 44.3357 31.5021 44.3333C31.9357 44.3196 32.3617 44.2169 32.7539 44.0317C33.1461 43.8465 33.4961 43.5827 33.7821 43.2566L55.9488 17.9233C56.4607 17.2878 56.7074 16.4793 56.6377 15.6664C56.568 14.8534 56.1872 14.0987 55.5746 13.5597C54.9621 13.0206 54.1651 12.7388 53.3499 12.7731C52.5346 12.8073 51.764 13.1548 51.1988 13.7433L31.5021 36.5433L24.2505 29.4183Z"
                    fill="url(#paint0_radial_25_125)"
                  />
                  <path
                    d="M60.0022 28.5C59.1623 28.5 58.3569 28.8336 57.763 29.4275C57.1691 30.0214 56.8355 30.8268 56.8355 31.6667C56.8355 38.3855 54.1665 44.8291 49.4156 49.58C44.6646 54.331 38.221 57 31.5022 57C26.4991 56.9977 21.6088 55.5141 17.4478 52.7362C13.2868 49.9583 10.0414 46.0106 8.12103 41.3908C6.20063 36.771 5.69113 31.686 6.65679 26.777C7.62245 21.868 10.02 17.3549 13.5472 13.8067C15.8927 11.4297 18.6888 9.54446 21.7718 8.26124C24.8548 6.97802 28.1628 6.3226 31.5022 6.33333C33.5271 6.34601 35.5446 6.57961 37.5188 7.03C37.932 7.15779 38.3669 7.1996 38.7969 7.15286C39.2268 7.10612 39.6426 6.97182 40.0186 6.75823C40.3946 6.54464 40.7229 6.25629 40.9832 5.91097C41.2436 5.56564 41.4304 5.17066 41.5322 4.75036C41.6341 4.33006 41.6487 3.89336 41.5753 3.46718C41.5019 3.041 41.342 2.63438 41.1054 2.27237C40.8688 1.91037 40.5606 1.60066 40.1997 1.36234C39.8389 1.12401 39.433 0.96213 39.0072 0.886666C36.5471 0.307935 34.0293 0.0104735 31.5022 0C25.2459 0.0325012 19.1395 1.91748 13.9534 5.41706C8.76743 8.91665 4.73425 13.874 2.36289 19.6635C-0.00847875 25.453 -0.611756 31.8153 0.629185 37.9473C1.87013 44.0793 4.89967 49.7064 9.33551 54.1183C15.215 60.0005 23.1854 63.3139 31.5022 63.3333C39.9007 63.3333 47.9552 59.997 53.8939 54.0584C59.8325 48.1197 63.1688 40.0652 63.1688 31.6667C63.1688 30.8268 62.8352 30.0214 62.2414 29.4275C61.6475 28.8336 60.842 28.5 60.0022 28.5Z"
                    fill="url(#paint1_radial_25_125)"
                  />
                  <defs>
                    <radialGradient
                      id="paint0_radial_25_125"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="matrix(58.0895 61.1542 -71.0402 39.478 3.96212 -4.98429)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.338" stopColor="#0FAFFF" />
                      <stop offset="0.529" stopColor="#367AF2" />
                      <stop offset="0.682" stopColor="#5750E2" />
                      <stop offset="0.861" stopColor="#CC23D1" />
                    </radialGradient>
                    <radialGradient
                      id="paint1_radial_25_125"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="matrix(97.0065 122.71 -118.634 79.2151 -24.8161 -35.6256)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.338" stopColor="#0FAFFF" />
                      <stop offset="0.529" stopColor="#367AF2" />
                      <stop offset="0.682" stopColor="#5750E2" />
                      <stop offset="0.861" stopColor="#CC23D1" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-black mt-4">
              Quality Guaranteed
            </h2>
            <p className="text-gray-600">
              All services come with our satisfaction guarantee. Rate and review
              every experience
            </p>
          </div>
        </div>
      </div>

      {/* Feature Section Header */}
      <div className="items-center text-center my-4 px-2 py-6 bg-white">
        <div className="my-2 px-2 py-2 bg-white">
        <h1 className="text-black font-semibold text-3xl">Platform Features</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Discover what makes our platform the best choice for connecting with
          trusted workers
        </p>
        </div>
      </div>

      {/* Feature Cards - Bottom Grid */}
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8 px-6 mb-16 pb-8">
        <div className="card w-full bg-white card-md shadow-2xl rounded-3xl hover:shadow-xl transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-black mb-2 pb-2 font-semibold text-xl">
              Easy Booking
            </h2>
            <p className="text-gray-600">
              Book services in just a few clicks. Choose your preferred time,
              worker, and service type with our intuitive interface
            </p>
          </div>
        </div>

        <div className="card w-full bg-white card-md shadow-2xl rounded-3xl hover:shadow-xl transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-black mb-2 pb-2 font-semibold text-xl">
              Transparent Pricing
            </h2>
            <p className="text-gray-600">
              No hidden fees. See upfront pricing for all services before you
              book. Pay securely through our platform
            </p>
          </div>
        </div>

        <div className="card w-full bg-white card-md shadow-2xl rounded-3xl hover:shadow-xl transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-black mb-2 pb-2 font-semibold text-xl">
              Real-Time Tracking
            </h2>
            <p className="text-gray-600">
              Track your worker's arrival in real-time. Get notifications and
              updates throughout the entire service
            </p>
          </div>
        </div>

        <div className="card w-full bg-white card-md shadow-2xl rounded-3xl hover:shadow-xl transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-black mb-2 pb-2 font-semibold text-xl">
              24/7 Support
            </h2>
            <p className="text-gray-600">
              Our customer support team is available round the clock to assist
              you with any questions or concerns
            </p>
          </div>
        </div>

        <div className="card w-full bg-white card-md shadow-2xl rounded-3xl hover:shadow-xl transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-black mb-2 pb-2 font-semibold text-xl">
              Verified Reviews
            </h2>
            <p className="text-gray-600">
              Read authentic reviews from real customers. Make informed
              decisions based on genuine experiences
            </p>
          </div>
        </div>

        <div className="card w-full bg-white card-md shadow-2xl rounded-3xl hover:shadow-xl transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-black mb-2 pb-2 font-semibold text-xl">
              Flexible Scheduling
            </h2>
            <p className="text-gray-600">
              Book services at your convenience. Schedule for same-day or plan
              ahead for future dates
            </p>
          </div>
        </div>
      </div>
      
        {/* how it works Section*/}
       <div className="flex flex-col min-h-screen bg-white">
        {/* how it works Section Header */}
      <div className="items-center text-center my-8 px-2 py-6 bg-white">
        <h1 className="text-black font-semibold text-3xl">How it works</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          
        </p>
      </div>

      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-x-24 gap-y-8 px-6 mb-6 pb-8">
  {steps.map((step) => (
    <div key={step.id} className="flex flex-col items-center justify-start text-center h-full">
      {/* Step Image */}
      <div className="w-full h-44 mt-2 bg-blue-700 rounded-2xl transition-all duration-300 overflow-hidden flex items-center justify-center flex-shrink-0">
        <img
          src={step.imageUrl}
          alt={step.alt}
          className="object-cover w-full h-full"
        />
      </div>
      
      {/* Step Number */}
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-500 text-white font-bold text-2xl mt-4 flex-shrink-0">
        {step.num}
      </div>
      
      {/* Step Title */}
      <h2 className="text-lg font-semibold text-black mt-2 min-h-[28px]">
        {step.title}
      </h2>
      
      {/* Step Description */}
      <p className="text-gray-600 max-w-xs m-1 flex-grow">
        {step.description}
      </p>
    </div>
  ))}
</div>
      </div>

      {/*slider section*/}
        <Carousel/>

        
        {/* FAQ*/}
        <div className="flex flex-col min-h-screen bg-white">
          <div className="items-center text-center my-8 px-2 py-6 bg-white">
            <div className="my-4 px-2 py-6 bg-white">
              <h1 className="text-black font-semibold text-3xl">Platform Features</h1>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                Discover what makes our platform the best choice for connecting with
                trusted workers
              </p>
            </div>
            {/*Questions*/}
            <div className='items-center text-center m-8  px-2 py-6'>
              <div tabIndex={0} className="collapse collapse-arrow bg-white border-y-2 rounded-none border-gray-100">
                <div className="collapse-title font-semibold text-black text-left">How quickly can I get help through your neighbourhood services platform?</div>
                  <div className="collapse-content text-sm text-gray-600 text-left">
                    Most tasks receive responses within 15 minutes, and many workers offer same-day availability for urgent needs.
                  </div>
                </div>
                
              <div tabIndex={1} className="collapse collapse-arrow bg-white border-b-2 rounded-none border-gray-100">
                <div className="collapse-title font-semibold text-black text-left">How quickly can I get help through your neighborhood services platform?</div>
                  <div className="collapse-content text-sm text-gray-600 text-left">
                    Most tasks receive responses within 15 minutes, and many workers offer same-day availability for urgent needs.
                  </div>
                </div>
              <div tabIndex={2} className="collapse collapse-arrow bg-white border-b-2 rounded-none border-gray-100">
                <div className="collapse-title font-semibold text-black text-left">How quickly can I get help through your neighborhood services platform?</div>
                  <div className="collapse-content text-sm text-gray-600 text-left">
                    Most tasks receive responses within 15 minutes, and many workers offer same-day availability for urgent needs.
                  </div>
                </div>
              <div tabIndex={3} className="collapse collapse-arrow bg-white border-b-2 rounded-none border-gray-100">
                <div className="collapse-title font-semibold text-black text-left">How quickly can I get help through your neighborhood services platform?</div>
                  <div className="collapse-content text-sm text-gray-600 text-left">
                    Most tasks receive responses within 15 minutes, and many workers offer same-day availability for urgent needs.
                  </div>
                </div>
              <div tabIndex={4} className="collapse collapse-arrow bg-white border-b-2 rounded-none border-gray-100">
                <div className="collapse-title font-semibold text-black text-left">How quickly can I get help through your neighborhood services platform?</div>
                  <div className="collapse-content text-sm text-gray-600 text-left">
                    Most tasks receive responses within 15 minutes, and many workers offer same-day availability for urgent needs.
                  </div>
                </div>
            </div>
            
            </div>
        </div>
    </div>
  );
};

export default Section1;