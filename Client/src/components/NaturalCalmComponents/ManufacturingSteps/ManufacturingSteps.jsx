import { StepsUtils } from "./ManufacturingStepsUtils";
import { useDispatch, useSelector } from 'react-redux';
import { setSectionId, setEditMode } from '../../../redux/features/mainstore/storeSlice';
import { useState } from "react";
import { Resizable } from "re-resizable";
const ManufacturingSteps = () => {
    const { editMode, sectionId } = useSelector((state) => state.mainStore);
    const dispatch = useDispatch();
    const { steps, manufacturingId } = StepsUtils;

    const seperateSteps = steps.replace(/\n/g, "<br><br>");
    const [paragraphVal, setParagraphVal] = useState(seperateSteps);

    const [img1, setImg1] = useState(StepsUtils.img1);
    const [img2, setImg2] = useState(StepsUtils.img2);

    const toggleEditMode = () => {
        dispatch(setSectionId(manufacturingId));
        dispatch(setEditMode());
    };

    const changeValFunction = (event) => {
        setParagraphVal(event.target.value);
    };


    const handleImageChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
        }
    };

    return (
        <div onDoubleClick={toggleEditMode}>
            {editMode && sectionId === manufacturingId ? (
                <div className="border-2 border-blue-500 flex items-center max-w-[80%] mx-auto gap-12">
                    <div>
                        <img src={img1} alt="item-img1" className="mb-2" />
                        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, setImg1)} />
                    </div>
                    <div>
                        <img src={img2} alt="item-img2" className="mb-2 object-contain" />
                        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, setImg2)} />
                    </div>
                    <textarea
                        className="text-gray-400 font-medium text-lg w-full px-2"
                        value={paragraphVal.replace(/<br><br>/g, "\n\n")}
                        onChange={changeValFunction}
                        rows={12}
                    />
                </div>
            ) : (
                <div className="flex items-center max-w-[80%] mx-auto gap-12">
                    <img className="object-fit max-w-[35%]" src={img1} alt="item-img1" />
                    <img className="object-fit max-w-[35%]" src={img2} alt="item-img2" />
                    <p
                        className="text-gray-400 font-medium text-lg"
                        dangerouslySetInnerHTML={{ __html: paragraphVal.replace(/\n/g, "<br>") }}
                    ></p>
                </div>
            )}
        </div>
    );
};

export default ManufacturingSteps;
