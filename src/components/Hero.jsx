import React, { useRef, useState, useEffect } from 'react';
import { curve, heroBackground } from '../assets';
import Button from './Button';
import Section from './Section';
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { slides } from '../constants/index';

const Hero = () => {
  const parallaxRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideIntervalRef = useRef(null);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  // Auto-slide every 4 seconds
  useEffect(() => {
    slideIntervalRef.current = setInterval(nextSlide, 4000);
    return () => clearInterval(slideIntervalRef.current);
  }, []);

  return (
    <Section className="pt-[12rem] -mt-[5.25rem]" crosses crossesOffset="lg:translate-y-[5.25rem]" customPaddings id="home">
      <div className="container relative" ref={parallaxRef}>
        {/* Hero Text Section with Lift Effect */}
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.85rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6 transition-all duration-500 ease-out hover:-translate-y-2">
            Decoding the Future, One Byte at a Time with{' '}
            <span className="inline-block relative">
              Rossum{' '}
              <img src={curve} className="absolute top-9 left-0 w-full xl:-mt-2" width={624} height={28} alt="Curve" />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8 transition-all duration-500 ease-out hover:-translate-y-1">
            Where curiosity meets code, and collaboration fuels growth. Join Rossum, your gateway to endless possibilities.
          </p>
          <Button href="https://docs.google.com/forms/d/e/1FAIpQLSdV5zIbmpHJltEiJPoObkwif5UH_UywDNonoJg8IVb6zRAr3Q/viewform?usp=dialog " white>Join Us</Button>
        </div>

        {/* Carousel Section with Light Red Hover Effect */}
        <div className="relative z-1 p-0.5 rounded-2xl bg-rose-500">
          <div className="relative bg-n-8 rounded-[1rem]">
            <div className="h-[1.4rem] bg-red-300 rounded-t-[0.9rem]" />
            <div className="rounded-b-[0.9rem] overflow-hidden flex justify-center items-center">
              <div className="max-w-[1400px] w-full m-auto py-16 px-4 relative">
                {/* Image Slide */}
                <div
                  style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                  className="w-full h-full bg-center bg-cover rounded-2xl duration-500 ease-in-out aspect-[16/9] md:aspect-[4/3] lg:aspect-[3/2] hover:bg-red-200"
                ></div>

                {/* Left Arrow */}
                <button 
                  className="absolute top-[50%] -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer 
                  hover:bg-red-400 hover:scale-110 transition-all duration-300"
                  onClick={prevSlide}
                >
                  <BsChevronCompactLeft size={30} />
                </button>

                {/* Right Arrow */}
                <button 
                  className="absolute top-[50%] -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer 
                  hover:bg-red-400 hover:scale-110 transition-all duration-300"
                  onClick={nextSlide}
                >
                  <BsChevronCompactRight size={30} />
                </button>

                {/* Dots Navigation */}
                <div className="flex justify-center py-2">
                  {slides.map((_, index) => (
                    <button 
                      key={index} 
                      onClick={() => setCurrentIndex(index)} 
                      className={`text-2xl cursor-pointer transition-all duration-300 ease-in-out 
                      ${currentIndex === index ? 'text-rose-500 scale-125' : 'text-white hover:text-red-400'}`}
                    >
                      <RxDotFilled />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Gradient />
        </div>

        {/* Background Effects */}
        <div className="absolute -top-[10%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[100%] lg:-top-[10%]">
          <div className="opacity-110">
            <img src={heroBackground} className="w-full" width={1440} height={1800} alt="hero" />
          </div>
        </div>
        <BackgroundCircles />
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero;