import { HealthInfluencersUtils } from "./HealthInfluencersUtils";
import { setSectionId, setEditMode } from '../../../redux/features/mainstore/storeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
const HealthInfluencers = () => {
    const dispatch = useDispatch();
    const HealthContentText = HealthInfluencersUtils.content.replace(/\n/g, "<br><br>");
    const { editMode, sectionId } = useSelector((state) => state.mainStore);
    const toggleEditMode = () => {
        dispatch(setEditMode());
        dispatch(setSectionId(HealthInfluencersUtils.healthSectionId));
    }
    const [changeField, setChangeField] = useState({ headingField: HealthInfluencersUtils.heading, paragraphField: HealthContentText, btnField: HealthInfluencersUtils.btnText })
    const [changeImg, setChangeImg] = useState(HealthInfluencersUtils.img);
    const changeTextFunc = (event) => {
        const { name, value } = event.target;
        setChangeField((prev) => ({
            ...prev, [name]: value
        }))
    }
    const changeImgFunc = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imgUrl = URL.createObjectURL(file);
            setChangeImg(imgUrl);
        }
    }
    return (
        <div onDoubleClick={toggleEditMode}>
            {editMode && sectionId === HealthInfluencersUtils.healthSectionId
                ?
                <div className="border-2 border-blue-500 flex justify-center items-center gap-8 my-12">
                    <div>
                        <img src={changeImg} alt="influencers-review" />
                        <input type="file" accept="Image/*" onChange={changeImgFunc} />
                    </div>
                    <div className="max-w-[40%]">
                        <textarea name="headingField" className="w-full text-btnBg text-2xl font-medium my-2" onChange={changeTextFunc} value={changeField.headingField} rows={2} />
                        <textarea name="paragraphField" className="my-2 text-gray-500 text-lg font-medium w-full" onChange={changeTextFunc} value={changeField.paragraphField.replace(/<br><br>/g, "\n")} rows={12} />
                        <button className="my-4 bg-btnBg text-white py-4 px-6 rounded-full uppercase font-medium">
                            <input className="text-center" name="btnField" value={changeField.btnField} onChange={changeTextFunc} />
                        </button>
                    </div>
                </div>
                :
                <div className="flex justify-center items-center gap-8 my-12">
                    <div>
                        <img src={changeImg} alt="influencers-review" />
                    </div>
                    <div className="max-w-[40%]">
                        <h2 className="text-btnBg text-3xl font-medium my-2">{changeField.headingField}</h2>
                        <p className="my-2 text-gray-500 text-lg font-medium" dangerouslySetInnerHTML={{ __html: changeField.paragraphField.replace(/\n/g, "<br><br>") }}></p>
                        <button className="my-4 bg-btnBg text-white py-4 px-6 rounded-full uppercase font-medium">{changeField.btnField}</button>
                    </div>
                </div>
            }

        </div>
    )
}

export default HealthInfluencers
