import MainBanner from "./MainBanner"
const StayCalmBanner = () => {
    const stayCalmHeading = "From The Stay Calm Blog";
  return (
    <MainBanner className = "mainBannerheight">
      <h2 className="font-medium text-2xl my-2">{stayCalmHeading}</h2>
    </MainBanner>
  )
}

export default StayCalmBanner
