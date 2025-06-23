import MainBanner from "./MainBanner";
import { setEditMode, setSectionId } from '../../../redux/features/mainstore/storeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import Fontsize from "../../fontsizeWrapper/Fontsize";
const StayCalmBanner = () => {
  const dispatch = useDispatch();
  const stayCalmHeading = "From The Stay Calm Blog";
  const stayCalmId = 11;
  const { editMode, sectionId } = useSelector((state) => state.mainStore);
  const toggleEditMode = () => {
    dispatch(setEditMode());
    dispatch(setSectionId(stayCalmId));
  }
  const [changeText, setChangeText] = useState(stayCalmHeading);
  const [fontSize, setFontSize] = useState("12");

  const changeTextFunc = (event) => {
    setChangeText(event.target.value);
  }
  const changeFontsizeFunc = (event) => {
    setFontSize(event.target.value)
  }
  return (
    <MainBanner className="mainBannerheight py-16">
      <div onDoubleClick={toggleEditMode}>
        {editMode && sectionId === stayCalmId
          ?
          <>
            <p className='m-0'>Enter text fontsize in pixels</p>
            <Fontsize fontsize={fontSize} margin="mx-auto">
              <input
                className='border border-blue-500 text-lg text-center'
                type='number'
                value={fontSize}
                onChange={changeFontsizeFunc}
                max={2}
                min={2}
              />
              <input type="text" className="outline-0 text-center border-2 border-blue-500 w-full font-medium  my-2" value={changeText} onChange={changeTextFunc} style={{ fontSize: fontSize }} />
            </Fontsize>
          </>
          :
          <h2 className="font-medium my-2" style={{ fontSize: `${fontSize}px` }}>{changeText}</h2>
        }
      </div>
    </MainBanner>
  )
}

export default StayCalmBanner
