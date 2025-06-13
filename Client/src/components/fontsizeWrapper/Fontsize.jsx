import { useSelector } from 'react-redux';
const Fontsize = ({ children, fontsize, margin }) => {
    const editMode = useSelector((state) => state.mainStore.editMode);


    return (
        <>
            {editMode ?
                <div className={`w-fit h-fit ${margin}`} style={{ fontSize: `${fontsize}px` }}>{children}</div>
                :
                <div className='w-fit h-fit' style={{ fontSize: `${fontsize}px` }}>{children}</div>
            }

        </>
    )
}

export default Fontsize
