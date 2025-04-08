import React from 'react';
import { useSelector } from 'react-redux';
const Fontsize = ({children , fontsize}) => {
    const editMode = useSelector((state)=>state.mainStore.editMode);
  
    
    return (
        <div>
            {editMode ?
                <>
                    <p className='w-fit h-fit' style={{ fontSize: `${fontsize}px` }}>{children}</p>
                </>
                :
                <p className='w-fit h-fit' style={{ fontSize: `${fontsize}px` }}>{children}</p>
            }

        </div>
    )
}

export default Fontsize
