import React, { useState, useRef } from 'react';
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
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Resizable } from 're-resizable';
const initialImages = [
  { id: 0, img: Bedge1, name: 'img-0', alt: 'bedge-img-0' },
  { id: 1, img: Bedge2, name: 'img-1', alt: 'bedge-img-1' },
  { id: 2, img: Bedge3, name: 'img-2', alt: 'bedge-img-2' },
  { id: 3, img: Bedge4, name: 'img-3', alt: 'bedge-img-3' },
  { id: 4, img: Bedge5, name: 'img-4', alt: 'bedge-img-4' },
  { id: 5, img: Bedge6, name: 'img-5', alt: 'bedge-img-5' },
  { id: 6, img: Bedge7, name: 'img-6', alt: 'bedge-img-6' },
  { id: 7, img: Bedge8, name: 'img-7', alt: 'bedge-img-7' },
  { id: 8, img: Bedge9, name: 'img-8', alt: 'bedge-img-8' },
  { id: 9, img: Bedge10, name: 'img-9', alt: 'bedge-img-9' },
];

const ImageCarousel = () => {
  const commonDotClasses = 'w-2 border rounded-full border-gray-400 p-2 cursor-pointer';
  const defaultImgWidth = "w-full";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([...initialImages]);
  const [countIndex, setCountIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [imageWidth, setImageWidth] = useState(null);
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

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[currentIndex + index] = {
          ...updatedImages[currentIndex + index],
          img: imageUrl,
        };
        return updatedImages;
      });
    }
  };

  const imgResize = useRef(null);

  const handleResizeStop = (index) => {
    if (imgResize.current) {
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = {
          ...updatedImages[index],
          width: imgResize.current.state.width,
          height: imgResize.current.state.height,
        };
        console.log(updatedImages , index , "currentIndex")
        return updatedImages;
      });
    }
  };
  return (
    <div>
      <div
        onDoubleClick={handleEditMode}
        className={`flex justify-center items-center gap-x-12 ${editMode && 'border-2 border-blue-500'}`}
      >
        <div>
          <button onClick={handlePrev}>
            <MdOutlineKeyboardArrowLeft className="w-12 h-12 cursor-pointer" />
          </button>
        </div>

        {images.slice(currentIndex, currentIndex + 5).map((image, index) => (
          <div key={index}>
            {editMode ? (

              <div key={index} className="flex-col relative">
                <Resizable
               
                  ref={imgResize}
                  defaultSize={{
                    width: image.width,
                    height: image.height
                  }}
                  maxWidth={200}
                  maxHeight={300}
                  minWidth={100}
                  minHeight={100}
                  onResizeStop={() => handleResizeStop(index)}
                  >
                  <img draggable="false" key={index} src={image.img} alt={image.alt} style={{width : `${image.width}px` , height : `${image.height}px`}} /> 
                 
                </Resizable>
                <input type="file" accept="image/*" className="hidden" id={`imageUploader-${index}`}
                  onChange={(e) => handleImageChange(e, index)}
                />
                <label
                  htmlFor={`imageUploader-${index}`}
                  className="absolute top-0 w-fit bg-blue-500 text-white text-xs p-2 rounded-full cursor-pointer"
                >
                  Change Image
                </label>
              </div>
            ) : (
              <>
                <div key={index} className="flex-col">
                  <img draggable="false" key={index} src={image.img} alt={image.alt} className={` object-contain`}  style={{width : `${image.width}px` , height : `${image.height}px`}} />
                  <p>{image.name}</p>
                </div>
              </>
            )}
          </div>
        ))}
        <div>
          <button onClick={handleNext}>
            <MdOutlineKeyboardArrowRight className="w-12 h-12 cursor-pointer" />
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-x-4 my-4">
        {initialImages.map((item) => (
          <div key={item.id}>
            {countIndex === item.id ? (
              <div className={`${commonDotClasses} bg-gray-500`}></div>
            ) : (
              <div onClick={() => dotSlideFunc(item.id)} className={`${commonDotClasses}`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;