import { useState } from "react";

const Corousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  return (
    <div className="overflow-hidden relative">
      <div className="flex transition-all duration-500">
        <img
          className="w-full"
          key={currentSlide}
          src={slides[currentSlide]}
          alt={`Slide ${currentSlide}`}
        />
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2  bg-black text-white p-2"
      >
        &#10094;
      </button>
      <button
        onClick={handleNext}
        className="absolute  right-0 top-1/2  bg-black text-white p-2"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Corousel;
