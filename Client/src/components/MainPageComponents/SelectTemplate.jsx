import React from 'react'
import { SelectMenu } from '../../utils/utils';
import { setLayoutId } from '../../redux/features/mainStore/storeSlice';
import { useDispatch } from 'react-redux';
const SelectTemplate = (props) => {
    const dispatch = useDispatch();
    const selectLayoutFunction = (path ,id) => {
        props.layoutId(path)
        dispatch(setLayoutId(id - 1))
    }
    return (
        <div>
            <div className='flex items-center h-svh'>
                {SelectMenu.map((item) => (
                    <div className='cursor-pointer' onClick={() => selectLayoutFunction(item.path , item.id)} key={item.id}>
                        <img className='h-56 w-72' src={item.img} alt='alt-img' />
                        <p className='text-center'>{item.imgTitle}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectTemplate
