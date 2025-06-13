import { useState, useRef, useEffect } from 'react';
import { Resizable } from 're-resizable';
import { initialImages, reactIcons, bedgeSectionId } from './ImgSectionUtils';
import { useDispatch, useSelector } from 'react-redux';
import { setEditMode, setSectionId } from "../../../redux/features/mainstore/storeSlice";
const ImageCarousel = () => {
  const commonDotClasses = 'w-2 border rounded-full border-gray-400 p-2 cursor-pointer';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([...initialImages]);
  const [isAutoSlidePaused, setIsAutoSlidePaused] = useState(false);
  const slideIntervalRef = useRef(null);
  const dispatch = useDispatch();
  const { editMode, sectionId } = useSelector((state) => state.mainStore);
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
    if (!isAutoSlidePaused) {
      slideIntervalRef.current = setInterval(goToNextSlide, 3000);
    }
    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [isAutoSlidePaused, images.length]);

  const pauseAndNavigate = (navigateFunction) => {
    setIsAutoSlidePaused(true);
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
    navigateFunction();
  };

  const handleNext = () => {
    pauseAndNavigate(goToNextSlide);
  };

  const handlePrev = () => {
    pauseAndNavigate(() => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length));
  };

  const dotSlideFunc = (dotClickedId) => {
    pauseAndNavigate(() => setCurrentIndex(dotClickedId));
  };


  const handleEditMode = () => {
    dispatch(setEditMode());
    dispatch(setSectionId(bedgeSectionId))
  };

  const handleImageChange = (event, displayIndex) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        const actualIndexInFullArray = (currentIndex + displayIndex) % initialImages.length;

        updatedImages[actualIndexInFullArray] = {
          ...updatedImages[actualIndexInFullArray],
          img: imageUrl,
        };
        return updatedImages;
      });
    }
  };

  const imgResize = useRef(null);

  const handleResizeStop = (displayIndex) => {
    if (imgResize.current) {
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        const actualIndexInFullArray = (currentIndex + displayIndex) % initialImages.length;

        updatedImages[actualIndexInFullArray] = {
          ...updatedImages[actualIndexInFullArray],
          width: imgResize.current.state.width,
          height: imgResize.current.state.height,
        };
        return updatedImages;
      });
    }
  };

  const getDisplayedImages = () => {
    const imagesToDisplay = [];
    const totalImages = images.length;
    const itemsToShow = 5;

    for (let i = 0; i < itemsToShow; i++) {
      const actualIndex = (currentIndex + i) % totalImages;
      imagesToDisplay.push(images[actualIndex]);
    }
    return imagesToDisplay;
  };

  const displayedImages = getDisplayedImages();

  return (
    <div >
      <div
        onDoubleClick={handleEditMode}
        className={`flex justify-center items-center gap-x-12 ${editMode && sectionId === bedgeSectionId && 'border-2 border-blue-500'}`}
      >
        <div>
          <button onClick={handlePrev}>
            <reactIcons.MdOutlineKeyboardArrowLeft className="w-12 h-12 cursor-pointer" />
          </button>
        </div>

        {displayedImages.map((image, index) => (
          <div key={image.id}>
            {editMode && sectionId === bedgeSectionId ? (
              <div className="flex-col relative">
                <Resizable
                  ref={imgResize}
                  defaultSize={{
                    width: image.width || 150,
                    height: image.height || 200
                  }}
                  maxWidth={200}
                  maxHeight={300}
                  minWidth={100}
                  minHeight={100}
                  onResizeStop={() => handleResizeStop(index)}
                >
                  <img draggable="false" src={image.img} alt={image.alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </Resizable>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id={`imageUploader-${image.id}`}
                  onChange={(e) => handleImageChange(e, index)}
                />
                <label
                  htmlFor={`imageUploader-${image.id}`}
                  className="absolute top-0 w-fit bg-blue-500 text-white text-xs p-2 rounded-full cursor-pointer"
                >
                  Change Image
                </label>
              </div>
            ) : (
              <div className="flex-col">
                <img draggable="false" src={image.img} alt={image.alt} className={`object-contain`} style={{ width: `${image.width}px`, height: `${image.height}px` }} />
                <p>{image.name}</p>
              </div>
            )}
          </div>
        ))}
        <div>
          <button onClick={handleNext}>
            <reactIcons.MdOutlineKeyboardArrowRight className="w-12 h-12 cursor-pointer" />
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-x-4 my-4">
        {images.map((item) => {
          const isNotActiveDot = displayedImages.findIndex(img => img.id === item.id);
          return (
            <div key={item.id} onClick={() => dotSlideFunc(item.id)}>
              <div className={`${commonDotClasses} ${!isNotActiveDot && 'bg-gray-500'}`}></div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ImageCarousel;