import React from 'react'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const BannerCarousalBtn = ({bannerImgs , setCurrentIndex}) => {
  const commonArrowClasses = "bg-white text-primary p-2 rounded-full cursor-pointer";
  const moveSlideRightFunc = () => {
    console.log("clickedArr")
    setCurrentIndex((prev) => prev < bannerImgs.length - 1 ? prev + 1 : prev - (bannerImgs.length - 1))
  };

  const moveSlideLeftFunc = () => {
    setCurrentIndex((prev) => prev === 0 ? bannerImgs.length - 1 : prev - 1)
  };

  return (
    <div>
        <div className='flex gap-x-2 justify-end'>
            <div onClick={moveSlideLeftFunc} className={commonArrowClasses}>
              <FaArrowLeft />
            </div>
            <div onClick={moveSlideRightFunc} className={commonArrowClasses}>
              <FaArrowRight />
            </div>
          </div>
    </div>
  )
}

export default BannerCarousalBtn;
