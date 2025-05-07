const useSvgDimension = () => {
    const windowWidth = window.screen.width;
    const svgDimensions = [{ width: 300, height: 300 },
    { width: 500, height: 500 }]

    return { windowWidth, svgDimensions }
}
export default useSvgDimension;