import { setShowSideBar } from '../../../../redux/features/mainstore/storeSlice';
import { useDispatch } from 'react-redux';
import SideMenuBlocks from './sideMenuBlocks/SideMenuBlocks';
const SideMenu = () => {
    const dispatch = useDispatch();
    const hideSideBarFunction = () => {
        dispatch(setShowSideBar(false))
    }
    return (
        <div>
            <div className='flex justify-end gap-x-4'>
                <button className='text-white cursor-pointer' onClick={hideSideBarFunction}>Discard</button>
                <button className='bg-[#604058] p-2 text-white'>Save</button>
            </div>
            <hr className='text-white' />
            <div>
                <h2 className='uppercase text-white border-b-2 border-b-[#5CBBD2] w-fit m-2'>Blocks</h2>
            </div>
            <div className='w-[95%] mx-2'>
                <SideMenuBlocks />
            </div>
        </div>
    )
}

export default SideMenu
