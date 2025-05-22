
const MainBanner = ({children , className}) => {
  return (
    <div className={`bg-gradient ${className}`}>
        {children}
    </div>
  )
}

export default MainBanner
