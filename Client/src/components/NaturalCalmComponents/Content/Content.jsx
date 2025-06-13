import React, { useState  } from 'react';
import { MdCheckCircleOutline } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { setEditMode , setSectionId } from '../../../redux/features/mainStore/storeSlice';
import { Resizable } from 're-resizable';
import { ContentData } from './Contentutils';
import Fontsize from '../../fontsizeWrapper/Fontsize';
const Content = () => {
  const dispatch = useDispatch();
  const {editMode , sectionId} = useSelector((state) => state.mainStore);
  const { heading, subHeading, points, btnContent } = ContentData

  const breakLines = points.join('').replace(/\n/g, '<br> <br>');

  const [changeText, setChangeText] = useState({ heading: heading, subHeading: subHeading, breakLines: breakLines, btnText: btnContent })

  const [commonResizeDimensions, setCommonResizeDimensions] = useState({ textWidth: 800, textHeight: 50, subHeadingWidth: 800, subHeadingHeight: 50, lineWidth: 800, lineHeight: 350, btnWidth: 150, btnHeight: 50 })

  const [fontSize, setFontSize] = useState({ textFont: 24, subHeadingTextFont: 24, breakLines: 20, btnFontSize: 15 })
  const handleResize = ( newWidth, newHeight, widthField, heightField) => {
    setCommonResizeDimensions((prev) => ({
      ...prev, [widthField]: newWidth, [heightField]: newHeight
    }))
  };

  const changeTextFunction = (event, field) => {
    const { value } = event.target;
    if (field === "breakLines") {
      const breakFormatValue = value.replace(/\n\n/g, "<br> <br>")
      setChangeText((prev) => ({
        ...prev,
        [field]: breakFormatValue
      }))
    } else {
      setChangeText((prev) => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const changeFontsizeFunc = (event) => {
    const target = event.target;
    if (target.id === "textId") {
      setFontSize((prev) => ({ ...prev, textFont: event.target.value }))
    } else if (target.id === "subTextId") {
      setFontSize((prev) => ({ ...prev, subHeadingTextFont: event.target.value }))
    }
    else if (target.id === "breakLines") {
      setFontSize((prev) => ({ ...prev, breakLines: event.target.value }))
    }
    else if (target.id === "btnFontSize") {
      setFontSize((prev) => ({ ...prev, btnFontSize: event.target.value }))
    }
  }
  const toggleEditModeFunc = () => {
    dispatch(setEditMode())
    dispatch(setSectionId(ContentData.contentId))
  }
  return (
    <div onDoubleClick={toggleEditModeFunc}>
      <div className='bgColor text-white p-6 h-full'>
        {editMode && sectionId === ContentData.contentId ? (
          <div>
            <p className='m-0'>Enter text fontsize in pixels</p>
            <Fontsize fontsize={fontSize.textFont}>
              <input
                id="textId"
                className='border border-blue-500 text-lg text-center'
                type='number'
                value={fontSize.textFont}
                onChange={changeFontsizeFunc}
                max={2}
                min={2}
              />
              <Resizable
                defaultSize={{ width: commonResizeDimensions.textWidth, height: commonResizeDimensions.textHeight }}
                maxWidth={800}
                maxHeight={300}
                minHeight={50}
                minWidth={50}
                onResizeStop={(crd, direction, ref) => {
                  handleResize(ref.offsetWidth, ref.offsetHeight, "textWidth" , "textHeight");
                }}
              >
                <input
                  className='border-2 border-blue-500 outline-0'
                  value={changeText.heading}
                  onChange={(e) => changeTextFunction(e, "heading")}
                  style={{ width: `${commonResizeDimensions.textWidth}px`, height: `${commonResizeDimensions.textHeight}px`, fontSize: `${fontSize.textFont}px` }}
                />
              </Resizable>
            </Fontsize>
          </div>
        ) : (
          <h1
            className='ml-16 pb-5'
            style={{ width: `${commonResizeDimensions.textWidth}px`, height: `${commonResizeDimensions.textHeight}px`, fontSize: `${fontSize.textFont}px` }}

          >
            {changeText.heading}
          </h1>
        )}
        <div className='flex items-start'>
          <div>
            <MdCheckCircleOutline className='w-24 h-24' />
          </div>
          <div className='flex flex-col'>
            <div>
              {editMode && sectionId === ContentData.contentId ?

                <div>
                  <p >Enter text fontsize in pixels</p>
                  <Fontsize fontsize={fontSize.subHeadingTextFont}>
                    <input
                      id="subTextId"
                      className='border border-blue-500 text-lg text-center'
                      type='number'
                      value={fontSize.subHeadingTextFont}
                      onChange={changeFontsizeFunc}
                      max={2}
                      min={2}
                    />
                    <Resizable
                      defaultSize={{ width: commonResizeDimensions.subHeadingWidth, height: commonResizeDimensions.subHeadingHeight }}
                      maxWidth={800}
                      maxHeight={300}
                      minHeight={50}
                      minWidth={50}
                      onResizeStop={(crd, direction, ref) => {
                        handleResize(ref.offsetWidth, ref.offsetHeight, "subHeadingWidth", "subHeadingHeight");
                      }}
                    >
                      <input onChange={(e) => changeTextFunction(e, "subHeading")} className='border-2 border-blue-500 w-full outline-0' value={changeText.subHeading} />
                    </Resizable>
                  </Fontsize>

                </div>
                :
                <p style={{ width: commonResizeDimensions.subHeadingWidth, height: commonResizeDimensions.subHeadingHeight, fontSize: `${fontSize.subHeadingTextFont}px` }} className='text-white'>{changeText.subHeading}</p>
              }
              <ul>
                {editMode && sectionId === ContentData.contentId ? (
                  <div>
                    <p >Enter text fontsize in pixels</p>
                    <Fontsize fontsize={fontSize.breakLines}>
                      <input
                        id="breakLines"
                        className='border border-blue-500 text-lg text-center'
                        type='number'
                        value={fontSize.breakLines}
                        onChange={changeFontsizeFunc}
                        max={2}
                        min={2}
                      />
                      <Resizable
                        defaultSize={{ width: commonResizeDimensions.lineWidth, height: commonResizeDimensions.lineHeight }}
                        maxWidth={800}
                        maxHeight={800}
                        minHeight={350}
                        minWidth={50}
                        onResizeStop={(crd, direction, ref) => {
                          handleResize(ref.offsetWidth, ref.offsetHeight, "lineWidth", "lineHeight");
                        }}
                      >
                        <textarea
                          value={changeText.breakLines.replace(/<br> <br>/g, '\n\n')}
                          className='border-2 border-blue-500 outline-0 mt-4'
                          style={{ width: `${commonResizeDimensions.lineWidth}px`, height: `${commonResizeDimensions.lineHeight}px`, fontSize: `${fontSize.breakLines}px` }}
                          onChange={(e) => changeTextFunction(e, "breakLines")}
                        />
                      </Resizable>
                    </Fontsize>
                  </div>
                ) : (
                  <li style={{ width: `${commonResizeDimensions.lineWidth}px`, height: `${commonResizeDimensions.lineHeight}px`, fontSize: `${fontSize.breakLines}px` }} dangerouslySetInnerHTML={{ __html: changeText.breakLines }}></li>
                )}
              </ul>
            </div>

            <div>
              {editMode && sectionId === ContentData.contentId
                ?
                <div className='my-4'>
                  <p >Enter button text fontsize in pixels</p>
                  <input
                    id="btnFontSize"
                    className='border border-blue-500 text-lg text-center'
                    type='number'
                    value={fontSize.btnFontSize}
                    onChange={changeFontsizeFunc}
                    max={2}
                    min={2}
                  />
                  <Fontsize fontsize={fontSize.btnFontSize}>
                    <button style={{ width: commonResizeDimensions.btnWidth, height: commonResizeDimensions.btnHeight }} className='ml-16 bg-primary text-white rounded-full'>
                      <Resizable
                        defaultSize={{
                          width: commonResizeDimensions.btnWidth, height: commonResizeDimensions.btnHeight
                        }}
                        maxWidth={400}
                        maxHeight={400}
                        minHeight={25}
                        minWidth={25}
                        onResizeStop={(crd, direction, ref) => {
                          handleResize(ref.offsetWidth, ref.offsetHeight, "btnWidth", "btnHeight");
                        }}
                      >
                        <input className='outline-0 text-center my-2 border-2 border-blue-500 w-full' value={changeText.btnText} style={{ fontSize: `${fontSize.btnFontSize}px` }} onChange={(e) => changeTextFunction(e, "btnText")} />
                      </Resizable>
                    </button>
                  </Fontsize>
                </div>
                :
                <button style={{ width: commonResizeDimensions.btnWidth, height: commonResizeDimensions.btnHeight, fontSize: `${fontSize.btnFontSize}px` }} className='bg-primary text-white rounded-full'>
                  {changeText.btnText}
                </button>
              }

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Content;
