import React from 'react'
import { NaturalCalmBlocks } from './utils'
import { setDraggedId } from '../../../../../redux/features/mainstore/storeSlice';
import { useDispatch } from 'react-redux';
const SideMenuBlocks = () => {
  const dispatch = useDispatch();
  const handleDragStart = (index) => {
    dispatch(setDraggedId(index))
  };

  return (
    <div className='pt-4'>
      <p className='text-white text-sm underline'>Natural Calm Sections</p>
      <div className='grid grid-cols-3 pt-4 sideBarHeight'>
        {NaturalCalmBlocks.map((item, id) => (
          <div draggable onDragStart={() => handleDragStart(id)}
            className='bg-[#3E3E46] m-1 cursor-pointer h-fit' key={id}>
            <img className='h-12 mx-auto' src={item.img} alt="item-img" />
            <p className='text-white text-center text-[8px] p-2'>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideMenuBlocks
