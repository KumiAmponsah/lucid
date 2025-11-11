import Navbar from "../components/navbar";
import BackgroundImage from "../assets/background.png"

function Home() {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-gray-300">
      {/* Navbar */}
      <Navbar />

      {/* Hero fills the remaining height */}
      <div
        className="hero flex-1 w-full mt-1.5"
        style={{
          backgroundImage:
           `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-transparent"></div>
         <div className="hero-content min-w-40 text-neutral-content text-center">
          <div className="max-w-3.5xl px-2.5">
            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-black leading-tight mb-6">
              Trusted help,<br />
              <span className="block">when and how you need it.</span>
            </h1>

            {/* Paragraph */}
            <p className="text-lg text-black leading-relaxed">
              <span className="text-orange-600 font-semibold">Connect</span> with{" "}
              <span className="text-orange-600 font-semibold">trusted workers</span> in
              your neighbourhood for home repairs, cleaning, moving, and more. Get
              started instantly.
            </p>

            {/* Search Bar */}
      <div className="mt-12 flex justify-center">
        <div className="flex w-full max-w-2xl lg:mb-10 rounded-full shadow-lg overflow-hidden bg-white border-2 border-blue-700">
    <input
      type="text"
      placeholder="What service do you need?"
      className="flex-grow px-6 py-3 text-black bg-white placeholder-gray-500 focus:outline-none"
    />
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" 
            d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 
            0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/></svg>
          </button>
        </div>
      </div>
      {/* Category Buttons */}
      <div className=" mt-16 pb-6 border-b-2 border-grey w-full flex-col justify-center">
        <div className="grid grid-cols-4 gap-4 lg:grid-cols-8 justify-items-center">
          <button className="btn btn-square bg-blue-700 p-7 rounded-xl hover:bg-blue-600">
            <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 32 32">
            <path fill="#ffffff" d="M4 16h12v2H4zm-2-5h10v2H2z"/><path fill="#ffffff" d="m29.919 16.606l-3-7A.999.999 0 0 0 26 9h-3V7a1 1 0 0 0-1-1H6v2h15v12.556A3.992 3.992 0 0 0 
            19.142 23h-6.284a4 4 0 1 0 0 2h6.284a3.98 3.98 0 0 0 7.716 0H29a1 1 0 0 0 1-1v-7a.997.997 0 0 0-.081-.394ZM9 26a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2Zm14-15h2.34l2.144 
            5H23Zm0 15a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2Zm5-3h-1.142A3.995 3.995 0 0 0 23 20v-2h5Z"/></svg></a>
          </button>
          <button className="btn btn-square bg-blue-700 p-7 rounded-xl hover:bg-blue-600">
           <a><svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 48 48"><g fill="#ffffff"><path fill-rule="evenodd" d="M22.062 25.602L11.33 5.416a1 1 0 1 1 1.766-.939l10.733 20.186l1.522-.81a4 4 0 0 1 5.41 1.655l.648 1.219l6.87 10.054l-8.738 4.645l-3.027-5.983l-1.784.903l3.045 6.02l-3.746 1.991l-4.495-11.318l-.647-1.218a4 4 0 0 1 1.654-5.41l1.522-.809Zm4.227.018l-4.81 2.557a2 2 0 0 0-.827 2.705l.647 1.218l8.343-4.436l-.648-1.217a2 2 0 0 0-2.705-.827Z" clip-rule="evenodd"/><path d="M17.768 35.36a1 1 0 0 0-1.408-.129h.002l-.011.008l-.063.048a5.93 5.93 0 0 1-.274.194c-.248.165-.618.39-1.094.616A9.15 9.15 0 0 1 11 37a1 1 0 1 0 0 2a11.15 11.15 0 0 0 4.78-1.097a10.83 10.83 0 0 0 1.344-.758a7.915 7.915 0 0 0 .47-.34l.03-.023l.01-.008l.003-.004h.002l.001-.002a1 1 0 0 0 .128-1.408Zm2.064 5.085a1 1 0 0 1-.277 1.387l-.002.002l-.004.002l-.01.006l-.031.02a13.039 13.039 0 0 1-.527.318c-.351.201-.85.468-1.45.734C16.351 43.439 14.701 44 13 44a1 1 0 1 1 0-2c1.298 0 2.65-.439 3.719-.914a14.28 14.28 0 0 0 1.618-.85a1.8 1.8 0 0 0 .086-.054l.02-.012l.002-.002a1 1 0 0 1 1.387.277Z"/></g></svg></a>
          </button>
          <button className="btn btn-square bg-blue-700 p-7 rounded-xl hover:bg-blue-600">
            <a><svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 -2 18 18"><path fill="#ffffff" fill-rule="evenodd" d="M14.216 14.949c.532.533.859.154 1.295-.281c.436-.436.815-.764.284-1.296c0 0-7.639-7.632-9.468-9.455L4.75 5.494l9.466 9.455zM2.048 7.015l.614-.604s-.271-.743.126-1.099s1.067-.136 1.067-.136L6.01 3.093s-.151-1.083.049-1.283c.2-.2 2.434-1.289 2.651-1.507l-.459-.459S5.123.219 4.784.558c-.199.2-1.689 1.704-2.751 2.766c0 0 .267.759-.083 1.109c-.351.351-1.141.099-1.141.099l-.623.623c-.263.265-.108.637.215.96l.686.686c.325.323.698.477.961.214z"/></svg></a>
          </button>
          <button className="btn btn-square bg-blue-700 p-7 rounded-xl hover:bg-blue-600">
            <a><svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 32 32"><path fill="#ffffff" d="m29.482 8.624l-10-5.5a1 1 0 0 0-.964 0l-10 5.5a1 1 0 0 0 0 1.752L18 15.591V26.31l-3.036-1.67L14 26.391l4.518 2.485a.998.998 0 0 0 .964 0l10-5.5A1 1 0 0 0 30 22.5v-13a1 1 0 0 0-.518-.876ZM19 5.142L26.925 9.5L19 13.858L11.075 9.5Zm9 16.767l-8 4.4V15.59l8-4.4Z"/><path fill="#ffffff" d="M10 16H2v-2h8zm2 8H4v-2h8zm2-4H6v-2h8z"/></svg></a>
          </button>
          <button className="btn btn-square bg-blue-700 p-7 rounded-xl hover:bg-blue-600">
            <a><svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24"><path fill="#ffffff" d="m16.16 5.64l3.54 3.54a3 3 0 0 0 0-4.24L16.16 1.4l-4.24 4.24l2.12 2.12l2.12-2.12zM4.842 12.708l3.535-3.535l2.122 2.12l-3.536 3.536z"/><path fill="#ffffff" d="m15.45 7.76l-1.41 1.41l-4.25-4.24l-2.12 2.12l4.24 4.24l-8.49 8.49l2.83 2.83L16.86 12l.71.71l1.41-1.41l-3.53-3.54z"/></svg></a>
          </button>
          <button className="btn btn-square bg-blue-700 p-7 rounded-xl hover:bg-blue-600">
            <a><svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 15 15"><path fill="#ffffff" d="M3 5a2 2 0 0 0 1.732-1H12a1 1 0 1 0 0-2H4.732a2 2 0 0 0-3.464 0H3v2H1.268A2 2 0 0 0 3 5Zm-.854 4.354A.5.5 0 0 0 2 9.707V13.5a.5.5 0 0 0 .5.5H4a.5.5 0 0 0 .5-.5V13h6v.5a.5.5 0 0 0 .5.5h1.5a.5.5 0 0 0 .5-.5V9.707a.5.5 0 0 0-.146-.353L12 8.5l-1.354-2.257a.5.5 0 0 0-.43-.243H4.784a.5.5 0 0 0-.429.243L3 8.5l-.854.854ZM11.134 9H3.866l1.2-2h4.868l1.2 2ZM5.5 10.828v.372a.3.3 0 0 1-.3.3H3.3a.3.3 0 0 1-.3-.3v-.834a.3.3 0 0 1 .359-.294l1.82.364a.4.4 0 0 1 .321.392Zm6.5-.34v.712a.3.3 0 0 1-.3.3H9.8a.3.3 0 0 1-.3-.3v-.454a.3.3 0 0 1 .241-.294l1.78-.356a.4.4 0 0 1 .479.392Z"/></svg></a>
          </button>
          <button className="btn btn-square bg-blue-700  p-7 rounded-xl hover:bg-blue-600">
            <a><svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24"><path fill="#ffffff" d="M5 21q-.425 0-.713-.288T4 20v-3q0-.825.588-1.413T6 15h12q.825 0 1.413.588T20 17v3q0 .425-.288.713T19 21q-.425 0-.713-.288T18 20v-3H6v3q0 .425-.288.713T5 21Zm-.5-7q-.625 0-1.063-.438T3 12.5q0-.625.438-1.063T4.5 11q.625 0 1.063.438T6 12.5q0 .625-.438 1.063T4.5 14ZM7 14V5q0-.825.588-1.413T9 3h6q.825 0 1.413.588T17 5v9H7Zm12.5 0q-.625 0-1.063-.438T18 12.5q0-.625.438-1.063T19.5 11q.625 0 1.063.438T21 12.5q0 .625-.438 1.063T19.5 14Z"/></svg></a>
          </button>
          <button className="btn btn-square bg-blue-700 p-7 rounded-xl hover:bg-blue-600">
            <a><svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 355 395"><path fill="#ffffff" d="M42.5 149q17.5 0 30 12.5T85 192t-12.5 30.5t-30 12.5t-30-12.5T0 192t12.5-30.5t30-12.5zm256 0q17.5 0 30 12.5T341 192t-12.5 30.5t-30 12.5t-30-12.5T256 192t12.5-30.5t30-12.5zm-128 0q17.5 0 30 12.5T213 192t-12.5 30.5t-30 12.5t-30-12.5T128 192t12.5-30.5t30-12.5z"/></svg></a>
          </button>
        </div>
        
          </div>
          </div>
        </div>
      </div>
      {/* Category Buttons end */}
    </div>
    
    </>
  );
}

export default Home;
