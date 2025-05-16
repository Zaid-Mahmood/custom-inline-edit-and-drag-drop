import { ClinicalContent } from "./ClinicalUtils"
const ClinicallyProvernSection = () => {
  const { img, headingData, paragraphData, btnText } = ClinicalContent;
  const paragraph = paragraphData.toString().replace(/\n/g, "<br><br>");
  return (
    <div className="flex items-center gap-5 mx-auto max-w-[80%]">
      <div>
        <img className="w-[300px] h-[250px]" src={img} alt="clinic-img" />
      </div>
      <div className="flex flex-col items-start">
        <h2 className="text-secondary text-2xl">{headingData}</h2>
        <br />
        <p className="text-gray-400 text-lg font-medium  max-w-[95%]" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
        <button className="text-white font-medium uppercase bg-btnBg rounded-full py-4 px-8 my-2 hover:bg-primary cursor-pointer">{btnText}</button>
      </div>
    </div>
  )
}

export default ClinicallyProvernSection
