import { HealthInfluencersUtils } from "./HealthInfluencersUtils";

const HealthInfluencers = () => {
    const HealthContentText = HealthInfluencersUtils.content.replace(/\n/g , "<br><br>")
    return (
        <div className="flex justify-center items-center gap-8 my-12">
            <div>
                <img src={HealthInfluencersUtils.img} alt="influencers-review" />
            </div>
            <div className="max-w-[40%]">
                <h2 className="text-btnBg text-3xl font-medium my-2">{HealthInfluencersUtils.heading}</h2>
                <p className="my-2 text-gray-500 text-lg font-medium" dangerouslySetInnerHTML={{__html : HealthContentText}}></p>
                <button className="my-4 bg-btnBg text-white py-4 px-6 rounded-full uppercase font-medium">{HealthInfluencersUtils.btnText}</button>
            </div>
        </div>
    )
}

export default HealthInfluencers
