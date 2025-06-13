import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Resizable } from "re-resizable";
import { setEditMode, setSectionId } from "../../../redux/features/mainStore/storeSlice";
import { ReviewUtils, reviewSectionId } from "./ReviewUtils";

const ReviewSection = () => {
  const dispatch = useDispatch();
  const { editMode, sectionId } = useSelector((state) => state.mainStore);

  const [editValues, setEditValues] = useState({});
  const [resizeDimensions, setResizeDimensions] = useState({});
  const [activeItemId, setActiveItemId] = useState(null);

  const blockDefinitions = [
    { type: "reviewHeading", classValue: "text-gray-500 font-medium text-lg" },
    { type: "reviewParagraph", classValue: "text-gray-500 text-lg" },
    { type: "reviewAuthor", classValue: "text-gray-500 text-lg" }
  ];

  useEffect(() => {
    const initialEdit = {};
    const initialResize = {};

    ReviewUtils.forEach(item => {
      initialEdit[item.id] = {
        reviewHeading: item.reviewHeading,
        reviewParagraph: item.reviewText.replace(/<br><br>/g, "\n").replace(/<[^>]+>/g, ""),
        reviewAuthor: item.reviewAuthor
      };

      initialResize[item.id] = {
        reviewHeadingWidth: undefined,
        reviewHeadingHeight: undefined,
        reviewParagraphWidth: undefined,
        reviewParagraphHeight: undefined,
        reviewAuthorWidth: undefined,
        reviewAuthorHeight: undefined
      };
    });

    setEditValues(initialEdit);
    setResizeDimensions(initialResize);
  }, []);

  const toggleEditMode = (itemId) => {
    dispatch(setEditMode(true));
    dispatch(setSectionId(reviewSectionId));
    setActiveItemId(itemId);
  };

  const handleResize = (itemId, type, width, height) => {
    setResizeDimensions(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [`${type}Width`]: width,
        [`${type}Height`]: height
      }
    }));
  };

  const handleInputChange = (e, itemId, type) => {
    setEditValues(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [type]: e.target.value
      }
    }));
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-8 max-w-[94%] mx-auto">
        {ReviewUtils.map((item) => {
          const currentDims = resizeDimensions[item.id] || {};
          const isEditing = editMode && sectionId === reviewSectionId && activeItemId === item.id;

          const reviewParagraph = item.reviewText.replace(/\n/g, "<br><br>").replace(/<span>(.*?)<\/span>/g, (_, spanText) => {
            const foundLink = item.link?.find(linkObj => linkObj.text === spanText);
            const link = foundLink?.webLink || "#";
            return `<a href="${link}" target="_blank" class="text-primary">${spanText}</a>`;
          });

          return (
            <div key={item.id} onDoubleClick={() => toggleEditMode(item.id)}>
              {isEditing ? (
                <div className="border-2 border-blue-500 p-2 flex flex-col gap-4">
                  <img src={item.img} alt="review-img" className="w-full h-auto mb-4" />

                  {blockDefinitions.map((block) => {
                    const widthKey = `${block.type}Width`;
                    const heightKey = `${block.type}Height`;
                    const value = editValues[item.id]?.[block.type] || "";

                    return (
                      <Resizable
                        key={`${item.id}-${block.type}`}
                        className="border border-red-500 p-2 box-border"
                        defaultSize={{
                          width: currentDims[widthKey] ?? "100%",
                          height: currentDims[heightKey] ?? "auto"
                        }}
                        onResizeStop={(e, dir, ref) => {
                          handleResize(item.id, block.type, ref.offsetWidth, ref.offsetHeight);
                        }}
                        minWidth={100}
                        minHeight={40}
                        enable={{
                          top: false, right: true, bottom: true, left: false,
                          topRight: true, bottomRight: true, bottomLeft: true, topLeft: true
                        }}
                        style={{
                          marginBottom: "16px",
                          maxWidth: "100%"
                        }}
                      >
                        {block.type === "reviewParagraph" ? (
                          <textarea
                            className={`${block.classValue} w-full h-full resize-none outline-none`}
                            value={value}
                            onChange={(e) => handleInputChange(e, item.id, block.type)}
                            rows={5}
                            style={{ minHeight: 100, padding: 8 }}
                          />
                        ) : (
                          <input
                            type="text"
                            className={`${block.classValue} w-full h-full outline-none`}
                            value={value}
                            onChange={(e) => handleInputChange(e, item.id, block.type)}
                            style={{ minHeight: 40, padding: 8 }}
                          />
                        )}
                      </Resizable>
                    );
                  })}
                </div>

              ) : (
                <div>
                  <img src={item.img} alt="review-img" />
                  <h2
                    className="my-4 text-gray-500 font-medium text-2xl"
                    style={{
                      width: currentDims.reviewHeadingWidth,
                      height: currentDims.reviewHeadingHeight
                    }}
                  >
                    {item.reviewHeading}
                  </h2>
                  <p
                    className="text-gray-500 font-[400] text-lg"
                    dangerouslySetInnerHTML={{ __html: reviewParagraph }}
                    style={{
                      width: currentDims.reviewParagraphWidth,
                      height: currentDims.reviewParagraphHeight
                    }}
                  />
                  <p
                    className="text-gray-500 my-4"
                    style={{
                      width: currentDims.reviewAuthorWidth,
                      height: currentDims.reviewAuthorHeight
                    }}
                  >
                    {item.reviewAuthor}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center my-4">
        <button className="bg-btnBg hover:bg-primary text-white py-4 px-8 rounded-full uppercase font-medium">
          See more reviews
        </button>
      </div>
    </>
  );
};

export default ReviewSection;
