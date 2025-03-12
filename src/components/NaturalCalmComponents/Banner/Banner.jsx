import React, { useState, useEffect, useRef } from 'react';
import bannerImg1 from '../../../assets/natural-calm/banner-imgs/banner-img-1.webp';
import bannerImg2 from '../../../assets/natural-calm/banner-imgs/banner-img-2.webp';
import bannerImg3 from '../../../assets/natural-calm/banner-imgs/banner-img-3.webp';
import bannerImg4 from '../../../assets/natural-calm/banner-imgs/banner-img-4.webp';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Resizable } from 're-resizable';
const Banner = () => {
  const buttonText = "Get some";
  const commonArrowClasses = "bg-white text-primary p-2 rounded-full cursor-pointer";
  const commonTopBorderDots = "-top-2 left-1/2 absolute p-2 border-2 border-blue-500 bg-white rounded-full";
  const commonBottomBorderDots = "-bottom-2 left-1/2 absolute p-2 border-2 border-blue-500 bg-white rounded-full";
  const commonLeftBorderDots = "top-1/2 left-4.5 absolute p-2 border-2 border-blue-500 bg-white rounded-full";
  const commonRightBorderDots = "top-1/2 right-4.5 absolute p-2 border-2 border-blue-500 bg-white rounded-full";
  const outerBorderClass = "border-2 border-blue-500 w-full h-full p-4";
  const plainTextWidth = 'w-full'
  const bannerImgs = [
    { img: bannerImg1, alt: "banner-1" },
    { img: bannerImg2, alt: "banner-2" },
    { img: bannerImg3, alt: "banner-3" },
    { img: bannerImg4, alt: "banner-4" }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState({ text: "Natural Calm \n The Better Magnesium", buttonText: buttonText });
  const [selectedImages, setSelectedImages] = useState([]);
  const [textWidth , setTextWidth] = useState(plainTextWidth);
  const slideTimeout = useRef(null);
  const isHovered = useRef(false);
  const textResizableRef = useRef(null);
  const moveSlideRightFunc = () => {
    setCurrentIndex((prev) => prev < bannerImgs.length - 1 ? prev + 1 : prev - (bannerImgs.length - 1))
  };

  const moveSlideLeftFunc = () => {
    setCurrentIndex((prev) => prev === 0 ? bannerImgs.length - 1 : prev - 1)
  };

  const mouseEnterFunction = () => {
    clearTimeout(slideTimeout.current);
    isHovered.current = true;
  };

  const mouseLeaveFunction = () => {
    isHovered.current = false;
    slideTimeout.current = setTimeout(() => {
      setCurrentIndex((prev) => prev < bannerImgs.length - 1 ? prev + 1 : prev - (bannerImgs.length - 1))
    }, 2000)
  };

  useEffect(() => {
    if (!isHovered.current) {
      const updateSlide = () => {
        setCurrentIndex((prev) => prev < bannerImgs.length - 1 ? prev + 1 : prev - (bannerImgs.length - 1))
      };
      slideTimeout.current = setTimeout(updateSlide, 5000);
      return () => {
        clearTimeout(slideTimeout.current);
      }
    }
  }, [currentIndex]);

  const editModeFunction = () => {
    setEditMode(!editMode);
  };

  const handleTextChange = (event) => {
    const target = event.target
    console.log(event , "target")
    if (target.id === "paraText") {
      setEditText((prevText) => ({
        ...prevText,
        text: event.target.value
      }));
    } else if (target.id === "buttonText") {
      setEditText((prevText) => ({
        ...prevText,
        buttonText: event.target.value
      }));
    }
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newSelectedImages = [...selectedImages];
        newSelectedImages[index] = reader.result;
        setSelectedImages(newSelectedImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResizeStop = (e, direction, ref, d) => {
    if (textResizableRef.current) {
      console.log(textResizableRef.current , "currentWidth")
      setTextWidth(`${textResizableRef.current.state.width}px`);
    }
  };

  console.log(textWidth , "textWidth")
  return (
    <div className='h-screen'>
      <div className='relative'>
        {editMode && (
          <>
            <div className={commonTopBorderDots}></div>
            <div className={commonBottomBorderDots}></div>
            <div className={commonLeftBorderDots}></div>
            <div className={commonRightBorderDots}></div>
          </>
        )}
        <div onDoubleClick={editModeFunction} className={`${editMode && 'border-2 border-blue-500 max-w-[95%] mx-auto'} bg-secondary p-5 h-[100%]`}>
          <div className='flex items-center justify-center gap-x-4 text-white text-5xl'>
            <div >
              {editMode ? ( 
                <>
                  <Resizable
                   ref={textResizableRef} 
                  defaultSize={{
                    width: 320,
                    height: 300   
                  }} 
                   className= {`${outerBorderClass}`}
                   maxWidth = {600}
                   minHeight={300}
                   minWidth={300}
                  maxHeight = {400}
                  onResizeStop={handleResizeStop} 
                  >
                    <div>
                      <textarea
                        id='paraText'
                        value={editText.text}
                        onChange={handleTextChange}
                        className="bg-transparent text-white text-5xl border-none outline-0 w-full cursor-pointer"
                        rows={4}
                      />
                      <br />
                      <button className='w-[25%] bg-primary rounded-full p-2 text-white text-xl'>
                        <input id="buttonText" className='max-w-full h-full text-center outline-0 overflow-auto' value={editText.buttonText}
                          onChange={handleTextChange}
                        />
                      </button>
                    </div>
                  </Resizable>
                  <div>
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e, currentIndex)}
                      accept="image/*"
                      className="hidden"
                      id="imageUploader"
                    />
                  </div>

                </>
              ) : (
                <div style={{width : textWidth}}>
                  <p dangerouslySetInnerHTML={{ __html: editText.text.replace(/\n/g, '<br/>') }}></p>
                  <button
                    className='bg-primary rounded-full p-2 text-white text-xl'>{editText.buttonText}</button>
                </div>
              )}
            </div>
            <div className={`${editMode && 'relative'}`}>
              {editMode ?
                <Resizable
                  defaultSize={{
                    width: 300,
                    height: 300,
                  }}
                  maxWidth = {300}
                  maxHeight = {300}
                  minHeight={100}
                >
                  <img
                    draggable="false"
                    onMouseLeave={() => mouseLeaveFunction()}
                    onMouseEnter={() => mouseEnterFunction()}
                    className={`w-full object-contain ${outerBorderClass}`}  
                    src={selectedImages[currentIndex] || bannerImgs[currentIndex].img}
                    alt={bannerImgs[currentIndex].alt}
                  />
                </Resizable>
                :
                <img
                  draggable="false"
                  onMouseLeave={() => mouseLeaveFunction()}
                  onMouseEnter={() => mouseEnterFunction()}
                  className='w-56 h-56 object-contain'
                  src={selectedImages[currentIndex] || bannerImgs[currentIndex].img}
                  alt={bannerImgs[currentIndex].alt}
                />
              }
              {editMode &&
                <label htmlFor="imageUploader" className="absolute top-0 w-fit bg-blue-500 text-white text-xs p-2 rounded-full cursor-pointer">
                  Change Image
                </label>
              }
            </div>

          </div>

          <div className='flex gap-x-2 justify-end'>
            <div onClick={moveSlideLeftFunc} className={commonArrowClasses}>
              <FaArrowLeft />
            </div>
            <div onClick={moveSlideRightFunc} className={commonArrowClasses}>
              <FaArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
