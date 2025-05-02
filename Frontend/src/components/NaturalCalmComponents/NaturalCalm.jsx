import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NaturalCalmBlocks } from '../CommonComponents/sideMenuBlocks/utils';
import { setDraggedId } from '../../redux/features/mainStore/storeSlice';
const NaturalCalm = () => {
  const dispatch = useDispatch();
  const draggedId = useSelector((state) => state.mainStore.dragId);
  const [droppedSection, setDroppedSection] = useState([]);
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragEnd = () => {
    dispatch(setDraggedId(null))
  }
  const handleDrop = () => {
    const droppedItem = NaturalCalmBlocks[draggedId];
    setDroppedSection((prev) => [...prev, droppedItem]);
  };
  return (
      <div onDragOver={(e) => handleDragOver(e)}
        onDrop={() => handleDrop()} onDragEnd={() => handleDragEnd()} className='text-yellow-500 justify-center  mt-24 h-fit'>
        {
          droppedSection.length === 0
            ?
            <div className='grid items-center justify-center h-screen'>
            <h1 className='text-2xl'>Drop Natural Calm Components here</h1>
            </div>
            :
            <div>
              {droppedSection.map((item, id) => (
                <div key={id}>
                  <item.component/>
                </div>
              ))}
            </div>
        }
      </div>
  )
}

export default NaturalCalm
