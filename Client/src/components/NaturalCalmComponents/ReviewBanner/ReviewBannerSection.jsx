import { ReviewBannerUtils } from "./ReviewBannerUtils";
import { setEditMode, setSectionId } from "../../../redux/features/mainStore/storeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Resizable } from 're-resizable';
import { useState } from "react";

const ReviewBannerSection = () => {
  const { reviewId, img, textHeading, paraText } = ReviewBannerUtils;
  const { editMode, sectionId } = useSelector((state) => state.mainStore);

  const paragraph = paraText.toString().replace(/\n/g, "<br><br>");
  const dispatch = useDispatch();

  const [commonResizeDimensions, setCommonResizeDimensions] = useState({
    headingWidth: "300", headingHeight: "100",
    breakParagraphWidth: "400", breakParagraphHeight: "200"
  });

  const [changeText, setChangeText] = useState({
    headingText: textHeading,
    breakParagraphText: paragraph
  });

  const handleResize = (width, height, widthField, heightField) => {
    setCommonResizeDimensions((prev) => ({
      ...prev,
      [widthField]: width,
      [heightField]: height
    }));
  };

  const changeTextFunction = (event) => {
    const { name, value } = event.target;
    const formattedValue = name === "breakParagraphText"
      ? value.replace(/<br><br>/g, "\n\n")
      : value;

    setChangeText((prev) => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const toggleEditMode = () => {
    dispatch(setEditMode());
    dispatch(setSectionId(reviewId));
  };

  const textBlocks = ["heading", "breakParagraph"];
  return (
    <div>
      <div className="relative">
        <img src={img} alt="review-banner" />
        <div onDoubleClick={toggleEditMode}>
          {editMode && sectionId === reviewId ? (
            <div className="absolute top-1/2 -translate-y-1/2 left-[10%]">
              <div className="border-2 border-blue-500 w-full py-12 px-4">
                {textBlocks.map((key) => {
                  const widthKey = `${key}Width`;
                  const heightKey = `${key}Height`;
                  const name = `${key}Text`;
                  return (
                    <Resizable
                      key={key}
                      defaultSize={{
                        width: commonResizeDimensions[widthKey],
                        height: commonResizeDimensions[heightKey]
                      }}
                      maxWidth={key === "breakParagraph" ? 500 : 500}
                      maxHeight={key === "breakParagraph" ? 250 : 50}
                      minHeight={key === "breakParagraph" ? 200 : 20}

                      onResizeStop={(e, direction, ref) => {
                        handleResize(
                          ref.offsetWidth,
                          ref.offsetHeight,
                          widthKey,
                          heightKey
                        );
                      }}
                    >
                      {key === "breakParagraph" ? (
                        <div className="mt-4 h-full">
                          <textarea
                            name={name}
                            className="h-full border-2 border-blue-500 text-white text-lg w-full"
                            value={changeText[name].replace(/<br><br>/g, "\n\n")}
                            onChange={changeTextFunction} />
                        </div>
                      ) : (
                        <>
                          <input
                            name={name}
                            className="text-white text-3xl w-full h-full border-2 border-blue-500"
                            value={changeText[name]}
                            onChange={changeTextFunction}
                          />
                        </>
                      )}
                    </Resizable>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="absolute top-1/2 -translate-y-1/2 max-w-1/2 left-[10%]">
              <h2 className="text-white text-3xl" style={{width : `${commonResizeDimensions.headingWidth}px
              `, height : `${commonResizeDimensions.headingHeight}px`}}>
                {changeText.headingText}
              </h2>
              <p className="text-white font-medium text-lg overflow-y-auto"
              style={{width : `${commonResizeDimensions.breakParagraphWidth}px` , height : `${commonResizeDimensions.breakParagraphHeight}px`}}
                dangerouslySetInnerHTML={{
                  __html: changeText.breakParagraphText
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewBannerSection;
