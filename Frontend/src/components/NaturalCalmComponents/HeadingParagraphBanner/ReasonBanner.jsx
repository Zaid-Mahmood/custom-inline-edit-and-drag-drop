import MainBanner from "./MainBanner";
const ReasonBanner = () => {
  const reasonHeading = "Even More Reasons to Love Natural Calm";

  return (
    <MainBanner className = "mainBannerheight">
      <h2 className="font-medium text-2xl my-2">{reasonHeading}</h2>
    </MainBanner>
  )
}

export default ReasonBanner
