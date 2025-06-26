import { ClinicalContent } from "./ClinicalUtils";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Resizable } from 're-resizable';
import { setSectionId, setEditMode } from '../../../redux/features/mainstore/storeSlice';
import Fontsize from "../../fontsizeWrapper/Fontsize";
const ClinicallyProvernSection = () => {
  const dispatch = useDispatch();
  const { clinicalId, img, headingData, paragraphData, btnText } = ClinicalContent;
  const paragraph = paragraphData.toString().replace(/\n/g, "<br><br>");
  const [changeText, setChangeText] = useState({
    headingData: headingData,
    paragraphData: paragraph,
    btnData: btnText
  })
  const [selectedImages, setSelectedImages] = useState({
    clinicalImg: null
  });
  const [commonResizeDimensions, setCommonResizeDimensions] = useState({ textWidth: "500", textHeight: "fit-content", lineWidth: "520", lineHeight: "250", btnWidth: "250", btnHeight: "80", imgWidth: "100%", imgHeight: "100%" })

  const [fontSize, setFontSize] = useState({ textFont: 24, lineFontSize: 12, btnFontSize: 15 })

  const { editMode, sectionId } = useSelector((state) => state.mainStore);

  const toggleEditMode = () => {
    dispatch(setEditMode())
    dispatch(setSectionId(clinicalId))
  }

  const handleResize = (newWidth, newHeight, widthField, heightField) => {
    setCommonResizeDimensions((prev) => ({
      ...prev, [widthField]: newWidth, [heightField]: newHeight
    }))
  }

  const changeTextFunction = (event) => {
    const { name, value } = event.target;
    if (name === "paragraphData") {
      const breakFormatValue = value.replace(/<br><br>/g, "\n\n")
      setChangeText((prev) => ({ ...prev, [name]: breakFormatValue }))
    } else {
      setChangeText((prev) => (
        {
          ...prev, [name]: value
        }
      ))
    }
  }

  const changeFontsizeFunc = (event) => {
    const { name, value } = event.target;
    setFontSize((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImages(prev => ({
        ...prev,
        clinicalImg: imageUrl
      }));
    }
  };

  console.log(commonResizeDimensions.imgWidth, commonResizeDimensions.imgHeight, "imgDimensions");

  return (
    <div className="block md:flex items-center gap-5 mx-auto max-w-[80%]" onDoubleClick={toggleEditMode}>
      {editMode && sectionId === clinicalId
        ?
        <div className="block border-2 border-blue-500 p-2">
          <div className="flex items-center gap-x-4">
            <div>
              <Resizable
                className='border-2 border-blue-500'
                defaultSize={{
                  width: commonResizeDimensions.imgWidth,
                  height: commonResizeDimensions.imgHeight
                }}
                maxWidth={800}
                minWidth={100}
                maxHeight={500}
                minHeight={100}
                onResizeStop={(crd, direction, ref) => {
                  handleResize(ref.offsetWidth, ref.offsetHeight, "imgWidth", "imgHeight");
                }}
              >
                <div className='relative'>
                  <img style={{
                    width: commonResizeDimensions.imgWidth,
                    height: commonResizeDimensions.imgHeight
                  }} className='p-2 mx-auto' src={selectedImages.clinicalImg || img} alt='clinical-img' />
                  <label htmlFor="clinicallyImageUploader" className="absolute top-0 w-fit bg-blue-500 text-white text-xs p-2 rounded-full cursor-pointer">
                    Change Image
                  </label>
                </div>
              </Resizable>
              <div>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                  accept="image/*"
                  className="hidden"
                  id="clinicallyImageUploader"
                />
              </div>

            </div>
            <div>
              <div>
                <p className='m-0 text-blue-500'>Enter heading fontsize in pixels</p>
                <Fontsize fontsize={fontSize.textFont}>
                  <input
                    name="textFont"
                    className='border border-blue-500 text-lg text-center'
                    type='number'
                    value={fontSize.textFont}
                    onChange={changeFontsizeFunc}
                    max={2}
                    min={2}
                  />
                  <Resizable
                    defaultSize={{
                      width: commonResizeDimensions.textWidth,
                      height: commonResizeDimensions.textHeight
                    }}
                    minWidth={200}
                    maxWidth={700}
                    maxHeight={100}
                    minHeight={50}
                    onResizeStop={(crd, direction, ref) => {
                      handleResize(ref.offsetWidth, ref.offsetHeight, "textWidth", "textHeight");
                    }} >
                    <input style={{ width: `${commonResizeDimensions.textWidth}px`, height: `${commonResizeDimensions.textHeight}px`, fontSize: `${fontSize.textFont}px` }} name="headingData" className='text-secondary border-2 border-blue-500 outline-0' value={changeText.headingData}
                      onChange={(e) => changeTextFunction(e)}
                    />
                  </Resizable>
                </Fontsize>
              </div>
              <div>
                <p className='m-0 text-blue-500'>Enter paragraph fontsize in pixels</p>
                <Fontsize fontsize={fontSize.lineFontSize}>
                  <input
                    name="lineFontSize"
                    className='border border-blue-500 text-lg text-center'
                    type='number'
                    value={fontSize.lineFontSize}
                    onChange={changeFontsizeFunc}
                    max={2}
                    min={2}
                  />
                  <Resizable
                    defaultSize={{
                      width: commonResizeDimensions.lineWidth,
                      height: commonResizeDimensions.lineHeight
                    }}
                    minWidth={200}
                    maxWidth={520}
                    maxHeight={250}
                    minHeight={100}
                    onResizeStop={(crd, direction, ref) => {
                      handleResize(ref.offsetWidth, ref.offsetHeight, "lineWidth", "lineHeight");
                    }} >
                    <textarea name="paragraphData" className='text-gray-400 font-medium border-2 border-blue-500 outline-0 h-full' value={changeText.paragraphData.replace(/<br><br>/g, "\n\n")}
                      onChange={(e) => changeTextFunction(e)}
                      style={{ width: `${commonResizeDimensions.lineWidth}px`, height: `${commonResizeDimensions.lineHeight}px`, fontSize: `${fontSize.lineFontSize}px` }} />
                  </Resizable>
                </Fontsize>
              </div>
              <div>
                <p className='m-0 text-blue-500'>Enter button fontsize in pixels</p>
                <Fontsize fontsize={fontSize.btnFontSize}>
                  <input
                    name="btnFontSize"
                    className='border border-blue-500 text-lg text-center'
                    type='number'
                    value={fontSize.btnFontSize}
                    onChange={changeFontsizeFunc}
                    max={2}
                    min={2}
                  />
                  <Resizable
                    defaultSize={{
                      width: commonResizeDimensions.btnWidth,
                      height: commonResizeDimensions.btnHeight
                    }}
                    minWidth={100}
                    maxWidth={200}
                    maxHeight={80}
                    minHeight={50}
                    onResizeStop={(crd, direction, ref) => {
                      handleResize(ref.offsetWidth, ref.offsetHeight, "btnWidth", "btnHeight");
                    }} >
                    <div style={{ width: `${commonResizeDimensions.btnWidth}px`, height: `${commonResizeDimensions.btnHeight}px`, fontSize: `${fontSize.btnFontSize}px` }} className="border-2 border-blue-500">
                      <input name="btnData" className='w-full h-full text-white font-medium uppercase bg-btnBg rounded-full py-4 px-8 text-center hover:bg-primary cursor-pointer' value={changeText.btnData} onChange={(e) => changeTextFunction(e)}
                      />
                    </div>
                  </Resizable>
                </Fontsize>
              </div>
            </div>
          </div>
        </div>
        :
        <>
          <div>
            <img style={{
              width: commonResizeDimensions.imgWidth, height: commonResizeDimensions.imgHeight
            }} src={selectedImages.clinicalImg || img} alt="clinic-img" />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-secondary" style={{ width: `${commonResizeDimensions.textWidth}px`, height: `${commonResizeDimensions.textHeight}px`, fontSize: `${fontSize.textFont}px` }}>{changeText.headingData}</h2>
            <br />
            <p className="text-gray-400 font-medium max-w-[95%]" style={{
              width: `${commonResizeDimensions.lineWidth}px`, height: `${commonResizeDimensions.lineHeight}px`,
              fontSize: `${fontSize.lineFontSize}px`
            }} dangerouslySetInnerHTML={{ __html: changeText.paragraphData.replace(/\n\n/g, "<br><br>") }}></p>
            <button style={{ width: `${commonResizeDimensions.btnWidth}px`, height: `${commonResizeDimensions.btnHeight}px`, fontSize: `${fontSize.btnFontSize}px` }} className="text-white font-medium uppercase bg-btnBg rounded-full py-4 px-8 my-2 hover:bg-primary cursor-pointer">{changeText.btnData}</button>
          </div>
        </>
      }
    </div>
  )
}

export default ClinicallyProvernSection
