import { StepsUtils } from "./ManufacturingStepsUtils"
const ManufacturingSteps = () => {
    const { steps } = StepsUtils;
    const seperateSteps = steps.replace(/\n/g , "<br></br>");
    return (
        <div>
           
               <div className="flex items-center max-w-[80%] mx-auto gap-12" >
                  <img src={StepsUtils.img1} alt="item-img1" />
                    <img src={StepsUtils.img2} alt="item-img2" />
                    <p className="text-gray-400 font-medium text-lg" dangerouslySetInnerHTML={{__html : seperateSteps}}></p>
               </div>
        </div>
    )
}

export default ManufacturingSteps
