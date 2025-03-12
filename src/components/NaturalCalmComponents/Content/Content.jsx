import React from 'react'
import { MdCheckCircleOutline } from "react-icons/md";
const Content = () => {
  const heading = "Are you getting enough MAGNESIUM?"
  const subHeading = "Natural Calm helps with symptoms of low magnesium";
  const points = [
    "Tension, irritability, restless nights...\n",
    "Body pain, muscle cramps, headaches, and migraines...\n",
    "Sound familiar? These are all signs of low magnesium.\n",
    "This essential mineral doesn’t just make us feel calmer, more rested, and ready to take on the day.\n",
    "Magnesium is also key for heart health and total wellness for men, women, and children of all ages.\n"
  ];
  const breakLines = points.join('').replace(/\n/g, '<br> <br>');
  const btnContent = "Why Magnesium";
  const tickIcon = <MdCheckCircleOutline />
  return (
    <div>
      <div className='bgColor text-white p-6'>
        <h1 className='text-4xl ml-16 pb-5'> {heading} </h1>
        <div className='flex items-start'>
        <div>
            <MdCheckCircleOutline className='w-24 h-24' />
          </div>
          <div>
            <p className='text-xl pb-5'>{subHeading}</p>
            <ul>
              <li className='text-2xl' dangerouslySetInnerHTML={{ __html: breakLines }} />
            </ul>
          </div>       
        </div>
        <button className='ml-16 p-5 bg-primary text-white rounded-full'>{btnContent}</button>
      </div>
    </div>
  )
}

export default Content
