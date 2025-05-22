import { DonationUtils } from "./DonationUtils";
const DonationSection = () => {
    const paragraphContent = DonationUtils.content.replace("\n", "<br>").replace(/<span>(.*?)<\/span>/g, (_, spanText) => {
        if (spanText) {
            return `<a href="${DonationUtils.link[0].webLink}" target="_blank" class="text-primary">${DonationUtils.link[0].text}</a>`;
        }
    })
    return (
        <div className="flex items-center">
            <div className="text-center">
                <img className="w-[80%] h-[40%] mx-auto object-contain" src={DonationUtils.img1} alt="img-1" />
                <p className="text-gray-400 font-medium my-4" dangerouslySetInnerHTML={{ __html: paragraphContent }}></p>
                <button className="mx-auto bg-[#009AFF] px-8 py-4 rounded-md text-white font-medium flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M8 14.3611C20.957 7.21501 12.8701 -0.965478 8 4.04274C3.12995 -0.965534 -4.957 7.21495 8 14.3611Z"></path></svg> {DonationUtils.btnText} </button>
            </div>

            <div
                className="bg-cover bg-no-repeat bg-right h-150 w-1/2"
                style={{ backgroundImage: `url(${DonationUtils.img2})` }}
            ></div>
        </div>
    )
}

export default DonationSection
