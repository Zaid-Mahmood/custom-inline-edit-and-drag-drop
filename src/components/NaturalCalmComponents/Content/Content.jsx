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

  const [changeHeading, setChangeHeading] = useState(heading);
  const [changeLines, setChangeLines] = useState(breakLines);
  const [btnText , setBtnText] = useState(btnContent);
  const [textWidth, setTextWidth] = useState(800);
  const [textHeight, setTextHeight] = useState(50);
  const [lineWidth, setLineWidth] = useState(800);
  const [lineHeight, setLineHeight] = useState(350);
  const [btnWidth, setBtnWidth] = useState(150);
  const [btnHeight, setBtnHeight] = useState(50);

  const ChangeHeading = (event) => {
    setChangeHeading(event.target.value);
  }

  const handleResizeText = (newWidth, newHeight) => {
    setTextWidth(newWidth);
    setTextHeight(newHeight);
  };

  const handleResizeLines = (newWidth, newHeight) => {
    setLineWidth(newWidth);
    setLineHeight(newHeight);
  };

  const handleResizeBtn = (newWidth, newHeight) => {
    setBtnWidth(newWidth);
    setBtnHeight(newHeight);
  }
  const InputLinesFunc = (event) => {
    let updatedValue = event.target.value;
    const formattedText = updatedValue.replace(/\n/g, '<br> <br>');
    setChangeLines(formattedText);
  }

  const changeBtnText = (event)=>{
    setBtnText(event.target.value)
  }
  return (
    <div>
      <div className='bgColor text-white p-6'>
        {editMode ? (
          <Resizable
            defaultSize={{ width: textWidth, height: textHeight }}
            maxWidth={800}
            maxHeight={300}
            minHeight={50}
            minWidth={50}
            onResizeStop={( crd, direction , ref) => {
              handleResizeText(ref.offsetWidth, ref.offsetHeight);
            }}
          >
            <input
              className='text-4xl pb-5 border-2 border-blue-500 outline-0'
              value={changeHeading}
              onChange={ChangeHeading}
              onDoubleClick={() => dispatch(setEditMode(false))}
              style={{ width: `${textWidth}px`, height: `${textHeight}px` }}
            />
          </Resizable>
        ) : (
          <h1
            className='text-4xl ml-16 pb-5'
            style={{ width: `${textWidth}px`, height: `${textHeight}px` }}
            onDoubleClick={() => dispatch(setEditMode(true))}
          >
            {changeHeading}
          </h1>
        )}
        <div className='flex items-start'>
          <div>
            <MdCheckCircleOutline className='w-24 h-24' />
          </div>
          <div>
            <p className='text-xl pb-5'>{subHeading}</p>
            <ul>
              {editMode ? (
                <Resizable
                  defaultSize={{ width: lineWidth, height: lineHeight }}
                  maxWidth={800}
                  maxHeight={800}
                  minHeight={350}
                  minWidth={50}
                  onResizeStop={( crd, direction ,ref) => {
                    handleResizeLines(ref.offsetWidth, ref.offsetHeight);
                  }}
                >
                  <textarea
                    value={changeLines.replace(/<br> <br>/g, '\n\n')}
                    className='text-2xl border-2 border-blue-500 outline-0'
                    style={{ width: `${lineWidth}px`, height: `${lineHeight}px` }}
                    onDoubleClick={() => dispatch(setEditMode(false))}
                    onChange={InputLinesFunc}
                  />
                </Resizable>
              ) : (
                <p className='text-2xl' style={{ width: `${lineWidth}px`, height: `${lineHeight}px` }} onDoubleClick={() => dispatch(setEditMode(true))} dangerouslySetInnerHTML={{ __html: changeLines }}></p>
              )}
            </ul>
          </div>
        </div>
        <div className='my-4'>
        {editMode
          ?
          <button onDoubleClick={() => dispatch(setEditMode(false))} style={{ width: btnWidth, height: btnHeight }} className='ml-16 bg-primary text-white rounded-full'>
          <Resizable
            defaultSize={{
              width: btnWidth, height: btnHeight
            }}
            maxWidth={400}
            maxHeight={400}
            minHeight={25}
            minWidth={25}
            onResizeStop={( crd, direction ,ref) => {
              handleResizeBtn(ref.offsetWidth, ref.offsetHeight);
            }}
          >
            <input className='outline-0 text-center my-2 border-2 border-blue-500 w-full' value={btnText} onChange={changeBtnText} />  
          </Resizable>
          </button>
          :
          <button onDoubleClick={() => dispatch(setEditMode(true))} style={{ width: btnWidth, height: btnHeight }} className='ml-16 bg-primary text-white rounded-full'>
            {btnText}
          </button>
        }

      </div>
      </div>
    </div>
  );
}

export default Content;
