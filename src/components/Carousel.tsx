import React, { useState } from 'react';

// Define the interface for the component props
interface CarouselProps {
  images: string[]; // Array of image URLs
}

const Carousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToNext = (): void => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = (): void => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={goToPrevious}>Previous</button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      <button onClick={goToNext}>Next</button>
      <div className="indicators">
        {images.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentIndex(index)}
            className={currentIndex === index ? 'active' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
