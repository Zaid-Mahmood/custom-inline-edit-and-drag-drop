import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NaturalCalmBlocks } from '.././CommonComponents/Layout/SideMenu/sideMenuBlocks/utils';
import { setDraggedId } from '../../redux/features/mainstore/storeSlice';
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
      onDrop={() => handleDrop()} onDragEnd={() => handleDragEnd()} className='outletHeight'>
      {
        droppedSection.length === 0
          ?
          <div className='grid items-center justify-center'>
            <h1 className='text-2xl'>Drop Natural Calm Components here</h1>
          </div>
          :
          <div className='overflow-auto mt-32'>
            {droppedSection.map((item, id) => (
              <div key={id}>
              { item?.component && <item.component />}
              </div>
            ))}
          </div>
      }
    </div>
  )
}

export default NaturalCalm
