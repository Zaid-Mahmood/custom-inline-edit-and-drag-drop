import NainBanner from './MainBanner';
import { useSelector, useDispatch } from 'react-redux';
import { setEditMode, setSectionId } from '../../../redux/features/mainStore/storeSlice';
import { Resizable } from 're-resizable';
import { useState } from 'react';
import Fontsize from '../../fontsizeWrapper/Fontsize';
const DiscoverBanner = () => {
  const dispatch = useDispatch();
  const discoverHeading = "Discover Natural Calm Magnesium";
  const discoverSubtitle = "Our best-selling original, gummies, magnesium for kids, and sleep formulas";
  const discoverSectionId = 7;
  const { editMode, sectionId } = useSelector((state) => state.mainStore);
  const [fontSize, setFontSize] = useState({ headingFont: 12, paragraphFont: 10 })
  const toggleEditMode = () => {
    dispatch(setEditMode(true));
    dispatch(setSectionId(discoverSectionId));
  }
  const [commonDimensions, setCommonDimensions] = useState({
    headingFieldWidth: "400",
    headingFieldHeight: "80",
    paragraphFieldWidth: "300",
    paragraphFieldHeight: "100"
  });

  const [changeValue, setChangeValue] = useState({
    headingField: discoverHeading,
    paragraphField: discoverSubtitle
  });

  const changeSizeFunction = (event) => {
    const { name, value } = event.target;
    setChangeValue((prev) => ({ ...prev, [name]: value }))
  }

  const handleResize = (width, height, fieldWidthKey, fieldHeightKey) => {
    setCommonDimensions((prev) => ({
      ...prev,
      [fieldWidthKey]: width,
      [fieldHeightKey]: height
    }));
  }

  const changeFontsizeFunc = (event) => {
    const { value, name } = event.target;
    setFontSize((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <NainBanner className="mainBannerheight">
      <div onDoubleClick={toggleEditMode}>
        {editMode && sectionId === discoverSectionId
          ?
          <>
            <div className='mx-auto text-center'>
              <p className='m-0'>Enter text fontsize in pixels</p>
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
                <Resizable
                  className='border-2 border-blue-500'
                  defaultSize={{ width: `${commonDimensions.headingFieldWidth}px`, height: `${commonDimensions.headingFieldHeight}px` }}
                  onResizeStop={(e, dir, ref) => handleResize(ref.offsetWidth, ref.offsetHeight, "headingFieldWidth", "headingFieldHeight")}
                  maxHeight={100} minHeight={50} maxWidth={400} minWidth={300} >
                  <input
                    name="headingField"
                    className="font-medium text-2xl text-center"
                    style={{ width: `${commonDimensions.headingFieldWidth}px`, height: `${commonDimensions.headingFieldHeight}px`, fontSize: `${fontSize.headingFont}px` }}
                    value={changeValue.headingField}
                    onChange={(e) => changeSizeFunction(e)}
                  />
                </Resizable>
              </Fontsize>
            </div>
            <br />
            <div className='mx-auto text-center'>
              <p className='m-0'>Enter text fontsize in pixels</p>
              <Fontsize fontsize={fontSize.paragraphFont} margin="mx-auto">
                <input
                  name="paragraphFont"
                  className='border border-blue-500 text-lg text-center'
                  type='number'
                  value={fontSize.paragraphFont}
                  onChange={changeFontsizeFunc}
                  max={2}
                  min={2}
                />
                <Resizable
                  className='border-2 border-blue-500'
                  defaultSize={{ width: `${commonDimensions.paragraphFieldWidth}px`, height: `${commonDimensions.paragraphFieldHeight}px` }}
                  maxHeight={150} minHeight={80} maxWidth={500} minWidth={250}
                  onResizeStop={(e, dir, ref) => handleResize(ref.offsetWidth, ref.offsetHeight, "paragraphFieldWidth", "paragraphFieldHeight")}
                >
                  <input
                    name="paragraphField"
                    value={changeValue.paragraphField}
                    onChange={(e) => changeSizeFunction(e)}
                    className="text-sm text-center"
                    style={{ width: `${commonDimensions.paragraphFieldWidth}px`, height: `${commonDimensions.paragraphFieldHeight}px`, fontSize: `${fontSize.paragraphFont}px` }}
                  />
                </Resizable>
              </Fontsize>
            </div>

          </>
          :
          <div>
            <h2 style={{ width: `${commonDimensions.headingFieldWidth}px`, height: `${commonDimensions.headingFieldHeight}px`, fontSize: `${fontSize.headingFont}px` }} className="font-medium text-2xl my-2 mx-auto text-center">{discoverHeading}</h2>
            <p style={{ width: `${commonDimensions.paragraphFieldWidth}px`, height: `${commonDimensions.paragraphFieldHeight}px`, fontSize: `${fontSize.paragraphFont}px` }} className="text-sm text-center mx-auto">{discoverSubtitle}</p>
          </div>
        }
      </div>
    </NainBanner>
  )
}

export default DiscoverBanner;