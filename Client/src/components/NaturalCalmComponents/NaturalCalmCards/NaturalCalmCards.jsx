import { useState } from 'react';
import { CardsUtils } from './CardsUtils';
const NaturalCalmCards = () => {
    const cardsPerPage = 3;
    const totalPages = Math.ceil(CardsUtils.length / cardsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const currentCardsArr = CardsUtils.slice(startIndex, startIndex + cardsPerPage);
    return (
        <div className='w-full py-4 bg-white'>
            <div className='max-w-[94%] mx-auto'>
                <div className='grid grid-cols-3 my-12'>
                    {currentCardsArr.map((item, id) => (
                        <div className='h-full flex flex-col max-w-[97%] mx-auto shadowCard blur-[1px] hover:blur-none hover:shadow-none' key={id}>
                            <img className='border border-transparent rounded-t-md w-full h-[200px] object-fit' src={item.img} alt='card-img' />
                            <div className='flex flex-col justify-between grow border border-white rounded-b-md bg-white'>
                                <div>
                                    <h2 className='max-w-[90%] my-4 mx-auto font-medium text-primary text-xl'>{item.heading}</h2>
                                    <p className='mx-auto max-w-[90%] text-md text-gray-400'>{item.content}</p>
                                    <p className='max-w-[90%] text-sm mx-auto text-primary font-bold uppercase my-6'>Read more &gt;&gt; </p>
                                </div>
                                <div>
                                    <hr className='text-gray-200' />
                                    <p className='ml-[5%] py-2 text-sm text-gray-400'>{item.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <p className='cursor-pointer w-fit mx-auto'>{[...Array(totalPages)].map((_, i) => {
                        return (<span className={`mx-2 font-medium text-lg ${currentPage === i + 1 ? 'text-gray-500' : 'text-primary'}`} onClick={() => setCurrentPage(i + 1)} key={i}>{i + 1}</span>)
                    })
                    }</p>
                </div>
            </div>
        </div>
    )
}

export default NaturalCalmCards
