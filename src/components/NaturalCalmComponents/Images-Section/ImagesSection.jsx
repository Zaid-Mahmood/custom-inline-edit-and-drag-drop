import { useState } from 'react'
import dicoverImg from '../../../assets/natural-calm/discover-imgs/discover.jpg';
import fruitImg from '../../../assets/natural-calm/discover-imgs/fruit-imgs.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { Resizable } from 're-resizable';
import { setEditMode } from '../../../redux/features/mainStore/storeSlice';
const ImagesSection = () => {
  const dispatch = useDispatch();
  const editMode = useSelector((state) => state.mainStore.editMode);
  const discoverHeading = "Great Tasting Natural Fruit Flavours";
  const discoverDesc = ["Natural Calm is a habit you’ll love to keep—because it’s delicious.\n Our magnesium citrate powders are made with organic fruit flavours and sweetened with stevia.\n Drink it like a soothing tea, add it to cold water, smoothies, or juice.Unlike other magnesium powders, there’s no chalkiness, and no lumps.\n So even picky adults and kids love to take Natural Calm.\n"]
  const breakDiscoverDesc = discoverDesc.join("").replace(/\n/g, "<br/><br/>");
  const btnText = "Explore Our Flavors"
  const [commonWidth, setCommonWidth] = useState({ imgWidth: "100%", paraWidth: "100%", img2Width: 500 });
  const [commonHeight, setCommonHeight] = useState({ imgHeight: 400, paraHeight: 400, img2Height: 400 });
  const [selectedImages, setSelectedImages] = useState({
    discoverImg: null,
    fruitImg: null
  });
  const [changeText, setChangeText] = useState({ heading: discoverHeading, detail: breakDiscoverDesc, btnText: btnText })
  
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
    if(field === "detail"){
      const newValue = formattedValue.replace(/\n\n/g , '<br/><br/>')
        setChangeText((prev)=> ({
          ...prev ,
          [field] : newValue
        }))
    } else {
      setChangeText((prev) => ({
        ...prev,
        [field]: event.target.value
    }))
    }
  }
  return (
    <div className='mx-auto max-w-3/4 my-4'>
      {editMode ?
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
              <img id="imageId" className='object-contain mx-auto p-1' style={{ width: commonWidth.imgWidth, height: commonHeight.imgHeight }} onDoubleClick={() => dispatch(setEditMode(false))} src={selectedImages.discoverImg || dicoverImg} alt="dicover-img" />
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
        <img className='object-contain mx-auto' style={{ width: commonWidth.imgWidth, height: commonHeight.imgHeight }} onDoubleClick={() => dispatch(setEditMode(true))} src={selectedImages.discoverImg || dicoverImg} alt="dicover-img" />
      }

      <div className='flex justify-between items-center gap-x-4 my-4'>
        <div>
          {editMode ?
            <>
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
                <div style={{ width: commonWidth.paraWidth, height: commonHeight.paraHeight }} onDoubleClick={() => dispatch(setEditMode(false))}>
                  <input className='text-secondary text-2xl w-full' onChange={(e) => changeTextFunc(e, "heading")} value={changeText.heading} />
                  <textarea
                    value={changeText.detail.replace(/<br\/><br\/>/g,'\n\n')}
                    onChange={(e) => changeTextFunc(e, "detail")}
                    rows={12}
                    className='w-full outline-0 text-gray-500'
                  >
                  </textarea>
                  <button className='bg-primary text-white rounded-full p-4'>
                    <input  className = "text-center outline-0" value={changeText.btnText} onChange={(e) => changeTextFunc(e, "btnText")} /></button>
                </div>
              </Resizable>
            </>
            :
            <div style={{ width: commonWidth.paraWidth, height: commonHeight.paraHeight }} onDoubleClick={() => dispatch(setEditMode(true))}>
              <p className='text-secondary text-2xl'>{changeText.heading}</p>
              <p className='text-[#7A7A7A] text-lg' dangerouslySetInnerHTML={{__html: changeText.detail}}></p>
              <button className='bg-primary text-white rounded-full p-4'>{changeText.btnText}</button>
            </div>
          }
        </div>
        <div>
          {editMode ?
            <>
              <Resizable
                className='border-2 border-blue-500'
                defaultSize={{
                  width: { commonWidth },
                  height: {commonHeight}
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
                  <img onDoubleClick={() => dispatch(setEditMode(false))} style={{ width: commonWidth.img2Width, height: commonHeight.img2Height }} className='p-2 mx-auto' src={selectedImages.fruitImg || fruitImg} alt='fruit-img' />
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
            <img onDoubleClick={() => dispatch(setEditMode(true))} style={{ width: commonWidth.img2Width, height: commonHeight.img2Height }} className='p-2 mx-auto' src={selectedImages.fruitImg || fruitImg} alt='fruit-img' />
          }

        </div>
      </div>
    </div>
  )
}

export default ImagesSection
