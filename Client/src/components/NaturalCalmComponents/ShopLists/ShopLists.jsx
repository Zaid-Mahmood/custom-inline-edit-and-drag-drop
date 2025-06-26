import { ShopListsUtils, shopListsId } from "./ShopListsUtils";
import { useSelector, useDispatch } from "react-redux";
import { setEditMode, setSectionId } from "../../../redux/features/mainstore/storeSlice";
import { Resizable } from "re-resizable";
import { useEffect, useState } from "react";

const ShopLists = () => {
    const dispatch = useDispatch();
    const { editMode, sectionId } = useSelector((state) => state.mainStore);
    const btnText = "Shop here";

    const toggleEditMode = () => {
        dispatch(setEditMode(true));
        dispatch(setSectionId(shopListsId));
    };

    const [editValues, setEditValues] = useState({});

    const [columnDimensions, setColumnDimensions] = useState({
        columnOneWidth: "250", columnOneHeight: "auto",
        columnTwoWidth: "250", columnTwoHeight: "auto",
        columnThreeWidth: "250", columnThreeHeight: "auto",
        columnFourWidth: "250", columnFourHeight: "auto",
    });

    const columnKeys = [
        { id: 0, name: "columnOne" },
        { id: 1, name: "columnTwo" },
        { id: 2, name: "columnThree" },
        { id: 3, name: "columnFour" }
    ];

    const handleColumnResize = (width, height, columnName) => {
        setColumnDimensions((prev) => ({
            ...prev,
            [`${columnName}Width`]: width,
            [`${columnName}Height`]: height,
        }));
    };

    const changeTextFunc = (event, id) => {
        const { name, value } = event.target;
        setEditValues((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [name]: value
            }
        }));
    };

    const getColumnStyle = (columnName) => {
        return {
            width: `${columnDimensions[`${columnName}Width`]}px`,
            minHeight: `${columnDimensions[`${columnName}Height`] === "auto" ? "auto" : columnDimensions[`${columnName}Height`] + "px"}`
        };
    };

    useEffect(() => {
        const initialShopVals = {};
        ShopListsUtils.forEach((item, id) => {
            initialShopVals[id] = {
                headingField: item.shopHeading,
                subtitleField: item.shopSubtitle,
                shopImg: item.img,
                paragraphField: item.shopText,
                btnField: btnText
            };
        });
        setEditValues(initialShopVals);
    }, []);

    return (
        <div className="grid grid-cols-4 mb-24 max-w-[90%] mx-auto gap-4">
            {ShopListsUtils.map((item, id) => {
                const columnKey = columnKeys.find((ck) => ck.id === id);
                if (!columnKey) return null;
                return (
                    <div onDoubleClick={toggleEditMode} key={id} className="flex flex-col justify-between">
                        {editMode && sectionId === shopListsId ? (
                            <Resizable
                                size={{
                                    width: parseInt(columnDimensions[`${columnKey.name}Width`]),
                                    height: columnDimensions[`${columnKey.name}Height`] === "auto" ? "auto" : parseInt(columnDimensions[`${columnKey.name}Height`])
                                }}
                          
                                onResizeStop={(e, dir, ref, d) => {
                                    handleColumnResize(ref.offsetWidth, ref.offsetHeight, columnKey.name);
                                }}
                                className="border-2 border-blue-500 p-2 flex flex-col justify-between"
                                style={getColumnStyle(columnKey.name)}
                            >
                                <input
                                    name="headingField"
                                    className="text-btnBg text-2xl w-full"
                                    value={editValues[id]?.headingField ?? ""}
                                    onChange={(e) => changeTextFunc(e, id)}
                                />

                                <input
                                    name="subtitleField"
                                    className="text-gray-500 w-full"
                                    value={editValues[id]?.subtitleField ?? ""}
                                    onChange={(e) => changeTextFunc(e, id)}
                                />

                                <img
                                    className="w-50 h-50 object-contain mx-auto my-4"
                                    src={editValues[id]?.shopImg}
                                    alt="img-item"
                                />

                                <textarea
                                    name="paragraphField"
                                    value={editValues[id]?.paragraphField ?? ""}
                                    onChange={(e) => changeTextFunc(e, id)}
                                    rows="4"
                                />

                                <input
                                    name="btnField"
                                    className="w-full mx-auto text-white hover:bg-primary cursor-pointer bg-btnBg py-3 px-6 rounded-full my-4 uppercase font-bold"
                                    value={editValues[id]?.btnField ?? ""}
                                    onChange={(e) => changeTextFunc(e, id)}
                                />
                            </Resizable>
                        ) : (
                            <div style={getColumnStyle(columnKey.name)}>
                                <div>
                                    <h2 className="text-btnBg text-2xl">{editValues[id]?.headingField ?? ""}</h2>
                                    <p className="text-gray-500">{editValues[id]?.subtitleField ?? ""}</p>
                                    <img
                                        className="w-50 h-50 object-contain mx-auto my-4"
                                        src={editValues[id]?.shopImg}
                                        alt="img-item"
                                    />
                                    <p className="text-gray-500 text-center">{editValues[id]?.paragraphField ?? ""}</p>
                                </div>
                                <button className="w-40 mx-auto text-white hover:bg-primary cursor-pointer bg-btnBg py-3 px-6 rounded-full my-4 uppercase font-bold">
                                    {editValues[id]?.btnField ?? ""}
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ShopLists;