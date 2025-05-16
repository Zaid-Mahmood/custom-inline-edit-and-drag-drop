import { ReviewBannerUtils } from "./ReviewBannerUtils";
const ReviewBannerSection = () => {
  const { img, textHeading, paraText } = ReviewBannerUtils;
  const paragraph = paraText.toString().replace(/\n/g, "<br><br>")
  return (
    <div>
      <div className="relative">
        <img src={img} alt="review-banner" />
        <div className="absolute top-1/2 -translate-y-1/2 max-w-1/2 left-[10%]">
          <h2 className="text-white text-3xl">{textHeading}</h2>
          <br />
          <p className="text-white font-medium max-w-[70%] text-lg" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
        </div>
      </div>
    </div>
  )
}

export default ReviewBannerSection
