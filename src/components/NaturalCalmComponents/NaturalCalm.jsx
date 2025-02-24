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
    <div>
      <div onDragOver={(e) => handleDragOver(e)}
        onDrop={() => handleDrop()} onDragEnd={() => handleDragEnd()} className='text-yellow-500  h-screen'>
        {
          droppedSection.length === 0
            ?
            <p>Welcome to homepage</p>
            :
            <>
              {droppedSection.map((item, id) => (
                <div key={id}>
                  {item.component}
                </div>
              ))}
            </>
        }
      </div>
    </div>
  )
}

export default NaturalCalm
