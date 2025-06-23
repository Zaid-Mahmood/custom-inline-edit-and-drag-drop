import { useDispatch, useSelector } from "react-redux";
import { VerifiedPureUtils } from "../VerifiedPure/VerifiedPureUtils";
import MainBanner from "./MainBanner";
import { setEditMode, setSectionId } from "../../../redux/features/mainstore/storeSlice";
import { useState } from "react";
const VerifiedPure = () => {
    const dispatch = useDispatch();
    const content = VerifiedPureUtils.content.replace(/\n/g, "<br><br>");
    const verifiedSectionId = VerifiedPureUtils.verifiedId;
    const { sectionId, editMode } = useSelector((state) => state.mainStore);
    const toggleEditMode = () => {
        dispatch(setEditMode());
        dispatch(setSectionId(verifiedSectionId));
    }
    const [changeVal, setChangeVal] = useState({ textField: content });
    const [changeImg, setChangeImg] = useState({ img1: VerifiedPureUtils.img, img2: VerifiedPureUtils.img2 })
    const changeValFunction = (event) => {
        const { value, name } = event.target;
        setChangeVal((prev) => ({ ...prev, [name]: value }))
    }
    const changeImgFunction = (event) => {
        const { name } = event.target;
        const file = event.target.files[0];
        if (file) {
            const imgUrl = URL.createObjectURL(file);
            setChangeImg((prev) => ({ ...prev, [name]: imgUrl }))
        }
    }
    return (
        <MainBanner className="verifiedPureHeight">
            <div onDoubleClick={toggleEditMode}>
                {editMode && sectionId === verifiedSectionId
                    ?
                    <div className="border-2 border-blue-500 flex justify-center items-center gap-24">
                        <div>
                        <img className="w-80 h-50 object-fit" src={changeImg.img1} alt="verifed-pure" />
                        <input className="text-center cursor-pointer" name="img1" type="file" accept="image/*" onChange={(e) => changeImgFunction(e)} />
                        </div>
                        <div className="max-w-[40%]">
                            <textarea name="textField" className="text-lg font-medium w-full" value={changeVal.textField.replace(/<br><br>/g, "\n")} onChange={changeValFunction} rows={12} />
                            <img className="object-fit mx-auto mt-4 max-w-80" src={changeImg.img2} alt="verifed-pure" />
                            <input className="text-center cursor-pointer" name="img2" type="file" accept="image/*" onChange={(e) => changeImgFunction(e)} />
                        </div>
                    </div>
                    :
                    <div className="flex justify-center items-center gap-24">
                        <img className="w-80 h-50 object-fit" src={changeImg.img1} alt="verifed-pure" />
                        <div className="max-w-[40%]">
                            <p className="text-lg font-medium" dangerouslySetInnerHTML={{ __html: changeVal.textField.replace(/\n/g, "<br><br>") }}></p>
                            <img className="object-fit mx-auto mt-4" src={changeImg.img2} alt="verifed-pure" />
                        </div>
                    </div>
                }
            </div>
        </MainBanner>
    )
}

export default VerifiedPure
