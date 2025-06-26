import { useState } from 'react'
import dicoverImg from '../../../assets/natural-calm/discover-imgs/discover.jpg';
import fruitImg from '../../../assets/natural-calm/discover-imgs/fruit-imgs.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { Resizable } from 're-resizable';
import { setEditMode, setSectionId } from '../../../redux/features/mainstore/storeSlice';
import { ImageContent } from './ImageUtils';
import Fontsize from '../../fontsizeWrapper/Fontsize';
const ImagesSection = () => {
  const discoverHeading = ImageContent.discoverHeading;
  const discoverDesc = ImageContent.discoverDesc;
  const btnText = ImageContent.btnText;
  const dispatch = useDispatch();
  const { editMode, sectionId } = useSelector((state) => state.mainStore);
  const breakDiscoverDesc = discoverDesc.toString().replace(/\n\n/g, "<br><br>");
  const [commonWidth, setCommonWidth] = useState({ imgWidth: "100%", paraWidth: "100%", img2Width: 500 });
  const [commonHeight, setCommonHeight] = useState({ imgHeight: 400, paraHeight: 400, img2Height: 400 });
  const [selectedImages, setSelectedImages] = useState({ discoverImg: null, fruitImg: null });
  const [changeText, setChangeText] = useState({ heading: discoverHeading, detail: breakDiscoverDesc, btnText: btnText });
  const [fontsize, changeFontsize] = useState({ textHeading: 20, paraHeading: 15 });

  const handleResize = (width, height, id) => {
    if (id === "imageId") {
      setCommonWidth({ imgWidth: width });
      setCommonHeight({ imgHeight: height });
    }
    if (id === "paragraphId") {
      setCommonWidth({ paraWidth: width });
      setCommonHeight({ paraHeight: height });
    }
    if (id === "secondImageId") {
      setCommonWidth({ img2Width: width });
      setCommonHeight({ img2Height: height });
    }
  }

  const handleImageChange = (event, imageKey) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImages((prev) => ({
          ...prev, [imageKey]: reader.result
        }))
      };
      reader.readAsDataURL(file);
    }
  };

  const changeTextFunc = (event, field) => {
    const formattedValue = event.target.value
    if (field === "detail") {
      setChangeText((prev) => ({
        ...prev,
        [field]: formattedValue
      }))
    } else {
      setChangeText((prev) => ({
        ...prev,
        [field]: event.target.value
      }))
    }
  }

  const changeFontsizeFunc = (event) => {
    const target = event.target;
    if (target.id === "textHeading") {
      changeFontsize((prev) => ({ ...prev, textHeading: event.target.value }))
    } else if (target.id === "paraText") {
      changeFontsize((prev) => ({ ...prev, textHeading: event.target.value }))
    }
  }

  const toggleEditMode = () => {
    dispatch(setEditMode())
    dispatch(setSectionId(ImageContent.imageSectionId))
  }

  return (
    <div className='mx-auto max-w-3/4 my-4' onDoubleClick={toggleEditMode}>
      {editMode && sectionId === ImageContent.imageSectionId
        ?
        <>
          <Resizable
            className='border-2 border-blue-500 mx-auto'
            defaultSize={{
              width: { commonWidth },
              height: { commonHeight }
            }}
            maxWidth={500}
            minWidth={100}
            maxHeight={500}
            minHeight={100}
            onResizeStop={(crd, direction, ref) => {
              handleResize(ref.offsetWidth, ref.offsetHeight, "imageId");
            }}
          >
            <div className='relative'>
              <img id="imageId" className='object-contain mx-auto p-1' style={{ width: commonWidth.imgWidth, height: commonHeight.imgHeight }} src={selectedImages.discoverImg || dicoverImg} alt="dicover-img" />
              <label htmlFor="discoverImageUploader" className="absolute top-0 w-fit bg-blue-500 text-white text-xs p-2 rounded-full cursor-pointer">
                Change Image
              </label>
            </div>
          </Resizable>
          <div>
            <input
              type="file"
              onChange={(e) => handleImageChange(e, "discoverImg")}
              accept="image/*"
              className="hidden"
              id="discoverImageUploader"
            />
          </div>
        </>
        :
        <img className='object-contain mx-auto' style={{ width: commonWidth.imgWidth, height: commonHeight.imgHeight }} src={selectedImages.discoverImg || dicoverImg} alt="dicover-img" />
      }

      <div className='block md:flex justify-between items-center gap-x-4 my-4'>
        <div>
          {editMode && sectionId === ImageContent.imageSectionId ?
            <div>
              <p >Enter fontsize in pixels</p>
              <Fontsize fontsize={fontsize.textHeading}>
                <input
                  id="textHeading"
                  className='border border-blue-500 text-lg text-center'
                  type='number'
                  value={fontsize.textHeading}
                  onChange={changeFontsizeFunc}
                  max={2}
                  min={2}
                />
                <Resizable
                  className='border-2 border-blue-500'
                  defaultSize={{
                    width: { commonWidth },
                    height: { commonHeight }
                  }}
                  maxWidth={500}
                  maxHeight={800}
                  minHeight={300}
                  minWidth={100}
                  onResizeStop={(crd, direction, ref) => {
                    handleResize(ref.offsetWidth, ref.offsetHeight, "paragraphId");
                  }}
                >
                  <div style={{ width: commonWidth.paraWidth, height: commonHeight.paraHeight }}>
                    <input className='text-secondary w-full' style={{ fontSize: `${fontsize.textHeading}px` }} onChange={(e) => changeTextFunc(e, "heading")} value={changeText.heading} />
                    <textarea
                      value={changeText.detail.replace(/<br><br>/g, "\n\n")}
                      onChange={(e) => changeTextFunc(e, "detail")}
                      rows={10}
                      className='w-full outline-0 text-gray-500'
                    >
                    </textarea>
                    <button className='bg-primary text-white rounded-full p-4'>
                      <input className="text-center outline-0" value={changeText.btnText} onChange={(e) => changeTextFunc(e, "btnText")} /></button>
                  </div>
                </Resizable>
              </Fontsize>
            </div>
            :
            <div style={{ width: commonWidth.paraWidth, height: commonHeight.paraHeight }}>
              <p className='text-secondary' style={{ fontSize: `${fontsize.textHeading}px` }}>{changeText.heading}</p>
              <p className='text-[#7A7A7A] text-xs md:text-lg' dangerouslySetInnerHTML={{ __html: changeText.detail.replace(/\n\n/g, "<br></br>") }}></p>
              <button className='bg-primary text-white md:text-lg text-xs rounded-full p-4'>{changeText.btnText}</button>
            </div>
          }
        </div>
        <div>
          {editMode && sectionId === ImageContent.imageSectionId ?
            <>
              <Resizable
                className='border-2 border-blue-500'
                defaultSize={{
                  width: { commonWidth },
                  height: { commonHeight }
                }}
                maxWidth={800}
                minWidth={100}
                maxHeight={500}
                minHeight={100}
                onResizeStop={(crd, direction, ref) => {
                  handleResize(ref.offsetWidth, ref.offsetHeight, "secondImageId");
                }}
              >
                <div className='relative'>
                  <img style={{ width: commonWidth.img2Width, height: commonHeight.img2Height }} className='p-2 mx-auto' src={selectedImages.fruitImg || fruitImg} alt='fruit-img' />
                  <label htmlFor="fruitImageUploader" className="absolute top-0 w-fit bg-blue-500 text-white text-xs p-2 rounded-full cursor-pointer">
                    Change Image
                  </label>
                </div>
              </Resizable>
              <div>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, "fruitImg")}
                  accept="image/*"
                  className="hidden"
                  id="fruitImageUploader"
                />
              </div>
            </>
            :
            <img style={{ width: commonWidth.img2Width }} className='p-2 mx-auto object-contain h-full' src={selectedImages.fruitImg || fruitImg} alt='fruit-img' />
          }

        </div>
      </div>
    </div>
  )
}

export default ImagesSection;
