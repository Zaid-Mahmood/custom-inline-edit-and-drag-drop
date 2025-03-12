import React from 'react'
import dicoverImg from '../../../assets/natural-calm/discover-imgs/discover.jpg';
import fruitImg from '../../../assets/natural-calm/discover-imgs/fruit-imgs.jpg';
const ImagesSection = () => {
  const discoverHeading = "Great Tasting Natural Fruit Flavours";
  const discoverDesc = ["Natural Calm is a habit you’ll love to keep—because it’s delicious.\n Our magnesium citrate powders are made with organic fruit flavours and sweetened with stevia.\n Drink it like a soothing tea, add it to cold water, smoothies, or juice.Unlike other magnesium powders, there’s no chalkiness, and no lumps.\n So even picky adults and kids love to take Natural Calm.\n"]
  const breakDiscoverDesc = discoverDesc.join("").replace(/\n/g , "<br> <br/>")
  const btnText = "Explore Our Flavors"
  return (
    <div className='mx-auto max-w-3/4'>

      <img className='w-1/4 h-1/4 object-contain mx-auto' src={dicoverImg} alt="dicover-img" />
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-secondary text-2xl'>{discoverHeading}</p>
          <p className='text-[#7A7A7A] text-lg' dangerouslySetInnerHTML={{__html : breakDiscoverDesc}}></p>
          <button>{btnText}</button>
        </div>
        <div>
          <img className='w-96 h-72 object-fill' src={fruitImg} alt='fruit-img' />
        </div>
      </div>
    </div>
  )
}

export default ImagesSection
