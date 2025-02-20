import React from 'react'
import { SelectMenu } from '../../utils';

const SelectTemplate = (props) => {
    const selectLayoutFunction = (path) => {
        props.layoutId(path)
    }
    return (
        <div>
            <div className='flex'>
                {SelectMenu.map((item) => (
                    <div className='cursor-pointer' onClick={() => selectLayoutFunction(item.path)} key={item.id}>
                        <img className='h-56 w-72' src={item.img} alt='alt-img' />
                        <p className='text-center'>{item.imgTitle}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectTemplate
