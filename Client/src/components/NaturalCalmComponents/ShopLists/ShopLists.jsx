import { ShopListsUtils, shopListsId } from "./ShopListsUtils";
import { useSelector, useDispatch } from "react-redux";
import { setEditMode, setSectionId } from "../../../redux/features/mainStore/storeSlice";
import { Resizable } from "re-resizable";
import { useEffect, useState } from "react";
const ShopLists = () => {
    const dispatch = useDispatch();
    const { editMode, sectionId } = useSelector((state) => state.mainStore);
    const btnText = "Shop here";
    const toggleEditMode = () => {
        dispatch(setEditMode(true))
        dispatch(setSectionId(shopListsId))
    }
    const [editValues, setEditValues] = useState({});

    const [commonDimensions, setCommonDimensions] = useState({
        headingTitleOneWidth: "50", headingTitleOneHeight: "50",
        subHeadingTitleOneWidth: "50", subHeadingTitleOneHeight: "50",
        paragraphTitleOneWidth: "50", paragraphTitleOneHeight: "50",
        btnOneWidth: "50", btnOneHeight: "50",
        headingTitleTwoWidth: "50", headingTitleTwoHeight: "50",
        subHeadingTitleTwoWidth: "50", subHeadingTitleTwoHeight: "50",
        paragraphTitleTwoWidth: "50", paragraphTitleTwoHeight: "50",
        btnTwoWidth: "50", btnTwoHeight: "50",
        headingTitleThreeWidth: "50", headingTitleThreeHeight: "50",
        subHeadingTitleThreeWidth: "50", subHeadingTitleThreeHeight: "50",
        paragraphTitleThreeWidth: "50", paragraphTitleThreeHeight: "50",
        btnThreeWidth: "50", btnThreeHeight: "50"
    })

    const keyFields = [
        { id: 0, title: "headingTitleOne", subtitle: "subHeadingTitleOne", paragraph: "paragraphTitleOne", btn: "btnOne" },
        { id: 1, title: "headingTitleTwo", subtitle: "subHeadingTitleTwo", paragraph: "paragraphTitleTwo", btn: "btnTwo" },
        { id: 2, title: "headingTitleThree", subtitle: "subHeadingTitleThree", paragraph: "paragraphTitleThree", btn: "btnThree" },
        { id: 3, title: "headingTitleFour", subtitle: "subHeadingTitleFour", paragraph: "paragraphTitleFour", btn: "btnFour" }
    ]

    const handleResize = (width, height, titleField, subtitleField, paragraphField, btnField, id, itemId) => {
        if (itemId === id) {
            setCommonDimensions((prev) => ({
                ...prev,
                [`${titleField}Width`]: width, [`${titleField}Height`]: height,
                [`${subtitleField}Width`]: width, [`${subtitleField}Height`]: height,
                [`${paragraphField}Width`]: width, [`${paragraphField}Height`]: height,
                [`${btnField}Width`]: width, [`${btnField}Height`]: height
            }))
        }
    }
    const changeTextFunc = (event, id) => {
        const { name, value } = event.target;
        setEditValues((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [name]: value
            }
        }))
    }
    const getStyle = (id, type) => {
        const currentKeyField = keyFields[id]?.[type];
        return (
            { width: `${commonDimensions[`${currentKeyField}Width`] ?? 50}px` },
            { height: `${commonDimensions[`${currentKeyField}Height`] ?? 50}px` }
        )
    }
    useEffect(() => {
        const initialShopVals = {};
        ShopListsUtils.forEach((item, id) => {
            initialShopVals[id] = { headingField: item.shopHeading, subtitleField: item.shopSubtitle, shopImg: item.img, paragraphField: item.shopText, btnField: btnText }
        })
        setEditValues(initialShopVals)
    }, [])

    return (
        <div className="grid grid-cols-4 mb-24 max-w-[90%] mx-auto gap-4">
            {ShopListsUtils.map((item, id) => {
                return (
                    <div onDoubleClick={toggleEditMode} className="flex flex-col justify-between" key={id}>
                        {editMode && sectionId === shopListsId
                            ?
                            <Resizable
                                onResizeStop={(e, dir, ref) => {
                                    keyFields.map((item) => (
                                        handleResize(ref.offsetWidth, ref.offsetHeight, item.title, item.subtitle, item.paragraph, item.btn, id, item.id)
                                    ))
                                }}>
                                <div className="border-2 border-blue-500">
                                    <div>
                                        <input name="headingField" className="border-2 border-blue-500 text-btnBg text-2xl" value={editValues[id]?.headingField ?? ""} onChange={(e) => changeTextFunc(e, id)} style={getStyle(id, "title")} />
                                        <input name="subtitleField" className="border-2 border-blue-500 text-gray-500" value={editValues[id]?.subtitleField ?? ""} onChange={(e) => changeTextFunc(e, id)} style={getStyle(id, "subtitle")} />
                                        <img className="w-50 h-50 object-contain mx-auto my-4" src={editValues[id]?.shopImg} alt="img-item" />
                                        <input name="paragraphField" className="border-2 border-blue-500 text-gray-500 text-center" value={editValues[id]?.paragraphField ?? ""} onChange={(e) => changeTextFunc(e, id)} style={getStyle(id, "paragraph")} />
                                    </div>
                                    <input name="btnField" className="w-40 mx-auto text-white hover:bg-primary cursor-pointer bg-btnBg py-3 px-6 rounded-full my-4 uppercase font-bold" value={editValues[id]?.btnField ?? ""} onChange={(e) => changeTextFunc(e, id)} style={getStyle(id, "btn")} />
                                </div>
                            </Resizable>
                            :
                            <>
                                <div>
                                    <h2 className="text-btnBg text-2xl">{item.shopHeading}</h2>
                                    <p className="text-gray-500">{item.shopSubtitle}</p>
                                    <img className="w-50 h-50 object-contain mx-auto my-4" src={item.img} alt="img-item" />
                                    <p className="text-gray-500 text-center">{item.shopText}</p>
                                </div>
                                <button className="w-40 mx-auto text-white hover:bg-primary cursor-pointer bg-btnBg py-3 px-6 rounded-full my-4 uppercase font-bold">{btnText}</button>
                            </>
                        }
                    </div>

                )
            }
            )}
        </div>
    )
}

export default ShopLists
