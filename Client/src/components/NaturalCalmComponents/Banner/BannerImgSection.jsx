import React, { useEffect, useState, useRef } from 'react'
import { BannerUtils } from './BannerUtils';
import { Resizable } from 're-resizable';
import { useSelector } from 'react-redux';

const BannerImgSection = ({ bannerId, bannerImgs, setCurrentIndex, currentIndex, selectedImages }) => {
    const { editMode, sectionId } = useSelector((state) => state.mainStore);
    const { imgOuterBorderClass, imageWidth } = BannerUtils
    const [imgWidth, setImgWidth] = useState(imageWidth)
    const slideTimeout = useRef(null);
    const isHovered = useRef(false);
    const imgResizeableRef = useRef(null);

    const handleResizeStopImg = () => {
        if (imgResizeableRef.current) {
            setImgWidth(`${imgResizeableRef.current.state.width}px`)
        }
    }
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
    return (
        <div>
            <div className={`${editMode && sectionId === bannerId && 'relative'}`}>
                {editMode && sectionId === bannerId ?
                    <Resizable
                        ref={imgResizeableRef}
                        defaultSize={{
                            width: 300,
                            height: 300,
                        }}
                        maxWidth={300}
                        maxHeight={300}
                        minHeight={100}
                        onResizeStop={handleResizeStopImg}
                    >
                        <img
                            draggable="false"
                            onMouseLeave={() => mouseLeaveFunction()}
                            onMouseEnter={() => mouseEnterFunction()}
                            className={`object-contain ${imgOuterBorderClass}`}
                            src={selectedImages[currentIndex] || bannerImgs[currentIndex].img}
                            alt={bannerImgs[currentIndex].alt}
                            style={{ width: imgWidth }}
                        />
                    </Resizable>
                    :
                    <div>
                        <img
                            id="imgWidth"
                            draggable="false"
                            onMouseLeave={() => mouseLeaveFunction()}
                            onMouseEnter={() => mouseEnterFunction()}
                            className='h-56 object-contain'
                            src={selectedImages[currentIndex] || bannerImgs[currentIndex].img}
                            alt={bannerImgs[currentIndex].alt}
                            style={{ width: imgWidth }}
                        />
                    </div>
                }
                {editMode && sectionId === bannerId &&
                    <label htmlFor="imageUploader" className="absolute top-0 w-fit bg-blue-500 text-white text-xs p-2 rounded-full cursor-pointer">
                        Change Image
                    </label>
                }
            </div>
        </div>
    )
}

export default BannerImgSection
