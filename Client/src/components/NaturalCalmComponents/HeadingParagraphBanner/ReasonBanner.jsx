import MainBanner from "./MainBanner";
import { useSelector, useDispatch } from 'react-redux';
import { Resizable } from 're-resizable';
import { setEditMode, setSectionId } from "../../../redux/features/mainstore/storeSlice";
import { useState } from "react";
import Fontsize from "../../fontsizeWrapper/Fontsize";
const ReasonBanner = () => {
  const reasonHeading = "Even More Reasons to Love Natural Calm";
  const reasonSectionId = 9;
  const { editMode, sectionId } = useSelector((state) => state.mainStore);
  const dispatch = useDispatch();
  const toggleEditMode = () => {
    dispatch(setSectionId(reasonSectionId));
    dispatch(setEditMode());
  }
  const [commonDimensions, setCommonDimensions] = useState({ fieldWidth: 500, fieldHeight: 100 });
  const [changeValue, setChangeValue] = useState({
    currentValue: reasonHeading
  })
  const [fontSize, setFontSize] = useState({ headingFont: 12 })
  const handleResize = (width, height, widthField, heightField) => {
    setCommonDimensions((prev) => ({ ...prev, [widthField]: width, [heightField]: height }))
  }
  const chnageValueFunc = (event) => {
    const { name, value } = event.target;
    console.log(name, value, "event")
    setChangeValue((prev) => ({ ...prev, [name]: value }))
  }
  const changeFontsizeFunc = (event) => {
    const { value, name } = event.target;
    setFontSize((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <MainBanner className="mainBannerheight py-12">
      <div onDoubleClick={toggleEditMode}>
        {editMode && sectionId === reasonSectionId
          ?
          <Fontsize fontsize={fontSize.headingFont} margin="mx-auto">
            <input
              name="headingFont"
              className='border border-blue-500 text-lg text-center'
              type='number'
              value={fontSize.headingFont}
              onChange={changeFontsizeFunc}
              max={2}
              min={2}
            />
            <Resizable minWidth={200} maxWidth={800} minHeight={50} maxHeight={100} className="border-2 border-blue-500" onResizeStop={(e, dir, ref) => handleResize(ref.offsetWidth, ref.offsetHeight, "fieldWidth", "fieldHeight")} style={{ width: `${commonDimensions.fieldWidth}px`, height: `${commonDimensions.fieldHeight}px` }}>
              <input name="currentValue" className="font-medium text-2xl text-center outline-0" onChange={(e) => chnageValueFunc(e)} style={{ width: `${commonDimensions.fieldWidth}px`, height: `${commonDimensions.fieldHeight}px`, fontSize: `${fontSize.headingFont}px` }} value={changeValue.currentValue} />
            </Resizable>
          </Fontsize>
          :
          <h2 style={{ width: `${commonDimensions.fieldWidth}px`, height: `${commonDimensions.fieldHeight}px`, fontSize: `${fontSize.headingFont}px` }} className="font-medium text-2xl text-center mx-auto">{changeValue.currentValue}</h2>
        }
      </div>

    </MainBanner>
  )
}

export default ReasonBanner
