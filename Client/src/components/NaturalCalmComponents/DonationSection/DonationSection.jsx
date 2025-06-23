import { useSelector, useDispatch } from "react-redux";
import { DonationUtils } from "./DonationUtils";
import { setEditMode, setSectionId } from "../../../redux/features/mainstore/storeSlice";
import { useState } from "react";

const DonationSection = () => {
    const dispatch = useDispatch();
    const { editMode, sectionId } = useSelector((state) => state.mainStore);
    const [changeImg, setChangeImg] = useState({
        img1: DonationUtils.img1,
        img2: DonationUtils.img2
    })
    const htmlContent = DonationUtils.content
        .replace(/\n/g, "<br>")
        .replace(/<span>(.*?)<\/span>/g, (_, spanText) => {
            if (spanText) {
                return `<a href="${DonationUtils.link[0].webLink}" target="_blank" class="text-primary">${DonationUtils.link[0].text}</a>`;
            }
            return "";
        });

    const [initialValue, setInitialValue] = useState({
        paraText: htmlContent,
        btnText: DonationUtils.btnText
    });

    const toggleEditMode = () => {
        dispatch(setEditMode());
        dispatch(setSectionId(DonationUtils.donationId));
    };

    const changeTextFunc = (event) => {
        const { name, value } = event.target;
        setInitialValue((prev) => ({ ...prev, [name]: value }));
    };
    const changeImgFunc = (event) => {
        const { name } = event.target;
        const file = event.target.files[0];
        if (file) {
            const imgUrl = URL.createObjectURL(file);
            setChangeImg((prev) => ({ ...prev, [name]: imgUrl }))
        }
    }
    return (
        <div onDoubleClick={toggleEditMode}>
            {editMode && sectionId === DonationUtils.donationId ? (
                <div className="flex items-center border-2 border-blue-500">
                    <div className="text-center">
                        <img
                            className="w-[80%] h-[40%] mx-auto object-contain"
                            src={changeImg.img1}
                            alt="img-1"
                        />
                        <input name="img1" className="cursor-pointer" type="file" accept="Image/*" onChange={changeImgFunc} />
                        <textarea
                            rows={4}
                            cols={70}
                            value={initialValue.paraText
                                .replace(/<br\s*\/?>/g, "\n")
                                .replace(/<a[^>]*>(.*?)<\/a>/g, (_, anchorText) => anchorText || "")
                            }
                            className="text-gray-400 font-medium my-4"
                            onChange={changeTextFunc}
                            name="paraText"
                        />
                        <button className="mx-auto bg-[#009AFF] px-8 py-4 rounded-md text-white font-medium flex items-center gap-2">
                            <svg className="heartSvg" width="16" height="16" viewBox="0 0 16 16">
                                <path
                                    fill="currentColor"
                                    d="M8 14.3611C20.957 7.21501 12.8701 -0.965478 8 4.04274C3.12995 -0.965534 -4.957 7.21495 8 14.3611Z"
                                ></path>
                            </svg>
                            <input type="text" name="btnText" value={initialValue.btnText} onChange={changeTextFunc} />
                        </button>
                    </div>

                    <div
                        className="bg-cover bg-no-repeat bg-right h-150 w-1/2 flex justify-center items-center"
                        style={{ backgroundImage: `url(${changeImg.img2})` }}
                    >
                        <input name="img2" className="cursor-pointer border-2 border-gray-500 text-white p-4 bg-gray-500 rounded-md text-center max-w-[55%]" type="file" accept="Image/*" onChange={changeImgFunc} />
                    </div>
                </div>
            ) : (
                <div className="flex items-center">
                    <div className="text-center">
                        <img
                            className="w-[80%] h-[40%] mx-auto object-contain"
                            src={changeImg.img1}
                            alt="img-1"
                        />
                        <p
                            className="text-gray-400 font-medium my-4"
                            dangerouslySetInnerHTML={{ __html: initialValue.paraText }}
                        ></p>
                        <button className="mx-auto bg-[#009AFF] px-8 py-4 rounded-md text-white font-medium flex items-center gap-2">
                            <svg className="heartSvg" width="16" height="16" viewBox="0 0 16 16">
                                <path
                                    fill="currentColor"
                                    d="M8 14.3611C20.957 7.21501 12.8701 -0.965478 8 4.04274C3.12995 -0.965534 -4.957 7.21495 8 14.3611Z"
                                ></path>
                            </svg>
                            {initialValue.btnText}
                        </button>
                    </div>

                    <div
                        className="bg-cover bg-no-repeat bg-right h-150 w-1/2"
                        style={{ backgroundImage: `url(${changeImg.img2})` }}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default DonationSection;
