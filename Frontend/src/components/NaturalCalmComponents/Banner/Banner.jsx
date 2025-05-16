import React, { useState, useRef } from 'react';
import { BannerUtils } from './BannerUtils';
import { Resizable } from 're-resizable';
import Fontsize from '../../fontsizeWrapper/Fontsize';
import { setEditMode } from '../../../redux/features/mainStore/storeSlice';
import { useSelector, useDispatch } from 'react-redux';
import BannerCarousalBtn from './BannerCarousalBtn';
import BannerImgSection from './BannerImgSection';
import WaveAnimation from '../WaveAnimation/WaveAnimation';
const Banner = () => {
  const editMode = useSelector((state) => state.mainStore.editMode);
  const dispatch = useDispatch();
  const {
    buttonText, commonTopBorderDots, commonBottomBorderDots, commonLeftBorderDots, commonRightBorderDots,
    outerBorderClass, plainTextWidth, bannerImgs } = BannerUtils
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editText, setEditText] = useState({ text: "Natural Calm \n The Better Magnesium", buttonText: buttonText });
  const [fontsize, setFontsize] = useState({ textFontsize: 25, btnFontsize: 12 });
  const [selectedImages, setSelectedImages] = useState([]);
  const [textWidth, setTextWidth] = useState(plainTextWidth);
  const textResizableRef = useRef(null);
  const handleTextChange = (event) => {
    const target = event.target
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

  const handleResizeStop = () => {
    if (textResizableRef.current) {
      setTextWidth(`${textResizableRef.current.state.width}px`);
    }
  };

  const changeFontsizeFunc = (event) => {
    const target = event.target;
    if (target.id === "textId") {
      setFontsize((prev) => ({ ...prev, textFontsize: event.target.value }))
    } else if (target.id === "btnFontId") {
      setFontsize((prev) => ({ ...prev, btnFontsize: event.target.value }))
    }
  }

  const toggleEditMode = () => {
    dispatch(setEditMode());
  };
  return (
    <div className='h-full'>
      <div className='relative'>
        {editMode && (
          <>
            <div className={commonTopBorderDots}></div>
            <div className={commonBottomBorderDots}></div>
            <div className={commonLeftBorderDots}></div>
            <div className={commonRightBorderDots}></div>
          </>
        )}
        <div onDoubleClick={toggleEditMode} className={`${editMode && 'border-2 border-blue-500 max-w-[95%] mx-auto'} bg-secondary p-5 h-[100%]`}>
          <div className='flex items-center justify-center gap-x-4 text-white text-5xl'>
            <div >
              {editMode ? (
                <>
                  <Resizable
                    ref={textResizableRef}
                    defaultSize={{
                      width: 320,
                      height: 500
                    }}
                    className={`${outerBorderClass}`}
                    maxWidth={600}
                    minHeight={300}
                    minWidth={300}
                    maxHeight={400}
                    onResizeStop={handleResizeStop}
                  >
                    <div>
                      <p className='my-2 text-sm mb-0'>Enter text fontsize in pixels</p>
                      <input
                        id="textId"
                        className='border border-blue-500 mb-1 text-lg text-center'
                        type='number'
                        value={fontsize.textFontsize}
                        onChange={changeFontsizeFunc}
                        max={2}
                        min={2}
                      />
                      <Fontsize>
                        <textarea
                          id='paraText'
                          value={editText.text}
                          onChange={handleTextChange}
                          style={{ width: textWidth, fontSize: `${fontsize.textFontsize}px` }}
                          className="bg-transparent text-white border-none outline-0 cursor-pointer"
                          rows={4}
                        />
                      </Fontsize>
                      <p className='my-2 text-sm mb-0'>Enter button text fontsize in pixels</p>

                      <input
                        id="btnFontId"
                        className='border border-blue-500 my-2 text-lg text-center'
                        type='number'
                        value={fontsize.btnFontsize}
                        onChange={changeFontsizeFunc}
                        min={5}
                        max={5}
                      />
                      <Fontsize fontsize={fontsize.btnFontsize}>
                        <button style={{ fontSize: `${fontsize.btnFontsize}px` }} className='w-fit h-fit bg-primary rounded-full p-1 text-white'>
                          <input id="buttonText" className='w-fit h-fit text-center outline-0' value={editText.buttonText}
                            onChange={handleTextChange}
                            style={{ fontSize: `${fontsize.btnFontsize}px` }}
                          />
                        </button>
                      </Fontsize>

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
                <div>
                  <p
                    style={{ fontSize: `${fontsize.textFontsize}px` }}
                    dangerouslySetInnerHTML={{ __html: editText.text.replace(/\n/g, '<br/>') }}></p>
                  <button
                    style={{ fontSize: `${fontsize.btnFontsize}px` }}
                    className='bg-primary rounded-full p-2 text-white'>{editText.buttonText}</button>
                </div>
              )}

            </div>

            <BannerImgSection bannerImgs={bannerImgs}
              setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} selectedImages={selectedImages} />
          </div>

          <BannerCarousalBtn bannerImgs={bannerImgs}
            setCurrentIndex={setCurrentIndex} />
        </div>
        <div className='absolute bottom-0 w-full' style={{opacity : 0.5}}>
          <WaveAnimation />
        </div>
      </div>
    </div>
  );
};

export default Banner;
