import NainBanner from './MainBanner'
const DiscoverBanner = () => {
  const discoverHeading = "Discover Natural Calm Magnesium";
  const discoverSubtitle = "Our best-selling original, gummies, magnesium for kids, and sleep formulas"
  return (
    <NainBanner className = "mainBannerheight">
      <h2 className="font-medium text-2xl my-2">{discoverHeading}</h2>
      <p className="text-sm">{discoverSubtitle}</p>
    </NainBanner>
  )
}

export default DiscoverBanner
