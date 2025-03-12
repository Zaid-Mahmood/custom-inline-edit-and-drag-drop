import React, { useState } from 'react';
import Bedge1 from '../../../assets/natural-calm/bedge-imgs/bedge-img-1.jpg';
import Bedge2 from '../../../assets/natural-calm/bedge-imgs/bedge-img-2.jpg';
import Bedge3 from '../../../assets/natural-calm/bedge-imgs/bedge-img-3.jpg';
import Bedge4 from '../../../assets/natural-calm/bedge-imgs/bedge-img-4.jpg';
import Bedge5 from '../../../assets/natural-calm/bedge-imgs/bedge-img-5.jpg';
import Bedge6 from '../../../assets/natural-calm/bedge-imgs/bedge-img-6.jpg';
import Bedge7 from '../../../assets/natural-calm/bedge-imgs/bedge-img-7.jpg';
import Bedge8 from '../../../assets/natural-calm/bedge-imgs/bedge-img-8.jpg';
import Bedge9 from '../../../assets/natural-calm/bedge-imgs/bedge-img-9.jpg';
import Bedge10 from '../../../assets/natural-calm/bedge-imgs/bedge-img-10.jpg';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
const initialImages = [
  { id: 0, img: Bedge1, name: "img-0", alt: 'bedge-img-0' },
  { id: 1, img: Bedge2, name: "img-1", alt: 'bedge-img-1' },
  { id: 2, img: Bedge3, name: "img-2", alt: 'bedge-img-2' },
  { id: 3, img: Bedge4, name: "img-3", alt: 'bedge-img-3' },
  { id: 4, img: Bedge5, name: "img-4", alt: 'bedge-img-4' },
  { id: 5, img: Bedge6, name: "img-5", alt: 'bedge-img-5' },
  { id: 6, img: Bedge7, name: "img-6", alt: 'bedge-img-6' },
  { id: 7, img: Bedge8, name: "img-7", alt: 'bedge-img-7' },
  { id: 8, img: Bedge9, name: "img-8", alt: 'bedge-img-8' },
  { id: 9, img: Bedge10, name: "img-9", alt: 'bedge-img-9' }
];

const commonDotClasses = "w-2 border rounded-full border-gray-400 p-2 cursor-pointer";

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([...initialImages]);
  const [countIndex, setCountIndex] = useState(0);

  const handleNext = () => {
    const halfLength = Math.floor(images.length / 2);
    if (currentIndex >= halfLength) {
      setImages((prevImages) => [...prevImages.slice(1), prevImages[0]]);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex <= 0) {
      setImages((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const dotSlideFunc = (id) => {
    setCountIndex(id);
    const selectedIndex = initialImages.findIndex((img) => img.id === id);
    if (selectedIndex !== -1) {
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        while (updatedImages[0].id !== id) {
          updatedImages.push(updatedImages.shift());
        }
        return updatedImages;
      });
      setCurrentIndex(0);
    }
  };

  return (
    <div >
      <div className="flex  justify-center items-center gap-x-12">
      <div >

      <button onClick={handlePrev}><MdOutlineKeyboardArrowLeft className='w-12 h-12 cursor-pointer' /></button>
      </div>

        {images.slice(currentIndex, currentIndex + 5).map((image, index) => (
          <div key={index} className='flex-col'>
            <img key={index} src={image.img} alt={image.alt} className="w-30 h-30 object-contain" />
            <p>{image.name}</p>
          </div>
        ))}
        <div>
          <button  onClick={handleNext}><MdOutlineKeyboardArrowRight className='w-12 h-12 cursor-pointer' /></button>
        </div>
      </div>

      <div className='flex justify-center gap-x-4 my-4'>
        {initialImages.map((item) => (
          <div key={item.id}>
            {countIndex === item.id ?
              (<div className={`${commonDotClasses} bg-gray-500`}></div>) :
              (<div onClick={() => dotSlideFunc(item.id)} className={`${commonDotClasses}`}></div>)
            }   </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;