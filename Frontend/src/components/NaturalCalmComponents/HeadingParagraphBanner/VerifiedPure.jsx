import { VerifiedPureUtils } from "../VerifiedPure/VerifiedPureUtils";
import MainBanner from "./MainBanner";
const VerifiedPure = () => {
    const content = VerifiedPureUtils.content.replace(/\n/g, "<br><br>");

    return (
        <MainBanner className="verifiedPureHeight">
            <img className="w-80 h-50 object-fit" src={VerifiedPureUtils.img} alt="verifed-pure" />
            <div className="max-w-[40%]">
                <p className="text-lg font-medium" dangerouslySetInnerHTML={{ __html: content }}></p>
                <img className="object-fit mx-auto mt-4" src={VerifiedPureUtils.img2} alt="verifed-pure" />
            </div>
        </MainBanner>
    )
}

export default VerifiedPure
