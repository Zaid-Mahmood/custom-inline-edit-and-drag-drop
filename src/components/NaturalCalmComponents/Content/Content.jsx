import React, { useState } from 'react';
import { MdCheckCircleOutline } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { setEditMode } from '../../../redux/features/mainStore/storeSlice';
import { Resizable } from 're-resizable';

const Content = () => {
  const dispatch = useDispatch();
  const editMode = useSelector((state) => state.mainStore.editMode);
  const heading = "Are you getting enough MAGNESIUM?";
  const subHeading = "Natural Calm helps with symptoms of low magnesium";
  const points = [
    "Tension, irritability, restless nights...\n",
    "Body pain, muscle cramps, headaches, and migraines...\n",
    "Sound familiar? These are all signs of low magnesium.\n",
    "This essential mineral doesn’t just make us feel calmer, more rested, and ready to take on the day.\n",
    "Magnesium is also key for heart health and total wellness for men, women, and children of all ages.\n"
  ];

  const breakLines = points.join('').replace(/\n/g, '<br> <br>');
  const btnContent = "Why Magnesium";

  const [changeText, setChangeText] = useState({ heading: heading, subHeading : subHeading , breakLines: breakLines, btnText: btnContent })
  
  const [commonResizeDimensions , setCommonResizeDimensions] = useState({textWidth : 800 , textHeight : 50 , subHeadingWidth : 800 , subHeadingHeight : 50 , lineWidth : 800 , lineHeight : 350 , btnWidth : 150 , btnHeight : 50})

  const handleResize = (newWidth, newHeight , widthField , heightField ) => {
    setCommonResizeDimensions((prev)=>({
  ...prev , [widthField] : newWidth , [heightField] : newHeight
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
  return (
    <div>
      <div className='bgColor text-white p-6'>
        {editMode ? (
          <Resizable
            defaultSize={{ width: commonResizeDimensions.textWidth, height: commonResizeDimensions.textHeight }}
            maxWidth={800}
            maxHeight={300}
            minHeight={50}
            minWidth={50}
            onResizeStop={(crd, direction, ref) => {
              handleResize(ref.offsetWidth, ref.offsetHeight , "textWidth" , "textHeight" );
            }}
          >
            <input
              className='text-4xl pb-5 border-2 border-blue-500 outline-0'
              value={changeText.heading}
              onChange={(e) => changeTextFunction(e, "heading")}
              onDoubleClick={() => dispatch(setEditMode(false))}
              style={{ width: `${commonResizeDimensions.textWidth}px`, height: `${commonResizeDimensions.textHeight}px` }}
            />
          </Resizable>
        ) : (
          <h1
            className='text-4xl ml-16 pb-5'
            style={{ width: `${commonResizeDimensions.textWidth}px`, height: `${commonResizeDimensions.textHeight}px` }}
            onDoubleClick={() => dispatch(setEditMode(true))}
          >
            {changeText.heading}
          </h1>
        )}
        <div className='flex items-start'>
          <div>
            <MdCheckCircleOutline className='w-24 h-24' />
          </div>
          <div>
            {editMode ?
                <Resizable
                defaultSize={{ width: commonResizeDimensions.subHeadingWidth , height: commonResizeDimensions.subHeadingHeight }}
                maxWidth={800}
                maxHeight={300}
                minHeight={50}
                minWidth={50}
                onResizeStop={(crd, direction, ref) => {
                  handleResize(ref.offsetWidth, ref.offsetHeight , "subHeadingWidth" , "subHeadingHeight" );
                }}
              >
              <input onChange={(e) => changeTextFunction(e, "subHeading")} onDoubleClick={() => dispatch(setEditMode(false))} className='text-xl pb-5 border-2 border-blue-500 w-full outline-0' value={changeText.subHeading} />
          </Resizable>
              :
              <p style={{ width: commonResizeDimensions.subHeadingWidth , height: commonResizeDimensions.subHeadingHeight }} onDoubleClick={() => dispatch(setEditMode(true))} className='text-xl pb-5'>{changeText.subHeading}</p>
            }
            <ul>
              {editMode ? (
                <Resizable
                  defaultSize={{ width: commonResizeDimensions.lineWidth, height: commonResizeDimensions.lineHeight }}
                  maxWidth={800}
                  maxHeight={800}
                  minHeight={350}
                  minWidth={50}
                  onResizeStop={(crd, direction, ref) => {
                    handleResize(ref.offsetWidth, ref.offsetHeight , "lineWidth" , "lineHeight" );
                  }}
                >
                  <textarea
                    value={changeText.breakLines.replace(/<br> <br>/g, '\n\n')}
                    className='text-2xl border-2 border-blue-500 outline-0'
                    style={{ width: `${commonResizeDimensions.lineWidth}px`, height: `${commonResizeDimensions.lineHeight}px` }}
                    onDoubleClick={() => dispatch(setEditMode(false))}
                    onChange={(e) => changeTextFunction(e, "breakLines")}
                  />
                </Resizable>
              ) : (
                <p className='text-2xl' style={{ width: `${commonResizeDimensions.lineWidth}px`, height: `${commonResizeDimensions.lineHeight}px` }} onDoubleClick={() => dispatch(setEditMode(true))} dangerouslySetInnerHTML={{ __html: changeText.breakLines }}></p>
              )}
            </ul>
          </div>
        </div>
        <div className='my-4'>
          {editMode
            ?
            <button onDoubleClick={() => dispatch(setEditMode(false))} style={{ width: commonResizeDimensions.btnWidth , height: commonResizeDimensions.btnHeight }} className='ml-16 bg-primary text-white rounded-full'>
              <Resizable
                defaultSize={{
                  width: commonResizeDimensions.btnWidth , height: commonResizeDimensions.btnHeight 
                }}
                maxWidth={400}
                maxHeight={400}
                minHeight={25}
                minWidth={25}
                onResizeStop={(crd, direction, ref) => {
                  handleResize(ref.offsetWidth, ref.offsetHeight , "btnWidth" , "btnHeight" );
                }}
              >
                <input className='outline-0 text-center my-2 border-2 border-blue-500 w-full' value={changeText.btnText} onChange={(e) => changeTextFunction(e, "btnText")} />
              </Resizable>
            </button>
            :
            <button onDoubleClick={() => dispatch(setEditMode(true))} style={{ width: commonResizeDimensions.btnWidth, height: commonResizeDimensions.btnHeight }} className='ml-16 bg-primary text-white rounded-full'>
              {changeText.btnText}
            </button>
          }

        </div>
      </div>
    </div>
  );
}

export default Content;
